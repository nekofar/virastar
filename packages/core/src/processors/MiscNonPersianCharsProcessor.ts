import { BaseProcessor } from './BaseProcessor'

/**
 * A processor that replaces miscellaneous non-Persian characters with their
 * Persian equivalents.
 */
export class MiscNonPersianCharsProcessor extends BaseProcessor {
  private fromBatch = '\u0643\u06A9\u064A\u0649\u06CD\u06D0\u06C1\u06D5'
  private toBatch = '\u06A9\u06A9\u06CC\u06CC\u06CC\u06CC\u0647\u0647'
  /**
   * Replaces misc. non-Persian characters with their Persian equivalent.
   *
   * @param text - The text to fix.
   * @returns The fixed text.
   */
  public process(text: string): string {
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
