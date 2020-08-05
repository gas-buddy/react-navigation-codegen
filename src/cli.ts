#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
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

function resolveConfig(source: string) {
  switch (path.extname(source)) {
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(fs.readFileSync(source, 'utf8'));
    case '.js':
      return require(source).default || require(source);
    default:
      throw new Error('Unkown input format');
  }
}

const resolvedConfig = resolveConfig(sourceFilename);

BuildTypes(resolvedConfig, sourceFilename).then((tsOutput) => {
  if (
    !fs.existsSync(destinationFilename) ||
    fs.readFileSync(destinationFilename, 'utf8') !== tsOutput
  ) {
    console.log('Updating navigation types in', destinationFilename);
    fs.writeFileSync(destinationFilename, tsOutput, 'utf8');
  }
});
