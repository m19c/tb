#!/usr/bin/env node

var pkg     = require('../package.json'),
    program = require('commander'),
    build   = require('../lib/command/build');

program
  .version(pkg.version)
;

build(program);

program.parse(process.argv);