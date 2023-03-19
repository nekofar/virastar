import { BaseProcessor } from './BaseProcessor'

/**
 * A processor class that normalizes end-of-line characters in the input text.
 */
export class EndOfLineProcessor extends BaseProcessor {
  /**
   * Replaces all Windows-style and Mac-style end of line characters with Unix-style end of line character (\n).
   *
   * @param text - The input text to be normalized.
   * @returns The normalized text with all Windows-style and Mac-style end of line characters replaced with Unix-style end of line character.
   */
  public process(text: string): string {
    // Replace all Windows-style and Mac-style end of line characters with Unix-style end of line character (\n)
    return text.replace(/\r?\n|\r/g, "\n");
  }
}
