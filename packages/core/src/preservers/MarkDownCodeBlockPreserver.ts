import { BasePreserver } from './BasePreserver'

/**
 * A preserver for Markdown code blocks.
 */
export class MarkDownCodeBlockPreserver extends BasePreserver {
  private readonly codeBlockPattern: RegExp = /```([\s\S]*?)```/gm
  private readonly placeholder: string = '__MD_CODE_BLOCK__PRESERVER__'

  /**
   * Replaces Markdown code blocks with a placeholder string and preserves the code blocks in the `preserves` array.
   * @param text The text to be prepared.
   * @returns The text with Markdown code blocks replaced by the placeholder string.
   */
  prepare(text: string): string {
    return text.replace(this.codeBlockPattern, (codeBlock: string) => {
      this.preserves.push(codeBlock)
      return this.placeholder
    })
  }

  /**
   * Restores preserved Markdown code blocks in the text using the placeholder string.
   * @param text The text to be restored.
   * @returns The text with Markdown code blocks restored.
   */
  restore(text: string): string {
    let preservedCodeBlock: string | undefined
    while ((preservedCodeBlock = this.getNextPreserved())) {
      text = text.replace(this.placeholder, preservedCodeBlock)
    }
    return text
  }
}
