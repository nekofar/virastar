import { BaseProcessor } from "./BaseProcessor";

export class SuffixSpacingMiscProcessor extends BaseProcessor {
  /**
   * Replaces ه followed by ئ or ی, and then by ی, with ه\u200cای.
   * Example: خانه‌ئی becomes خانه‌ای
   * @param text - The input text to fix
   * @returns The text with fixed suffix misc
   */
  public process(text: string): string {
    return text.replace(
      /(\S)ه[\u200c\u200e][ئی]ی([\s\u200c\u200e])/g,
      "$1ه\u200cای$2"
    );
  }
}
