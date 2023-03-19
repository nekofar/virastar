import { BaseProcessor } from './BaseProcessor'

export class ThreeDotsProcessor extends BaseProcessor {
  /**
   * Fixes the punctuation spacing for three dots in Persian text.
   * Remove spaces between dots and replaces three dots with ellipsis character.
   *
   * @param text The input text to fix punctuation spacing.
   * @returns The text with fixed punctuation spacing for three dots.
   */
  public process(text: string): string {
    // Removes spaces between dots
    text = text.replace(/\.( +)(?=[.])/g, ".");

    // Replaces three dots with ellipsis character
    return text.replace(/[ \t]*\.{3,}/g, "…");
  }
}
