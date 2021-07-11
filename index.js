#!/usr/bin/env node
require('./src/inizialize.js')();
const program = require('commander');
const { write, read, dashboard } = require('./src/actions');

program.version('1.0.0').description('Simple CLI for journaling').parse();

program.command('dashboard').action(() => dashboard());
program.command('write').action(() => write());
program.command('read').action(() => read());

program.parse();