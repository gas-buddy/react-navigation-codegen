import fs from 'fs';
import tap from 'tap';
import yaml from 'js-yaml';
import path from 'path';
import buildCode, { NavigationSpecification } from '../src/index';

tap.test('test_generation', async (test) => {
  const yamlPath = path.resolve(__dirname, 'specs/navStack.yaml');
  const yamlSpec = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  let gen = await buildCode(yamlSpec as NavigationSpecification, yamlPath);
  test.ok(gen, 'Should generate code');

  let snapshot = fs.readFileSync(path.resolve(__dirname, './snapshots/navStack.ts'), 'utf8');
  test.equal(gen, snapshot, 'Expected unchanged output');

  const jsSpec = require(path.resolve(__dirname, 'specs/navStackSpecJs.js'));
  gen = await buildCode(jsSpec, yamlPath);
  test.ok(gen, 'Should generate code');

  snapshot = fs.readFileSync(path.resolve(__dirname, './snapshots/navStack.ts'), 'utf8');
  test.equal(gen, snapshot, 'Expected unchanged output');

  const tsSpec = require(path.resolve(__dirname, 'specs/navStackSpecTs.ts')).default;
  gen = await buildCode(tsSpec, yamlPath);
  test.ok(gen, 'Should generate code');

  snapshot = fs.readFileSync(path.resolve(__dirname, './snapshots/navStack.ts'), 'utf8');
  test.equal(gen, snapshot, 'Expected unchanged output');
});
