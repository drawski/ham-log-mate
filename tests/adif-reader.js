import test from 'ava'
import { readFileSync } from 'fs'
import adifReader from '../src/lib/adif-reader.js'
import exp from 'constants'

const fileSimple = readFileSync('./tests/data/simple.adi', 'utf8')
const fileSimpleWithFaultyFieldLengths = readFileSync('./tests/data/simple-faulty-field-lengths.adi', 'utf8')
const fileSimpleWitRandomhNewlines = readFileSync('./tests/data/simple-newlines.adi', 'utf8')

const expectedHeader = { ADIF_VER: '3.0.4', PROGRAMID: 'TEST', PROGRAMVERSION: '1.0' }

test('it should parse a simple ADIF file', t => {
    const parsedFile = adifReader(fileSimple)

    t.deepEqual(parsedFile.header, expectedHeader)
    t.is(parsedFile.entries.length, 3)

    for (let i = 0; i < parsedFile.entries.length; i++) {
        t.deepEqual(Object.keys(parsedFile.entries[i]), [
            'STATION_CALLSIGN', 'MY_GRIDSQUARE', 'CALL', 'NAME', 'GRIDSQUARE', 'QTH',
            'TX_PWR', 'RST_RCVD', 'RST_SENT', 'FREQ', 'FREQ_RX', 'BAND', 'MODE',
            'COMMENT', 'QSO_DATE', 'TIME_ON'
        ])
        t.is(parsedFile.entries[i].STATION_CALLSIGN, 'AA1ABC')
        t.is(parsedFile.entries[i].MY_GRIDSQUARE, 'DD90AA')
    }
})

test('it should parse a simple ADIF file with faulty field lengths', t => {
    const parsedFile = adifReader(fileSimpleWithFaultyFieldLengths)

    t.deepEqual(parsedFile.header, expectedHeader)
    t.is(parsedFile.entries.length, 3)
    t.deepEqual(Object.keys(parsedFile.entries[0]), [
        'STATION_CALLSIGN', 'MY_GRIDSQUARE', 'CALL'
    ])
})

test('it should parse correct values for each field (no matter if the field length is correct)', t => {
    const parsedFile = adifReader(fileSimpleWithFaultyFieldLengths)
    const expectedParsedFile = JSON.parse(readFileSync('./tests/data/simple-faulty-field-lengths.json', 'utf8'))

    t.deepEqual(parsedFile.entries, expectedParsedFile.entries)
})

test('it should parse correct values for each field (no matter the newlines)', t => {
    const parsedFile = adifReader(fileSimpleWitRandomhNewlines)
    const expectedParsedFile = JSON.parse(readFileSync('./tests/data/simple-newlines.json', 'utf8'))

    t.deepEqual(parsedFile.entries, expectedParsedFile.entries)
})
