import { CurlyBracesPreserver } from './CurlyBracesPreserver'

describe('CurlyBracesPreserver', () => {
  let preserver: CurlyBracesPreserver

  beforeEach(() => {
    preserver = new CurlyBracesPreserver()
  })

  describe('prepare', () => {
    it('should replace curly braces with a unique string', () => {
      const input = 'hello {world}'
      const expectedOutput = 'hello  __BRACES__PRESERVER__ '
      expect(preserver.prepare(input)).toEqual(expectedOutput)
    })

    it('should replace multiple curly braces with unique strings', () => {
      const input = '{foo} bar {baz}'
      const expectedOutput =
        ' __BRACES__PRESERVER__  bar  __BRACES__PRESERVER__ '
      expect(preserver.prepare(input)).toEqual(expectedOutput)
    })

    it('should not modify the input if it contains no curly braces', () => {
      const input = 'hello world'
      expect(preserver.prepare(input)).toEqual(input)
    })
  })

  describe('restore', () => {
    it('should restore previously preserved curly braces', () => {
      preserver.prepare('hello {world}')
      const input = 'hello  __BRACES__PRESERVER__ '
      const expectedOutput = 'hello {world}'
      expect(preserver.restore(input)).toEqual(expectedOutput)
    })

    it('should restore multiple previously preserved curly braces', () => {
      preserver.prepare('{foo} bar {baz}')
      const input = ' __BRACES__PRESERVER__  bar  __BRACES__PRESERVER__ '
      const expectedOutput = '{foo} bar {baz}'
      expect(preserver.restore(input)).toEqual(expectedOutput)
    })

    it('should not modify the input if it contains no preserved strings', () => {
      const input = 'hello world'
      expect(preserver.restore(input)).toEqual(input)
    })
  })
})
