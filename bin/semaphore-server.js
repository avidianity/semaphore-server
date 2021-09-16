#!/usr/bin/env node
const nodemon = require('nodemon');
const path = require('path');
const cli = require('nodemon/lib/cli');

process.chdir(path.resolve(__dirname, '../'));

const options = cli.parse([process.argv[0], process.argv[1], 'src/index.ts']);

nodemon(options);
