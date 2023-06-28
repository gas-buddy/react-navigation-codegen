import { NavigationSpecification, ScreenOrNavigator, ImportSpec } from './types';

export function getImports(spec: NavigationSpecification): ImportSpec[] {
  let imports: ImportSpec[] = [];

  Object.entries(spec.screens).forEach((curr) => {
    imports = imports.concat(getScreenImports(curr[1]));
  });

  return deduplicateImports(imports);
}

function getScreenImports(spec: ScreenOrNavigator): ImportSpec[] {
  let specImports: ImportSpec[] = [];

  if (typeof spec !== 'object') {
    return [];
  }

  let currentSpec = Object.values(spec).length === 1 ? Object.values(spec)[0] : spec;

  if (currentSpec.imports?.length) {
    specImports = currentSpec.imports.flat(20) as ImportSpec[];
  }

  if (typeof currentSpec === 'string' || !('screens' in currentSpec)) {
    return specImports;
  }

  let screens: ScreenOrNavigator[];
  if (Array.isArray(currentSpec.screens)) {
    screens = currentSpec.screens;
  } else if (typeof currentSpec.screens === 'object') {
    screens = Object.values(currentSpec.screens);
  } else {
    screens = [];
  }
  screens.forEach((screen) => {
    specImports = specImports.concat(getScreenImports(screen)).flat(20);
  });

  return specImports.flat(20);
}

export function getImportStatements(spec: NavigationSpecification): string[] {
  return getImports(spec).map(({ name, source }) => `import { ${name} } from '${source}';`);
}

function deduplicateImports(importSpecs: ImportSpec[]): ImportSpec[] {
  const namesMap: Record<string, string> = {};
  const sourcesMap = new Map<string, Set<string>>();

  for (const { source, name } of importSpecs) {
    if (!name) {
      continue;
    }

    const names = name.split(',').map((n) => n.trim());

    for (const n of names) {
      if (namesMap[n] && namesMap?.[n] !== source) {
        throw new Error(`Duplicate import: ${n} from ${source} and ${namesMap[n]}`);
      }
      namesMap[n] = source;

      if (sourcesMap.has(source)) {
        sourcesMap.get(source)!.add(n);
      } else {
        sourcesMap.set(source, new Set([n]));
      }
    }
  }

  const result: ImportSpec[] = [];
  sourcesMap.forEach((names, source) => {
    result.push({ source, name: [...names].join(', ') });
  });
  return result;
}
