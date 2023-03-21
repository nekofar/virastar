import { HamzehArabicProcessor } from './HamzehArabicProcessor'

describe('HamzehArabicProcessor', () => {
  it('should not replace hamzeh at the beginning of a word', () => {
    const input = 'هٔواء'
    const processor = new HamzehArabicProcessor()
    const output = processor.process(input)
    expect(output).toEqual('هٔواء')
  })

  it('should replace multiple instances of hamzeh in a string', () => {
    const input = 'قامة المهٔندس'
    const processor = new HamzehArabicProcessor()
    const output = processor.process(input)
    expect(output).toEqual('قامهٔ المهٔندس')
  })

  it('should handle empty input', () => {
    const input = ''
    const processor = new HamzehArabicProcessor()
    const output = processor.process(input)
    expect(output).toEqual('')
  })

  it('should handle input with no hamzeh', () => {
    const input = 'هواء'
    const processor = new HamzehArabicProcessor()
    const output = processor.process(input)
    expect(output).toEqual('هواء')
  })
})
