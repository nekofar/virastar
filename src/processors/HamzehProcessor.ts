import { BaseProcessor } from './BaseProcessor';

export class HamzehProcessor extends BaseProcessor {
  /**
   * Replaces various forms of "heh" followed by "ye" or "hamza" with the standard form "heh with hamza"
   * and replaces various forms of the Persian letter "ve" with the standard form "heh with hamza".
   * @param text The text to fix.
   * @returns The fixed text.
   */
  public process(text: string): string {
    const replacement = "$1هٔ$3";

    return (
      text
        // replaces ه followed by (space|ZWNJ|lrm) follow by ی with هٔ
        .replace(/(\S)(ه[\s\u200c\u200e]+[یي])([\s\u200c\u200e])/g, replacement)

        // replaces ه followed by (space|ZWNJ|lrm|nothing) follow by ء with هٔ
        .replace(
          /(\S)(ه[\s\u200c\u200e]?\u0621)([\s\u200c\u200e])/g,
          replacement,
        )

        // replaces هٓ or single-character ۀ with the standard هٔ
        .replace(/(ۀ|هٓ)/g, 'هٔ')
    );
  }
}
