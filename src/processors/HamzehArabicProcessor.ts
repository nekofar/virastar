import { BaseProcessor } from './BaseProcessor'

export class HamzehArabicProcessor extends BaseProcessor {
  /**
   * Replaces Arabic hamzeh with هٔ in the input string.
   * @param text The input string to replace Arabic hamzeh in.
   * @returns The input string with Arabic hamzeh replaced with هٔ.
   */
  public process(text: string): string {
    return text.replace(/(\S)ة([\s\u200c\u200e])/g, '$1هٔ$2')
  }
}
