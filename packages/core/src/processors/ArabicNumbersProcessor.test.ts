import { ArabicNumbersProcessor } from './ArabicNumbersProcessor'

describe('ArabicNumbersProcessor', () => {
  const processor = new ArabicNumbersProcessor()

  it('should replace Arabic numbers with Persian equivalent', () => {
    const input = '١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠'
    const expectedOutput =
      '\u06F1 \u06F2 \u06F3 \u06F4 \u06F5 \u06F6 \u06F7 \u06F8 \u06F9 \u06F0'
    const output = processor.process(input)
    expect(output).toBe(expectedOutput)
  })

  it('should not replace non-Arabic numerals', () => {
    const input = '1234567890'
    const expectedOutput = '1234567890'
    const output = processor.process(input)
    expect(output).toBe(expectedOutput)
  })

  it('should handle empty string input', () => {
    const input = ''
    const expectedOutput = ''
    const output = processor.process(input)
    expect(output).toBe(expectedOutput)
  })
})
