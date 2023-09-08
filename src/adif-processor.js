import fs from 'fs'
import adifReader from './lib/adif-reader.js'
import adifWriter from './lib/adif-writer.js'

const actions = {
    set: (entry, field, value) => {
        entry[field] = value
        return entry
    },
    replace: (entry, field, before, after) => {
        entry[field] = (entry[field] || '').replace(new RegExp(before, 'g'), after)
        return entry
    },
    delete: (entry, field, value) => {
        return (entry[field] !== value) ? entry : null
    },
    splitBy: (entry, field, char = ' ') => {
        const values = entry[field].split(char)
        return values.map(value => ({ ...entry, [field]: value }))
    }
}

export function process(filePath, options) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = adifReader(fileContents)
    let outputFile = filePath

    for (const option in options) {
        if (!actions[option]) {
            continue
        }

        if (!Array.isArray(options[option])) {
            options[option] = [ options[option] ]
        }

        for (const value of options[option]) {
            console.log(`Firing action "${option}" with values "${value}"...`)
            data.entries = data.entries.reduce((carry, entry) => {
                const processedEntry = actions[option](entry, ...value.split(':'))
                if (Array.isArray(processedEntry)) {
                    return [...carry, ...processedEntry]
                } else if (processedEntry) {
                    return [...carry, processedEntry]
                } else {
                    return carry
                }
            }, [])
        }
    }

    if (options.output) {
        outputFile = options.output
    }

    console.log(`Writing output to ${outputFile}...`)

    fs.writeFileSync(outputFile, adifWriter(data.header, data.entries))
}
