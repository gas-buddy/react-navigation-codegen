import prettier from 'prettier';
import { NavigationSpecification, NavigatorSpec, ScreenOrNavigator, ScreenSpec } from './types';
export * from './types';

interface ScreenNames {
  [key: string]: string | ScreenNames;
}

interface ParameterList {
  id?: string;
  pathPrefix: string;
  typePrefix: string;
  type: 'screen' | NavigatorSpec['type'];
  parameterType?: string;
  extends?: string;
  parameters?: ScreenSpec['parameters'];
  defaultParameters?: NavigatorSpec['defaultParameters'];
  screens?: AnnotatedScreenSpec[];
}

interface ParsedSpec {
  pathParent: string;
  typeParent: string;
  parameterLists: ParameterList[];
  // Screen name -> analytics name or false to suppress analytics
  analytics: Record<string, string | false>;
  // The type declaration for each screen (hierarchical)
  navEntries: ScreenNames;
  // A flat list of all navigators we encountered
  navigators: NavigatorSpec[];
}

type NavigatorSpecPropsOnly = Omit<NavigatorSpec, keyof ScreenSpec>;
type ScreenOptionalNavigator = ScreenSpec & Partial<NavigatorSpecPropsOnly>;

interface AnnotatedScreenSpec extends ScreenOptionalNavigator {
  jsName: string;
  path: string;
  screens?: AnnotatedScreenSpec[] | Record<string, AnnotatedScreenSpec>;
}

function removeScreens(value: NavigatorSpec | ScreenSpec) {
  if ('screens' in value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { screens, ...rest } = value;
    return rest;
  }
  return value;
}

function normalizeScreens(spec: NavigatorSpec['screens']): AnnotatedScreenSpec[] {
  return Object.entries(spec).map(([key, value]) => {
    if (!value) {
      return { jsName: key, path: key };
    } else if (typeof value === 'string') {
      return { jsName: key, path: value };
    }

    const normalizedSpec: AnnotatedScreenSpec = {
      ...removeScreens(value),
      jsName: key,
      path: value.name || key,
    };
    if ('screens' in value) {
      if (Array.isArray(value.screens)) {
        // Turn an array into a map
        const screenMap = {} as { [key: string]: ScreenOrNavigator };
        value.screens.forEach((entry) => {
          if (typeof entry === 'string') {
            screenMap[entry] = entry;
          } else if (typeof entry === 'object' && Object.keys(entry).length === 1) {
            const screenName: string = Object.keys(entry)[0];
            if (screenName) {
              // I'm not sure what case this is...
              screenMap[screenName] = (entry as Record<string, ScreenOrNavigator>)[screenName];
            }
          } else if (typeof entry === 'object' && 'id' in entry) {
            const { id, ...restArgs } = entry;
            screenMap[id as string] = restArgs;
          } else {
            console.log('Unknown screen entry format', entry);
          }
        });
        normalizedSpec.screens = normalizeScreens(screenMap);
      } else {
        normalizedSpec.screens = normalizeScreens(value.screens);
      }
    }

    return normalizedSpec;
  });
}

function buildTypeAndLiteral(node: AnnotatedScreenSpec[], state: ParsedSpec) {
  node.forEach((entry) => {
    const newPathPrefix = state.pathParent ? `${state.pathParent}.${entry.path}` : entry.path;
    const newTypePrefix = state.typeParent ? `${state.typeParent}.${entry.jsName}` : entry.jsName;

    if (entry.parameterType) {
      const isDef = entry.parameters || entry.extends;
      const exists = state.parameterLists.find((p) => p.parameterType === entry.parameterType);
      if (!isDef || !exists) {
        state.parameterLists.push({
          type: 'screen',
          id: entry.id,
          pathPrefix: newPathPrefix,
          typePrefix: newTypePrefix,
          parameterType: entry.parameterType,
          extends: entry.extends,
          parameters: entry.parameters,
        });
      }
    }

    if (entry.analytics || entry.analytics === false) {
      const jsIdent = [entry.jsName];
      if (state.typeParent) {
        jsIdent.unshift(state.typeParent);
      }
      if (entry.screens) {
        jsIdent.push('$name');
      }
      state.analytics[jsIdent.join('.')] = entry.analytics;
    }

    if ('screens' in entry) {
      const screenNav = {
        $name: newPathPrefix,
      };
      state.navEntries[entry.jsName] = screenNav;

      buildTypeAndLiteral(entry.screens as AnnotatedScreenSpec[], {
        ...state,
        pathParent: entry.noPrefix ? '' : newPathPrefix,
        typeParent: newTypePrefix,
        navEntries: screenNav,
      });

      if (
        !entry.parameterListType ||
        !state.parameterLists.find((p) => p.parameterType === entry.parameterListType)
      ) {
        state.parameterLists.push({
          type: entry.type || 'stack',
          id: entry.id,
          typePrefix: newTypePrefix,
          pathPrefix: entry.noPrefix ? entry.path : newPathPrefix,
          parameterType: entry.parameterListType,
          parameters: entry.parameters,
          defaultParameters: entry.defaultParameters,
          screens: entry.screens as AnnotatedScreenSpec[],
        });
      }
    } else {
      state.navEntries[entry.jsName] = newPathPrefix;
    }
  });
}

