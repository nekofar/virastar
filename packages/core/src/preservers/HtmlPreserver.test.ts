import { HtmlPreserver } from './HtmlPreserver'

describe('HtmlPreserver', () => {
  const preserver = new HtmlPreserver()

  it('should preserve and restore HTML tags correctly', () => {
    const text = '<p>Hello, <strong>world</strong>!</p>'
    const prepared = preserver.prepare(text)
    expect(prepared).toBe(
      ' __HTML__PRESERVER__ Hello,  __HTML__PRESERVER__ world __HTML__PRESERVER__ ! __HTML__PRESERVER__ ',
    )
    const restored = preserver.restore(prepared)
    expect(restored).toBe(text)
  })
})
