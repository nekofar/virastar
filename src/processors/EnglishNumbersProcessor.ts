import { BaseProcessor } from './BaseProcessor'

export class EnglishNumbersProcessor extends BaseProcessor {
  private readonly digits: string =
    '\u06F1' +
    "\u06F2" +
    "\u06F3" +
    "\u06F4" +
    "\u06F5" +
    "\u06F6" +
    "\u06F7" +
    "\u06F8" +
    "\u06F9" +
    "\u06F0"

  /**
   * Replaces English numbers with their Persian equivalent.
   * @param text - The input text to be processed.
   * @returns The processed text with Persian numbers.
   */
  process(text: string): string {
    return this.charReplace(text, "1234567890", this.digits);
  }

  /**
   * Replaces all occurrences of characters from a given batch in the text
   * with their corresponding characters from another batch.
   * @param text - The input text.
   * @param fromBatch - The batch of characters to be replaced.
   * @param toBatch - The batch of replacement characters.
   * @returns The text with replaced characters.
   */
  private charReplace(
    text: string,
    fromBatch: string,
    toBatch: string,
  ): string {
    const fromChars = fromBatch.split('')
    const toChars = toBatch.split('')
    for (let i = 0; i < fromChars.length; i++) {
      text = text.replace(new RegExp(fromChars[i], 'g'), toChars[i])
    }
    return text
  }
}
