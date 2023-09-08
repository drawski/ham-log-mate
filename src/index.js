#!/usr/bin/env node

import { program } from 'commander'
import { process } from './adif-processor.js'

program
  .version('0.1.0')
  .description('A tool for processing ham radio log files in ADIF format')
  .usage('<file> [options]')
  .arguments('<file>')
  .option('-o, --output <file>', 'Output file')
  .option('-s, --set <fields...>', 'Set a new value for a field in the output file')
  .option('-r, --replace <fields...>', 'Replace a field value in the output file')
  .option('-d, --delete <fields...>', 'Skip matching records from the output file')
  .option('-b, --split-by <field>', 'Split the record into multiple records based on the value of a given field')
  .action(process)
  .parse(process.argv)
