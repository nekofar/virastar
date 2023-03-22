import { MarkDownCodeBlockPreserver } from './MarkDownCodeBlockPreserver'

describe('MarkDownCodeBlockPreserver', () => {
  it('preserves Markdown code blocks', () => {
    const text = `
      This is some text.

      \`\`\`
      const foo = 'bar'
      console.log(foo)
      \`\`\`

      More text.

      \`\`\`typescript
      class MyClass {
        private prop: string

        constructor(prop: string) {
          this.prop = prop
        }

        public getProp() {
          return this.prop
        }
      }
      \`\`\`
    `

    const preserver = new MarkDownCodeBlockPreserver()
    const preparedText = preserver.prepare(text)

    // Ensure Markdown code blocks are replaced with placeholders
    expect(preparedText).toContain('__MD_CODE_BLOCK__PRESERVER__')

    const restoredText = preserver.restore(preparedText)

    // Ensure placeholders are replaced with original Markdown code blocks
    expect(restoredText).toEqual(text)
  })
})
