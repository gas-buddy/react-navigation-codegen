#!/usr/bin/env node
import fs from 'fs';
import assert from 'assert';
import minimist from 'minimist';
import BuildTypes from './index';

const argv = minimist(process.argv.slice(2));
const [sourceFilename, destinationFilename] = argv._;

const usage = `
USAGE:
  npx react-navigation-codegen <source-fire> <destination-file>
`;

assert(sourceFilename, usage);
assert(destinationFilename, usage);

BuildTypes(sourceFilename).then((tsOutput) => {
  if (
    !fs.existsSync(destinationFilename) ||
    fs.readFileSync(destinationFilename, 'utf8') !== tsOutput
  ) {
    console.log('Updating navigation types in', destinationFilename);
    fs.writeFileSync(destinationFilename, tsOutput, 'utf8');
  }
});
