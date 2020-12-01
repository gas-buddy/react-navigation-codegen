import prettier from 'prettier';
export * from './types';

function normalize(spec: any) {
  return Object.entries(spec).map(([key, value]) => {
    if (!value) {
      return { jsName: key, path: key };
    } else if (typeof value === 'string') {
      return { jsName: key, path: value };
    }
    const { screens, name, ...rest } = value as any;

    if (Array.isArray(screens)) {
      rest.screens = normalize(
        screens.reduce((agg, entry) => {
          if (typeof entry === 'string') {
            agg[entry] = entry;
          } else if (typeof entry === 'object' && Object.keys(entry).length === 1) {
            agg[Object.keys(entry)[0]] = entry[Object.keys(entry)[0]];
          } else if (typeof entry === 'object' && entry.id) {
            const { id, ...restArgs } = entry;
            agg[id] = restArgs;
          } else {
            console.log('Unknown screen entry format', entry);
          }
          return agg;
        }, {}),
      );
    } else if (screens) {
      rest.screens = normalize(screens);
    }

    return {
      jsName: key,
      path: name || key,
      ...rest,
    };
  });
}

function buildTypeAndLiteral(
  node: any,
  pathPrefix: string,
  typePrefix: string,
  typeLines: Array<string>,
  literalLines: Array<string>,
  paramLists: Array<any>,
  analytics: Record<string, string>,
) {
  node.forEach((entry: any) => {
    const pathValue = `${pathPrefix}${pathPrefix ? '.' : ''}${entry.path}`;

    if (entry.parameterType) {
      const isDef = entry.parameters || entry.extends;
      const exists = paramLists.find((p) => p.typeName === entry.parameterType);
      if (!isDef || !exists) {
        paramLists.push({
          type: 'screen',
          typeName: entry.parameterType,
          extends: entry.extends,
          parameters: entry.parameters,
        });
      }
    }

    if (entry.analytics) {
      const jsIdent = [entry.jsName];
      if (typePrefix) {
        jsIdent.unshift(typePrefix);
      }
      if (entry.screens) {
        jsIdent.push('$name');
      }
      analytics[jsIdent.join('.')] = entry.analytics;
    }

    if (entry.screens) {
      typeLines.push(`${entry.jsName}: {`);
      typeLines.push(`$name: '${pathValue}';`);
      literalLines.push(`${entry.jsName}: {`);
      literalLines.push(`$name: '${pathValue}',`);

      const newPathPrefix = pathPrefix ? `${pathPrefix}.${entry.path}` : entry.path;
      const newTypePrefix = typePrefix ? `${typePrefix}.${entry.jsName}` : entry.jsName;
      buildTypeAndLiteral(
        entry.screens,
        entry.noPrefix ? '' : newPathPrefix,
        newTypePrefix,
        typeLines,
        literalLines,
        paramLists,
        analytics,
      );

      typeLines.push('};');
      literalLines.push('},');

      if (
        entry.parameterListType &&
        !paramLists.find((p) => p.typeName === entry.parameterListType)
      ) {
        paramLists.push({
          type: entry.type || 'stack',
          typeName: entry.parameterListType,
          defaultParameters: entry.defaultParameters,
          prefix: newTypePrefix,
          screens: entry.screens,
        });
      }
    } else {
      typeLines.push(`${entry.jsName}: '${pathValue}';`);
      literalLines.push(`${entry.jsName}: '${pathValue}',`);
    }
  });
}

function getParameter({ name, type }: { name: string; type: string }) {
  if (type.endsWith('?')) {
    return `${name}?: ${type.substring(0, type.length - 1)};`;
  }
  return `${name}: ${type};`;
}

function getScreenParameterType({ typeName, extends: extendInterface, parameters }: any) {
  // If it has NO parameters or extends, it is assumed to be an external or repeated reference
  if (!parameters && !extendInterface) {
    return '';
  }

  return [
    `export interface ${typeName} ${extendInterface ? `extends ${extendInterface} ` : ''}{`,
    ...(parameters || []).map(getParameter),
    '}',
  ].join('\n');
}

function getNavigatorParameterType({ typeName, defaultParameters, prefix, screens }: any) {
  return [
    `export type ${typeName} = {`,
    ...screens.map(
      (screen: any) =>
        `[Nav.${prefix}.${screen.jsName}${screen.screens ? '.$name' : ''}]: ${
          screen.parameterType || defaultParameters || 'undefined'
        };`,
    ),
    '}\n',
  ].join('\n');
}

function imports(specs: Array<{ name: string; source: string }>) {
  return specs.map(({ name, source }) => `import { ${name} } from '${source}';`);
}

export default async function BuildTypes(spec: any, prettierConfigSourceFile: string) {
  const paramLists: Array<any> = [];
  const type: Array<string> = [];
  const literal: Array<string> = [];
  const analytics: Record<string, string> = {};

  buildTypeAndLiteral(normalize(spec.screens), '', '', type, literal, paramLists, analytics);

  const output = `${spec.preamble || ''}
  ${imports(spec.import).join('\n')}

  export interface NavType {
    ${type.join('\n')}
  }

  export const Nav: NavType = {
    ${literal.join('\n')}
  }

  export const Analytics = {
    ${Object.entries(analytics)
      .map(([js, str]) => `  [Nav.${js}]: '${str}',`)
      .join('\n')}
  }

  ${paramLists
    .filter((p) => p.type === 'screen')
    .map(getScreenParameterType)
    .join('\n')}

  ${paramLists
    .filter((p) => p.type !== 'screen')
    .map(getNavigatorParameterType)
    .join('\n')}
  `;

  const options = await prettier.resolveConfig(prettierConfigSourceFile);
  return prettier.format(output, { ...options, parser: 'typescript' });
}
