import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import buildCode, { NavigationSpecification } from '../src';

async function main() {
  const yamlPath = path.resolve(__dirname, '../tests/specs/testStackSpec.yaml');
  const yamlSpec = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  let yamlGen = await buildCode(yamlSpec as NavigationSpecification, yamlPath);
  const yamlOutputPath = path.resolve(__dirname, '../tests/snapshots/testStackSnapshot.ts');
  fs.writeFileSync(yamlOutputPath, yamlGen, 'utf8');

  // Uncomment the following block to generate individual snapshots from each spec type. This is useful for making sure all
  // spec types generate the same output.

  // const yamlPath = path.resolve(__dirname, '../tests/specs/testStackSpec.yaml');
  // const yamlSpec = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  // let yamlGen = await buildCode(yamlSpec as NavigationSpecification, yamlPath);
  // const yamlOutputPath = path.resolve(__dirname, '../tests/snapshots/from_yaml.ts');
  // fs.writeFileSync(yamlOutputPath, yamlGen, 'utf8');
  //
  // let tsPath: string = path.resolve(__dirname, '../tests/specs/testStackSpec.ts');
  // const tsSpec = require(tsPath).default;
  // let tsGen = await buildCode(tsSpec as NavigationSpecification, tsPath);
  // const tsOutputPath = path.resolve(__dirname, '../tests/snapshots/from_ts.ts');
  // fs.writeFileSync(tsOutputPath, tsGen, 'utf8');
  //
  // const jsPath = path.resolve(__dirname, '../tests/specs/testStackSpec.js');
  // const jsSpec = require(jsPath);
  // let jsGen = await buildCode(jsSpec as NavigationSpecification, jsPath);
  // const jsOutputPath = path.resolve(__dirname, '../tests/snapshots/from_js.ts');
  // fs.writeFileSync(jsOutputPath, jsGen, 'utf8');
}

main();
