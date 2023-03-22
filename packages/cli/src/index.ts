import * as yargs from 'yargs'
import * as fs from 'fs'
import { Virastar } from '@nekofar/virastar'

const parser = yargs
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'File to process',
  })
  .help()
  .alias('help', 'h')

;(async () => {
  const argv: { [x: string]: unknown; file: string | undefined } =
    await parser.argv

  if (!argv.file) {
    console.error('Error: You must specify a file to process')
    process.exit(1)
  }

  fs.readFile(argv.file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file '${argv.file}': ${err}`)
      process.exit(1)
    }

    const processedData = new Virastar().process(data)

    fs.writeFile(argv.file!, processedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file '${argv.file}': ${err}`)
        process.exit(1)
      }

      console.log(`File '${argv.file}' processed successfully.`)
    })
  })
})()
