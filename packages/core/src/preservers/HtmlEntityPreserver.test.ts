import { HtmlEntityPreserver } from './HtmlEntityPreserver'

describe('HtmlEntityPreserver', () => {
  let preserver: HtmlEntityPreserver

  beforeEach(() => {
    preserver = new HtmlEntityPreserver()
  })

  describe('prepare', () => {
    it('should replace HTML entities with a unique string', () => {
      const input = '&lsquo;'
      const expectedOutput = ' __ENTITIES__PRESERVER__ '
      const output = preserver.prepare(input)
      expect(output).toBe(expectedOutput)
    })
  })
})
