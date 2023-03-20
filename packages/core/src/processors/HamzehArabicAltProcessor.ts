import { BaseProcessor } from './BaseProcessor'

export class HamzehArabicAltProcessor extends BaseProcessor {
  /**
   * Replaces Arabic Hamzeh ة with ه‌ی in Persian text
   * @param text Input text in Persian
   * @returns Text with Hamzeh ة replaced with ه‌ی
   */
  public process(text: string): string {
    return text.replace(/(\S)ة([\s\u200c\u200e])/g, '$1ه‌ی$2')
  }
}
