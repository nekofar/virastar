import { DashProcessor } from './DashProcessor'

describe('DashProcessor', () => {
  const processor = new DashProcessor()

  it('replaces triple dash with mdash', () => {
    const input = 'This is some text --- with a triple dash.'
    const expectedOutput = 'This is some text \u2014 with a triple dash.'
    const output = processor.process(input)
    expect(output).toEqual(expectedOutput)
  })

  it('replaces double dash with ndash', () => {
    const input = 'This is some text -- with a double dash.'
    const expectedOutput = 'This is some text \u2013 with a double dash.'
    const output = processor.process(input)
    expect(output).toEqual(expectedOutput)
  })
})
