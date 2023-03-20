import { BaseProcessor } from './BaseProcessor'

export class ExtraMarksProcessor extends BaseProcessor {
  /**
   * Removes extra marks from the text and replaces repeated marks with a single one.
   *
   * @param text The input text to clean up.
   * @returns The cleaned text.
   */
  public process(text: string): string {
    // remove extra marks
    text = this.cleanupExtraMarks(text)

    return text
  }

  /**
   * Removes extra marks from the text and replaces repeated marks with a single one.
   *
   * @param text The input text to clean up.
   * @returns The cleaned text.
   */
  private cleanupExtraMarks(text: string) {
    // remove space between different/same marks
    text = text.replace(/([؟?!])([ ]+)(?=[؟?!])/g, '$1')

    // replace more than one exclamation mark with just one
    text = text.replace(/(!){2,}/g, '$1')

    // replace more than one english or persian question mark with just one
    text = text.replace(/([\u061F?]){2,}/g, '$1')

    // re-order consecutive marks
    text = text.replace(/(!)([ \t]*)([\u061F?])/g, '$3$1')

    // `?!` --> `!?`
    return text
  }
}
