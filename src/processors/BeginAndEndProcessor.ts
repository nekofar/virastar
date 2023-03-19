import { BaseProcessor } from "./BaseProcessor";

/**
 * Removes leading and trailing whitespace, newlines, zwnj, directionality marks, and nbsp from text.
 */
export class BeginAndEndProcessor extends BaseProcessor {
  /**
   * Processes the text by removing leading and trailing whitespace, newlines, zwnj, directionality marks, and nbsp.
   *
   * @param text - The text to process.
   * @returns The processed text.
   */
  public process(text: string): string {
    return (
      text
        // Removes space/tab/zwnj/nbsp from the beginning of the new-lines.
        .replace(/([\n]+)[ \t\u200c\u00a0]*/g, "$1")

        // Removes spaces, tabs, zwnj, direction marks, and new lines from
        // the beginning and end of text.
        // Ref: https://stackoverflow.com/a/38490203
        .replace(/^[\s\u200c\u200e\u200f]+|[\s\u200c\u200e\u200f]+$/g, "")
    );
  }
}
