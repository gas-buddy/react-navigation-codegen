import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import buildCode, { NavigationSpecification } from './index';

async function main() {
  const yamlPath = path.resolve(__dirname, '../tests/specs/fooStackSpec.yaml');
  const yamlSpec = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  let yamlGen = await buildCode(yamlSpec as NavigationSpecification, yamlPath);
  console.log(yamlGen);
  const yamlOutputPath = path.resolve(__dirname, '../tests/snapshots/yaml_navStack.ts');
  fs.writeFileSync(yamlOutputPath, yamlGen, 'utf8');

  // let tsPath: string = path.resolve(__dirname, '../tests/specs/fooStackSpec.ts');
  // const tsSpec = require(tsPath).default;
  // let tsGen = await buildCode(tsSpec as NavigationSpecification, tsPath);
  // console.log(tsGen);
  // const tsOutputPath = path.resolve(__dirname, '../tests/snapshots/ts_navStack.ts');
  // fs.writeFileSync(tsOutputPath, tsGen, 'utf8');
  //
  // const jsPath = path.resolve(__dirname, '../tests/specs/fooStackSpec.js');
  // const jsSpec = require(jsPath).default;
  // let jsGen = await buildCode(jsSpec as NavigationSpecification, jsPath);
  // console.log(jsGen);
  // const jsOutputPath = path.resolve(__dirname, '../tests/snapshots/js_navStack.ts');
  // fs.writeFileSync(jsOutputPath, jsGen, 'utf8');
}

main();
