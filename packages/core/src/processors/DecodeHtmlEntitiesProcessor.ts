import { BaseProcessor } from './BaseProcessor'

/**
 * A class that decodes HTML entities in a given text.
 */
export class DecodeHtmlEntitiesProcessor extends BaseProcessor {
  // Object that contains the HTML entities and their corresponding decoded values
  private readonly htmlEntities: { [key: string]: string | number } = {
    'sbquo;': '\u201a',
    'lsquo;': '\u2018',
    'lsquor;': '\u201a',
    'ldquo;': '\u201c',
    'ldquor;': '\u201e',
    'rdquo;': '\u201d',
    'rdquor;': '\u201d',
    'rsquo;': '\u2019',
    'rsquor;': '\u2019',
    'apos;': "'",
    'QUOT;': '"',
    QUOT: '"',
    'quot;': '"',
    quot: '"',
    'zwj;': '\u200d',
    'ZWNJ;': '\u200c',
    'zwnj;': '\u200c',
    'shy;': '\u00ad', // Incorrectly used as ZWNJ
  }

  /**
   * Decodes HTML entities in the given text.
   * @param text The text containing HTML entities to decode.
   * @returns The text with HTML entities decoded.
   */
  public process(text: string): string {
    return text.replace(
      /&(#?[^;\W]+;?)/g,
      // Replaced the anonymous function with an arrow function for better readability
      (_matched: string, match: string): string => {
        let n: RegExpExecArray | null

        if ((n = /^#(\d+);?$/.exec(match))) {
          // Decodes numeric entities
          return String.fromCharCode(parseInt(n[1]!, 10))
        } else if ((n = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match))) {
          // Decodes hexadecimal entities
          return String.fromCharCode(parseInt(n[1]!, 16))
        } else {
          const hasSemi = /;$/.test(match)
          const withoutSemi = hasSemi ? match.replace(/;$/, '') : match
          const target =
            this.htmlEntities[withoutSemi] ||
            (hasSemi && this.htmlEntities[match])

          if (typeof target === 'number') {
            // Converts number to character
            return String.fromCharCode(target)
          } else if (typeof target === 'string') {
            return target
          } else {
            return `&${match}`
          }
        }
      },
    )
  }
}
