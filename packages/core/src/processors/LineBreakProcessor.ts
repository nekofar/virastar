import { BaseProcessor } from './BaseProcessor'

/**
 * A processor for cleaning up line breaks in Persian text.
 */
export class LineBreakProcessor extends BaseProcessor {
  /**
   * Cleans up line breaks in a Persian text.
   * @param {string} text - The Persian text to clean up.

   * @returns {string} - The cleaned text.
   */
  public process(text: string): string {
    // Cleans more than two contiguous line-breaks.
    return text.replace(/\n{2,}/g, '\n\n')
  }
}
