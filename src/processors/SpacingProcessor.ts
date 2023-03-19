import { BaseProcessor } from "./BaseProcessor";

/**
 * A processor that cleans up the spacing in the given text.
 */
export class SpacingProcessor extends BaseProcessor {
  /**
   * Cleans up the spacing in the given text.
   * @param {string} text - The text to clean up spacing for.
   * @returns {string} The cleaned up text.
   */
  public process(text: string): string {
    return (
      text

        // replaces more than one space with just a single one
        // except before/after preservers and before new-lines
        // .replace(/(?<![_]{2})([ ]{2,})(?![_]{2}|\n)/g, ' ') // WORKS: using lookbehind
        .replace(/([^_])([ ]{2,})(?![_]{2}|\n)/g, "$1 ")

        // cleans tab/space/zwnj/zwj/nbsp between two new-lines(\n)
        // @REF: https://stackoverflow.com/a/10965543/
        .replace(/^\n([\t\u0020\u200c\u200d\u00a0]*)\n$/gm, "\n\n")
    );
  }
}