function getParameter({ name, type }: { name: string; type: string }) {
  if (type.endsWith('?')) {
    return `${name}?: ${type.substring(0, type.length - 1)};`;
  }
  return `${name}: ${type};`;
}

function getScreenParameterType(params: ParameterList) {
  const { extends: xtend, parameters, parameterType } = params;
  // If it has NO parameters or extends, it is assumed to be an external or repeated reference
  if (!parameters && !xtend) {
    return '';
  }

  return [
    `export interface ${parameterType} ${xtend ? `extends ${xtend} ` : ''}{`,
    ...(parameters || []).map(getParameter),
    '}',
  ].join('\n');
}

function getNestedNavigatorParams(params: ParameterList, screen: AnnotatedScreenSpec) {
  const { defaultParameters, pathPrefix } = params;
  if (screen.screens) {
    const prefix = screen.noPrefix ? '' : `${pathPrefix}.`;
    const nestRef = screen.id ? `$Nested['${screen.id}']` : `$Nested['${prefix}${screen.path}']`;
    if (screen.parameterType || defaultParameters) {
      return (screen.parameterType || defaultParameters) + ` & ${nestRef}`;
    }
    return nestRef;
  }
  return screen.parameterType || defaultParameters || 'undefined';
}

function getNavigatorParameterType(args: ParameterList) {
  const { parameterType, screens, typePrefix } = args;
  return [
    `export type ${parameterType} = {`,
    ...screens!.map(
      (screen) =>
        `[Nav.${typePrefix}.${screen.jsName}${
          screen.screens ? '.$name' : ''
        }]: ${getNestedNavigatorParams(args, screen)};`,
    ),
    '}\n',
  ].join('\n');
}

function imports(specs: string | Array<{ name: string; source: string }>) {
  if (typeof specs === 'string') {
    return [specs];
  }
  return specs.map(({ name, source }) => `import { ${name} } from '${source}';`);
}

function screenParameterReference(nav: ParameterList, screen: AnnotatedScreenSpec) {
  let { parameterType } = screen;
  const optional = !parameterType || parameterType.endsWith('?');
  if (screen.screens) {
    if (screen.id) {
      parameterType = `$Nested['${screen.id}']`;
    } else if (screen.noPrefix) {
      parameterType = `$Nested['${screen.path}']`;
    } else {
      parameterType = `$Nested['${nav.pathPrefix}${nav.pathPrefix ? '.' : ''}${screen.path}']`;
    }
  }
  if (parameterType === "$Nested['app.mobile-pay']") {
    console.log('BAD ONE', screen);
  }
  return `{ screen: '${nav.pathPrefix}.${screen.path}';
    ${parameterType ? `params${optional ? '?' : ''}: ${parameterType}` : ''}
  }`;
}

function getNestedScreenDeclaration(navigator: ParameterList) {
  return `    '${navigator.id || navigator.pathPrefix}': ${navigator.screens
    ?.map((s) => screenParameterReference(navigator, s))
    .join(' | ')};`;
}

export default async function BuildTypes(
  spec: NavigationSpecification,
  prettierConfigSourceFile: string,
) {
  const state: ParsedSpec = {
    parameterLists: [],
    analytics: {},
    navEntries: {},
    navigators: [],
    pathParent: '',
    typeParent: '',
  };

  buildTypeAndLiteral(normalizeScreens(spec.screens), state);

  const output = `${spec.preamble || ''}
  ${imports(spec.import).join('\n')}

  // Screen names and structure
  export const Nav = ${JSON.stringify(state.navEntries, null, '\t')} as const;

  // Analytics event names
  export const Analytics = {
    ${Object.entries(state.analytics)
      .map(([js, str]) => `  [Nav.${js}]: ${str === false ? 'false' : JSON.stringify(str)},`)
      .join('\n')}
  };

  // Screen parameter types
  ${state.parameterLists
    .filter((p) => p.type === 'screen')
    .map(getScreenParameterType)
    .join('\n')}

  // Navigator parameter types
  ${state.parameterLists
    .filter((p) => p.type !== 'screen' && p.parameterType)
    .map(getNavigatorParameterType)
    .join('\n')}

  interface $Nested {
    ${state.parameterLists
      .filter((p) => p.screens?.length)
      .map(getNestedScreenDeclaration)
      .join('\n')}
  }
`;

  const options = await prettier.resolveConfig(prettierConfigSourceFile);
  return prettier.format(output, { ...options, parser: 'typescript' });
}
