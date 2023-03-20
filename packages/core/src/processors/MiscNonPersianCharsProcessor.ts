import { BaseProcessor } from './BaseProcessor'

export class MiscNonPersianCharsProcessor extends BaseProcessor {
  // props @ebraminio/persiantools
  /**
   * Replaces misc. non-Persian characters with their Persian equivalent.
   * @param text The text to fix.
   * @returns The fixed text.
   */
  public process(text: string): string {
    return this.charReplace(text, 'كڪيىۍېہە', 'ککییییههه')
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
