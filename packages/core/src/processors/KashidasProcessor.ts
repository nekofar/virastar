import { BaseProcessor } from './BaseProcessor'

export class KashidasProcessor extends BaseProcessor {
  /**
   * Replaces kashidas between numbers with ndash, and removes all kashidas between non-whitespace characters
   *
   * @param {string} text - The text to clean up
   * @returns {string} The cleaned up text
   */
  public process(text: string): string {
    return (
      text
        // converts kashida between numbers to ndash
        .replace(/([0-9۰-۹]+)ـ+([0-9۰-۹]+)/g, '$1–$2')

        // removes all kashidas between non-whitespace characters
        // MAYBE: more punctuations
        .replace(/([^\s.])\u0640+(?![\s.])/g, '$1')
    )
  }
}
