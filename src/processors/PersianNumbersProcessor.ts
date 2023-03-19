import { BaseProcessor } from './BaseProcessor'

export class PersianNumbersProcessor extends BaseProcessor {
  /**
   * Converts Persian numbers to Arabic numbers in a given string.
   * @param text - The input string to convert Persian numbers.
   * @param options - Additional options to customize the processing.
   * @returns The string with Persian numbers converted to Arabic numbers.
   */
  public process(text: string, options?: object): string {
    // Using regex to match Persian numbers and replacing them with Arabic numbers
    return text.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (char) {
      // Converting each matched Persian number to an Arabic number
      return (char.charCodeAt(0) & 0xf).toString()
    })
  }
}
