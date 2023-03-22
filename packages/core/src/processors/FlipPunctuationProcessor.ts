import { BaseProcessor } from './BaseProcessor'
import { ThreeDotsProcessor } from './ThreeDotsProcessor'
import { EllipsisProcessor } from './EllipsisProcessor'

/**
 * Processor to flip punctuations of a given text
 */
export class FlipPunctuationProcessor extends BaseProcessor {
  /**
   * Flips punctuations in the text
   * @param text - The text to process

   * @returns The processed text
   */
  public process(text: string): string {
    const end = ['-']
    const start = ['!', '.', '،', '…', '"']
    const before = []
    const after = []

    text = this.fixThreeDots(text)

    for (let iStart = 0; iStart < start.length; iStart++) {
      const sElement = start[iStart]
      const sReg = new RegExp(`^\\${sElement}`, 'i')
      if (sReg.test(text)) {
        text = text.replace(sReg, '').trim()
        after.push(sElement)
      }
    }

    for (let iEnd = 0; iEnd < end.length; iEnd++) {
      const eElement = end[iEnd]
      const eReg = new RegExp(`\\${eElement}$`, 'i')
      if (eReg.test(text)) {
        text = text.replace(eReg, '').trim()
        before.push(eElement)
      }
    }

    for (let iBefore = 0; iBefore < before.length; iBefore++) {
      text = `${before[iBefore]} ${text}`
    }

    for (let iAfter = 0; iAfter < after.length; iAfter++) {
      text += after[iAfter]
    }

    return this.normalizeEllipsis(text)
  }

  /**
   * Fixes the punctuation spacing for three dots in Persian text.
   * Remove spaces between dots and replaces three dots with ellipsis character.
   *
   * @param text The input text to fix punctuation spacing.
   * @returns The text with fixed punctuation spacing for three dots.
   */
  private fixThreeDots(text: string): string {
    return new ThreeDotsProcessor().process(text)
  }

  /**
   * Normalizes the usage of ellipsis by replacing more than one ellipsis with one and adding a space after it if needed.
   * @param text The text to normalize.
   * @returns The normalized text.
   */
  private normalizeEllipsis(text: string): string {
    return new EllipsisProcessor().process(text)
  }
}
