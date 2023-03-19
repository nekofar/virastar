import { BaseProcessor } from './BaseProcessor'

export class QuestionMarkProcessor extends BaseProcessor {
  /**
   * Replaces question marks with its Persian equivalent
   * @param text - The text to fix
   * @returns The text with fixed question marks
   */
  public process(text: string): string {
    return this.fixQuestionMark(text)
  }

  /**
   * Replaces question marks with its Persian equivalent
   * @param text - The text to fix
   * @returns The text with fixed question marks
   */
  private fixQuestionMark(text: string): string {
    return text.replace(/(\?)/g, '\u061F') // \u061F = ؟
  }
}
