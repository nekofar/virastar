import { LeadingAndTrailingSpaceProcessor } from './LeadingAndTrailingSpaceProcessor'

describe('BeginAndEndProcessor', () => {
  const processor = new LeadingAndTrailingSpaceProcessor()

  it('removes leading and trailing whitespace, newlines, zwnj, directionality marks, and nbsp', () => {
    const input = `  \n\t\u200c\u00a0Hello World!\u200e \n`
    const expectedOutput = 'Hello World!'

    const output = processor.process(input)

    expect(output).toBe(expectedOutput)
  })

  it('does not modify text without leading and trailing whitespace, newlines, zwnj, directionality marks, and nbsp', () => {
    const input = 'Hello World!'
    const expectedOutput = input

    const output = processor.process(input)

    expect(output).toBe(expectedOutput)
  })
})
