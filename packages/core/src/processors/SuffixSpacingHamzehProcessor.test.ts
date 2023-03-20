import { SuffixSpacingHamzehProcessor } from './SuffixSpacingHamzehProcessor'

describe('SuffixSpacingHamzehProcessor', () => {
  const processor = new SuffixSpacingHamzehProcessor()

  it('should replace heh + ye with heh-ye + ZWNJ', () => {
    const text = 'به دنبال مقاله‌های جدیدی می‌گردم'
    const expected = 'به دنبال مقاله‌های جدیدی می‌گردم'
    const modified = processor.process(text)
    expect(modified).toEqual(expected)
  })

  it('should replace heh + standalone hamza with heh-ye + ZWNJ', () => {
    const text = 'یکی از دوستانم حامد هست'
    const expected = 'یکی از دوستانم حامد هست'
    const modified = processor.process(text)
    expect(modified).toEqual(expected)
  })

  it('should replace heh + hamza above with heh-ye + ZWNJ', () => {
    const text = 'این کتاب کار خودش را انجام داده است؟'
    const expected = 'این کتاب کار خودش را انجام داده است؟'
    const modified = processor.process(text)
    expect(modified).toEqual(expected)
  })

  it('should replace multiple occurrences of heh + ye/hamza with heh-ye + ZWNJ', () => {
    const text = 'این کتاب هم خوبه هم جالبه'
    const expected = 'این کتاب هم خوبه هم جالبه'
    const modified = processor.process(text)
    expect(modified).toEqual(expected)
  })

  it('should handle empty input', () => {
    const text = ''
    const expected = ''
    const modified = processor.process(text)
    expect(modified).toEqual(expected)
  })
})
