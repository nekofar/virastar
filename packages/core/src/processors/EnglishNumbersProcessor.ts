import { BaseProcessor } from './BaseProcessor'

/**
 * A processor that replaces English numbers with their Persian equivalents.
 */
export class EnglishNumbersProcessor extends BaseProcessor {
  private readonly persianDigits: string =
    '\u06F1' + // Persian digit 1
    '\u06F2' + // Persian digit 2
    '\u06F3' + // Persian digit 3
    '\u06F4' + // Persian digit 4
    '\u06F5' + // Persian digit 5
    '\u06F6' + // Persian digit 6
    '\u06F7' + // Persian digit 7
    '\u06F8' + // Persian digit 8
    '\u06F9' + // Persian digit 9
    '\u06F0' // Persian digit 0

  private readonly englishDigits: string = '1234567890'

  /**
   * Replaces English numbers with their Persian equivalent.
   *
   * @param text - The input text to be processed.
   * @returns The processed text with Persian numbers.
   */
  public process(text: string): string {
    return text
      .split('')
      .map((char) =>
        this.englishDigits.includes(char)
          ? this.persianDigits.charAt(this.englishDigits.indexOf(char))
          : char,
      )
      .join('')
  }
}
