import { BaseProcessor } from './BaseProcessor'

/**
 * A class that replaces Arabic hamzeh with هٔ in a given string.
 */
export class HamzehArabicProcessor extends BaseProcessor {
  /**
   * Replaces Arabic hamzeh with هٔ in the input string.
   *
   * @param text - The input string to replace Arabic hamzeh in.
   * @returns The input string with Arabic hamzeh replaced with هٔ.
   */
  public process(text: string): string {
    return text.replace(/(\S)\u0629([\s\u200c\u200e])/g, '$1\u0647\u0654$2')
  }
}
