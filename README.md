
# HamLogMate

Ham Log Mate is a command-line tool for processing ham radio log files in ADIF format. It provides several options for manipulating the log data, including setting new values for fields, replacing field values, deleting records, and splitting records based on field values.

## Installation

To install Ham Log Mate, you can use npm:

```sh
npm install -g ham-log-mate
```

## Usage

To use Ham Log Mate, run the `ham-log-mate` command followed by the path to the input log file:

```sh
ham-log-mate <file>
```

You can use the following options to manipulate the log data:

- `-o, --output <file>`: Specify the output file for the processed log data.
- `-s, --set <fields...>`: Set a new value for a field in the output file.
- `-r, --replace <fields...>`: Replace a field value in the output file.
- `-d, --delete <fields...>`: Skip matching records from the output file.
- `-b, --split-by <field>`: Split the record into multiple records based on the value of a given field.

### "-b, --split-by" option in detail

Input record:
```
<STATION_CALLSIGN:6>AB1CDE<CALL:6>WX0CBA<SIG:4>POTA<SIG_INFO:13>K-1234 K-2233<QSO_DATE:8>20230101<TIME_ON:6>100000<EOR>
```

Output records:
```
<STATION_CALLSIGN:6>AB1CDE<CALL:6>WX0CBA<SIG:4>POTA<SIG_INFO:6>K-1234<QSO_DATE:8>20230101<TIME_ON:6>100000<EOR>
<STATION_CALLSIGN:6>AB1CDE<CALL:6>WX0CBA<SIG:4>POTA<SIG_INFO:6>K-2233<QSO_DATE:8>20230101<TIME_ON:6>100000<EOR>
```

### Examples

```sh
# copy the records from input.adi to output.adi without no further processing
ham-log-mate input.adi -o output.adi

# set STATION_CALLSIGN field to AB1CDE/P
# set MY_GRIDSQUARE field to IJ10AA
# save as output.adi
ham-log-mate input.adi -o output.adi -s STATION_CALLSIGN:AB1CDE/P MY_GRIDSQUARE:IJ10AA

# replace all occurrences of POTA with SOTA in MY_SIG field
# save as output.adi
ham-log-mate input.adi -o output.adi -r MY_SIG:POTA:SOTA

# skip all records where MY_SIG field contains POTA
# save as output.adi
ham-log-mate input.adi -o output.adi -d MY_SIG:POTA

# split one record into multiple ones by splitting SIG_INFO field value by a default separator (space)
# save as output.adi
ham-log-mate input.adi -o output.adi -b SIG_INFO

# split one record into multiple ones by splitting SIG_INFO field value by a comma
# save as output.adi
ham-log-mate input.adi -o output.adi -b 'SIG_INFO:,'
```

## License

This project is licensed under the terms of the MIT license.
