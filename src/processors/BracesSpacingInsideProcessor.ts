import { BaseProcessor } from "./BaseProcessor";

/**
 * A processor that replaces spaces inside various types of braces with no spaces.
 */
export class BracesSpacingInsideProcessor extends BaseProcessor {
  /**
   * Replaces spaces inside various types of braces with no spaces.
   * @param {string} text - The input string to fix.
   * @returns {string} The fixed string with no spaces inside the braces.
   */
  public process(text: string): string {
    const replacement = "$1$2$3";

    return (
      text
        // Remove inside spaces for `()`, `[]`, `{}`, `“”`, and `«»`.
        .replace(/(\()\s*([^)]+?)\s*?(\))/g, replacement)
        .replace(/(\[)\s*([^\]]+?)\s*?(])/g, replacement)
        .replace(/(\{)\s*([^}]+?)\s*?(})/g, replacement)
        .replace(/(“)\s*([^”]+?)\s*?(”)/g, replacement)
        .replace(/(«)\s*([^»]+?)\s*?(»)/g, replacement)

        // Remove Markdown link spaces inside normal ().
        .replace(/(\(\[.*?]\(.*?\))\s+(\))/g, "$1$2")
    );
  }
}
