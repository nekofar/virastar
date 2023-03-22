import * as yargs from 'yargs'
import * as fs from 'fs'
import virastar from '@nekofar/virastar'
import * as console from 'console'

/**
 * Parses the command line arguments using yargs.
 */
const parser = yargs
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'File to process',
  })
  .help()
  .alias('help', 'h')

/**
 * The main function that processes the file using the Virastar library.
 */
async function main(): Promise<void> {
  // Parse the command-line arguments
  const argv = (await parser.argv) as { file?: string }

  // Check if the 'file' option was specified
  if (!argv.file) {
    console.error('Error: You must specify a file to process')
    process.exit(1)
  }

  // Read the contents of the file asynchronously
  fs.readFile(argv.file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file '${argv.file}': ${err}`)
      process.exit(1)
    }

    // Process the data using the Virastar library
    const processedData = virastar().process(data)

    // Write the processed data back to the file asynchronously
    fs.writeFile(argv.file!, processedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file '${argv.file}': ${err}`)
        process.exit(1)
      }

      console.log(`File '${argv.file}' processed successfully.`)
    })
  })
}

main().then((r) => console.log(r))
