import { FrontMatterPreserver } from '../../src/preservers/FrontMatterPreserver'

describe('FrontMatterPreserver', () => {
  it('should correctly preserve front matter and restore it', () => {
    const inputText = `---
title: Example
---

This is some text.`

    const expectedOutput = `__FRONTMATTER__PRESERVER__
This is some text.`

    const frontMatterPreserver = new FrontMatterPreserver()
    const preparedText = frontMatterPreserver.prepare(inputText)
    expect(preparedText).toBe(expectedOutput)

    const restoredText = frontMatterPreserver.restore(preparedText)
    expect(restoredText).toBe(inputText)
  })
})
