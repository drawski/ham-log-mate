import test from 'ava'
import { readFileSync } from 'fs'
import adifReader from '../src/lib/adif-reader.js'

const fileSimple = readFileSync('./tests/data/simple.adi', 'utf8')
const fileSimpleWithFaultyFieldLengths = readFileSync('./tests/data/simple-faulty-field-lengths.adi', 'utf8')

const expectedHeader = { ADIF_VER: '3.0.4', PROGRAMID: 'TEST', PROGRAMVERSION: '1.0' }

test('it should parse a simple ADIF file', t => {
    const parsedFile = adifReader(fileSimple)

    t.deepEqual(expectedHeader, parsedFile.header)
    t.is(3, parsedFile.entries.length)
    t.deepEqual([
        'STATION_CALLSIGN', 'MY_GRIDSQUARE', 'CALL', 'NAME', 'GRIDSQUARE', 'QTH',
        'TX_PWR', 'RST_RCVD', 'RST_SENT', 'FREQ', 'FREQ_RX', 'BAND', 'MODE',
        'COMMENT', 'QSO_DATE', 'TIME_ON'
    ], Object.keys(parsedFile.entries[0]))
})

test('it should parse a simple ADIF file with faulty field lengths', t => {
    const parsedFile = adifReader(fileSimpleWithFaultyFieldLengths)

    t.deepEqual(expectedHeader, parsedFile.header)
    t.is(3, parsedFile.entries.length)
    t.deepEqual([
        'STATION_CALLSIGN', 'MY_GRIDSQUARE', 'CALL'
    ], Object.keys(parsedFile.entries[0]))
})

test('it should parse correct values for each field (no matter if the field length is correct)', t => {
    const parsedFile = adifReader(fileSimpleWithFaultyFieldLengths)

    t.deepEqual([
        {
            STATION_CALLSIGN: 'AA1ABC',
            MY_GRIDSQUARE: 'DD90AA',
            CALL: 'K1ABC'
        },
        {
            STATION_CALLSIGN: 'AA1ABC',
            MY_GRIDSQUARE: 'DD90AA',
            CALL: 'WA2XYZ'
        },
        {
            STATION_CALLSIGN: 'AA1ABC',
            MY_GRIDSQUARE: 'DD90AA',
            CALL: 'GB4A'
        }
    ], parsedFile.entries)
})
