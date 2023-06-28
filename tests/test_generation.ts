import fs from 'fs';
import tap from 'tap';
import yaml from 'js-yaml';
import path from 'path';
import buildCode, { NavigationSpecification } from '../src/index';

const snapshot = fs.readFileSync(
  path.resolve(__dirname, './snapshots/fooStackSnapshot.ts'),
  'utf8',
);
tap.test('test_generation', async (test) => {
  const yamlPath = path.resolve(__dirname, 'specs/fooStackSpec.yaml');
  const yamlSpec = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  let gen = await buildCode(yamlSpec as NavigationSpecification, yamlPath);
  test.ok(gen, 'Should generate code');

  test.equal(gen, snapshot, 'Expected unchanged output');

  const jsSpec = require(path.resolve(__dirname, 'specs/fooStackSpec.js'));
  gen = await buildCode(jsSpec, yamlPath);
  test.ok(gen, 'Should generate code');
  test.equal(gen, snapshot, 'Expected unchanged output');

  const tsSpec = require(path.resolve(__dirname, 'specs/fooStackSpec.ts')).default;
  gen = await buildCode(tsSpec, yamlPath);
  test.ok(gen, 'Should generate code');
  test.equal(gen, snapshot, 'Expected unchanged output');
});
