import { BaseProcessor } from './BaseProcessor'

/**
 * A class that processes text by replacing heh + ye/hamza with heh-ye + ZWNJ.
 */
export class SuffixSpacingHamzehProcessor extends BaseProcessor {
  /**
   * Replaces heh + ye/hamza with heh-ye + ZWNJ and returns the modified text.
   *
   * @param text The text to modify.
   * @returns The modified text with heh + ye/hamza replaced with heh-ye + ZWNJ.
   */
  public process(text: string): string {
    const replacement = '$1\u0647\u200c\u06cc$3'

    // Replace heh + ye, heh + standalone hamza, and heh + hamza above with heh-ye + ZWNJ.
    return text
      .replace(/(\S)(ه[\s\u200c]+[یي])([\s\u200c])/g, replacement)
      .replace(/(\S)(ه[\s\u200c]?\u0621)([\s\u200c])/g, replacement)
      .replace(/(\S)(ه[\s\u200c]?\u0654)([\s\u200c])/g, replacement)
  }
}
