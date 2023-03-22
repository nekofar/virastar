import { BaseProcessor } from './BaseProcessor'

/**
 * A processor that replaces ASCII punctuations with their Persian equivalent.
 */
export class PunctuationProcessor extends BaseProcessor {
  private readonly fromBatch: string = ',;'
  private readonly toBatch: string = '\u060C\u061B' // ،؛

  /**
   * Replaces ASCII punctuations with their Persian equivalent.
   *
   * @param text - The input text.
   * @returns The processed text.
   */
  public process(text: string): string {
    return this.fixPunctuations(text)
  }

  /**
   * Replaces ASCII punctuations with their Persian equivalent.
   *
   * @param text - The input text.
   * @returns The processed text.
   */
  private fixPunctuations(text: string): string {
    return text
      .split('')
      .map((char) =>
        this.fromBatch.includes(char)
          ? this.toBatch.charAt(this.fromBatch.indexOf(char))
          : char,
      )
      .join('')
  }
}
