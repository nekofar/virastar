import { BracesSpacingInsideProcessor } from './BracesSpacingInsideProcessor'

describe('BracesSpacingInsideProcessor', () => {
  const processor = new BracesSpacingInsideProcessor()

  it('replaces spaces inside () with no spaces', () => {
    const input = 'This ( is ) a (test)'
    const expected = 'This (is) a (test)'
    expect(processor.process(input)).toBe(expected)
  })

  it('replaces spaces inside [] with no spaces', () => {
    const input = 'This [ is ] a [test]'
    const expected = 'This [is] a [test]'
    expect(processor.process(input)).toBe(expected)
  })

  it('replaces spaces inside {} with no spaces', () => {
    const input = 'This { is } a {test}'
    const expected = 'This {is} a {test}'
    expect(processor.process(input)).toBe(expected)
  })

  it('replaces spaces inside “” with no spaces', () => {
    const input = 'This “ is ” a “test”'
    const expected = 'This “is” a “test”'
    expect(processor.process(input)).toBe(expected)
  })

  it('replaces spaces inside «» with no spaces', () => {
    const input = 'This « is » a «test»'
    const expected = 'This «is» a «test»'
    expect(processor.process(input)).toBe(expected)
  })

  it('removes spaces inside Markdown link ()', () => {
    const input = 'This is a [link](with spaces) in (braces)'
    const expected = 'This is a [link](with spaces) in (braces)'
    expect(processor.process(input)).toBe(expected)
  })
})
