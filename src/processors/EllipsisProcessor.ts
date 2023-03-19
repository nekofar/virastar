import { BaseProcessor } from './BaseProcessor'

export class EllipsisProcessor implements BaseProcessor {
  /**
   * Normalizes the usage of ellipsis by replacing more than one ellipsis with one and adding a space after it if needed.
   * @param text The text to normalize.
   * @returns The normalized text.
   */
  public process(text: string): string {
    return (
      text
        // Replaces more than one ellipsis with one.
        .replace(/(…){2,}/g, "…")
        // Adds a space after ellipsis if needed.
        .replace(/…([ \t\u200c]*)/g, "… ")
        // Removes spaces before ellipsis.
        .replace(/[ \t]+…/g, "…")
    );
  }
}
