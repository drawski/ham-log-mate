const serializeRecord = (entry) => {
    return Object.keys(entry).map(field => {
        return `<${field}:${entry[field].length}>${entry[field]}`
    }).join('')
}

export default function (header, entries) {
    const headerRecords = serializeRecord(header)
    const records = entries
        .map(serializeRecord)
        .map(record => `${record}<EOR>`)
        .join('\n')
  
    return `ADIF Export\n${headerRecords}<EOH>\n\n${records}`
}
