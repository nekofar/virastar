import { DecodeHtmlEntitiesProcessor } from './DecodeHtmlEntitiesProcessor'

describe('DecodeHtmlEntitiesProcessor', () => {
  const processor = new DecodeHtmlEntitiesProcessor()

  it('should decode decimal entities', () => {
    const input = '&#169; is the decimal entity for ©.'
    const expected = '© is the decimal entity for ©.'
    expect(processor.process(input)).toEqual(expected)
  })

  it('should decode hexadecimal entities', () => {
    const input = '&#x2122; is the hexadecimal entity for ™.'
    const expected = '™ is the hexadecimal entity for ™.'
    expect(processor.process(input)).toEqual(expected)
  })

  it('should ignore invalid entities', () => {
    const input = 'The &foo; entity is not valid.'
    const expected = 'The &foo; entity is not valid.'
    expect(processor.process(input)).toEqual(expected)
  })
})
