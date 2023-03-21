import { BaseProcessor } from './BaseProcessor'

/**
 * A processor that replaces Arabic numbers with their Persian equivalent.
 */
export class ArabicNumbersProcessor extends BaseProcessor {
  // Define the Persian digits to be used for replacement
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

  private arabicDigits =
    '\u0661' +
    '\u0662' +
    '\u0663' +
    '\u0664' +
    '\u0665' +
    '\u0666' +
    '\u0667' +
    '\u0668' +
    '\u0669' +
    '\u0660'

  /**
   * Replaces Arabic numbers with their Persian equivalent.
   *
   * @param text - The input text.
   * @returns The text with Arabic numbers replaced with their Persian equivalent.
   */
  public process(text: string): string {
    return text
      .split('')
      .map((char) =>
        this.arabicDigits.includes(char)
          ? this.persianDigits.charAt(this.arabicDigits.indexOf(char))
          : char,
      )
      .join('')
  }
}
