import { DateNormalizerProcessor } from './DateNormalizerProcessor'

describe('DateNormalizerProcessor', () => {
  const processor = new DateNormalizerProcessor()

  it('should normalize a date in the format of dd-mm-yyyy', () => {
    const input = 'The date is 18-03-2023'
    const expectedOutput = 'The date is 2023/03/18'
    const output = processor.process(input)
    expect(output).toBe(expectedOutput)
  })

  it('should normalize a date in the format of mm/dd/yyyy', () => {
    const input = 'The date is 03/18/2023'
    const expectedOutput = 'The date is 2023/18/03'
    const output = processor.process(input)
    expect(output).toBe(expectedOutput)
  })

  it('should not modify text without date formats', () => {
    const input = 'This text does not have any dates.'
    const expectedOutput = 'This text does not have any dates.'
    const output = processor.process(input)
    expect(output).toBe(expectedOutput)
  })
})
