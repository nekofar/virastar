import { BracesSpacingProcessor } from './BracesSpacingProcessor'

describe('BracesSpacingProcessor', () => {
  it('should remove spaces inside braces', () => {
    const processor = new BracesSpacingProcessor()
    const input = 'The quick ( brown ) fox jumps [ over ] the { lazy } dog.'
    const expectedOutput = 'The quick (brown) fox jumps [over] the {lazy} dog.'
    const output = processor.process(input)
    expect(output).toEqual(expectedOutput)
  })

  it('should remove spaces around braces', () => {
    const processor = new BracesSpacingProcessor()
    const input =
      'The quick (  brown ) fox jumps  [  over ]  the  {  lazy  }  dog.'
    const expectedOutput = 'The quick (brown) fox jumps [over] the {lazy} dog.'
    const output = processor.process(input)
    expect(output).toEqual(expectedOutput)
  })

  it('should not change text without braces', () => {
    const processor = new BracesSpacingProcessor()
    const input = 'The quick brown fox jumps over the lazy dog.'
    const expectedOutput = 'The quick brown fox jumps over the lazy dog.'
    const output = processor.process(input)
    expect(output).toEqual(expectedOutput)
  })
})
