import { BaseProcessor } from './BaseProcessor'

export class EnglishQuotesProcessor extends BaseProcessor {
  /**
   * Replaces English quote marks with their Persian equivalent.
   * @param text The input string in Persian to be fixed.
   * @returns Returns a string with English quote marks replaced with their Persian equivalent.
   */
  public process(text: string): string {
    return text.replace(/(["'`]+)(.+?)(\1)/g, '«$2»')
  }
}
