
# HamLogMate

Ham Log Mate is a command-line tool for processing ham radio log files in ADIF format. It provides several options for manipulating the log data, including setting new values for fields, replacing field values, deleting records, and splitting records based on field values.

## Installation

To install Ham Log Mate, you can use npm:

```
npm install -g ham-log-mate
```

## Usage

To use Ham Log Mate, run the `ham-log-mate` command followed by the path to the input log file:

```
ham-log-mate <file>
```

You can use the following options to manipulate the log data:

- `-o, --output <file>`: Specify the output file for the processed log data.
- `-s, --set <fields...>`: Set a new value for a field in the output file.
- `-r, --replace <fields...>`: Replace a field value in the output file.
- `-d, --delete <fields...>`: Skip matching records from the output file.
- `-b, --split-by <field>`: Split the record into multiple records based on the value of a given field.

For more information on how to use these options, run the `ham-log-mate --help` command.

## License

This project is licensed under the terms of the MIT license.
