// @FIXME improve the regex to allow < and > in the value
const globalRecordPattern = /<(\w+):(\d+)(:\w)?>([^<]*|<[^>]*>)/gi
const recordPattern = /<(\w+):(\d+)(:\w)?>\s*(.*)\s*/i

const parseRecord = record => {
    const fields = record.match(globalRecordPattern)
    const logEntry = {}

    if (fields) {
        for (const field of fields) {
            const [, tagName, fieldLength, fieldType, fieldValue] = field.match(recordPattern)
            logEntry[tagName] = fieldValue
        }
    }

    return logEntry
}

export default function (fileContents) {
    const [ header, contents ] = fileContents.split(/<eoh>\s*/i)
    const records = contents.split(/<eor>\s*/i)

    return {
        header: parseRecord(header),
        entries: records
            .map(parseRecord)
            .filter(v => Object.keys(v).length)
    }
}
