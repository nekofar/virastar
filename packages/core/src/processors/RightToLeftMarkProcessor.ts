import { BaseProcessor } from './BaseProcessor'

export class RightToLeftMarkProcessor extends BaseProcessor {
  /**
   * Replaces Right-to-Left marks followed by Persian characters with Zero-Width Non-Joiners (ZWNJ) in the given text.
   * @param text The input string to process.
   * @returns Returns the processed string.
   */
  public process(text: string): string {
    return text.replace(/([^a-zA-Z\-_])(\u200F)/g, '$1\u200c')
  }
}
