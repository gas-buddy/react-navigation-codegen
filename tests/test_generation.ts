import fs from 'fs';
import tap from 'tap';
import path from 'path';
import buildCode from '../src/index';

tap.test('test_generation', async (test) => {
  const gen = await buildCode(path.resolve(__dirname, 'navStack.yaml'));
  test.ok(gen, 'Should generate code');

  const snapshot = fs.readFileSync(path.resolve(__dirname, './snapshots/navStack.ts'), 'utf8');
  test.strictEquals(gen, snapshot, 'Expected unchanged output');
});
