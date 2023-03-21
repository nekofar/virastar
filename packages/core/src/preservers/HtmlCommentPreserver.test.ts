import { HtmlCommentPreserver } from './HtmlCommentPreserver'

describe('HtmlCommentPreserver', () => {
  const preserver = new HtmlCommentPreserver()

  it('should preserve HTML comments in the input text', () => {
    const inputText = '<!-- This is a comment -->'
    const expectedOutputText = ' __COMMENT__PRESERVER__ '

    const actualOutputText = preserver.prepare(inputText)

    expect(actualOutputText).toEqual(expectedOutputText)
  })

  it('should preserve multiple HTML comments in the input text', () => {
    const inputText =
      '<!-- This is a comment --> Some text <!-- Another comment -->'
    const expectedOutputText =
      ' __COMMENT__PRESERVER__  Some text  __COMMENT__PRESERVER__ '

    const actualOutputText = preserver.prepare(inputText)

    expect(actualOutputText).toEqual(expectedOutputText)
  })
})
