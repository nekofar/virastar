import { BaseProcessor } from './BaseProcessor'

export class BracesSpacingProcessor extends BaseProcessor {
  /**
   * Replaces extra spaces around braces in the given text.
   *
   * @param text - The input text.
   * @returns The input text with extra spaces around braces removed.
   */
  public process(text: string): string {
    const patterns: RegExp[] = [
      /[ \t\u200c]*(\()\s*([^)]+?)\s*?(\))[ \t\u200c]*/g, // matches "(...)"
      /[ \t\u200c]*(\[)\s*([^\]]+?)\s*?(])[ \t\u200c]*/g, // matches "[...]"
      /[ \t\u200c]*(\{)\s*([^}]+?)\s*?(})[ \t\u200c]*/g, // matches "{...}"
      /[ \t\u200c]*(“)\s*([^”]+?)\s*?(”)[ \t\u200c]*/g, // matches "“...”"
      /[ \t\u200c]*(«)\s*([^»]+?)\s*?(»)[ \t\u200c]*/g, // matches "«...»"
    ]

    const replacement = ' $1$2$3 '
    return patterns.reduce((result, pattern) => {
      return result.replace(pattern, replacement)
    }, text)
  }
}
