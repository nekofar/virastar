import { BaseProcessor } from "./BaseProcessor";

/**
 * A processor class for normalizing the spacing between items in Markdown lists
 */
export class MarkdownListProcessor extends BaseProcessor {
  /**
   * Normalizes the spacing between items in Markdown lists
   * @param text - The text to be normalized
   * @param options - The options object (not used in this processor)
   * @returns The normalized text
   */
  public process(text: string, options?: object): string {
    // removes extra line between two items list
    return text.replace(/([\*\-\#]\s+.+?)\n{2,}(?=(?:[\*\-\#]\s+)|$)/g, "$1\n");
  }
}
