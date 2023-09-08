const parseRecord = record => {
    // @FIXME improve the regex to allow < and > in the value
    const fields = record.match(/<(\w+):(\d+)>([^<]*|<[^>]*>)/g)

    const logEntry = {}

    if (fields) {
        for (const field of fields) {
            const [, tagName, fieldLength, fieldValue] = field.match(/<(\w+):(\d+)>(.*)/)
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
