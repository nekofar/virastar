import { BaseProcessor } from "./BaseProcessor";

/**
 * A processor that removes all diacritic characters from the input text.
 */
export class RemoveDiacriticsProcessor extends BaseProcessor {
  /**
   * The set of diacritic characters to remove.
   */
  private readonly diacriticChars =
    "\u0652" +
    "\u064C" +
    "\u064D" +
    "\u064B" +
    "\u064F" +
    "\u0650" +
    "\u064E" +
    "\u0651";

  /**
   * Removes all diacritic characters from the input text.
   *
   * @param text The text to remove diacritics from.
   * @param options Unused options.
   * @returns The input text with all diacritic characters removed.
   */
  public process(text: string, options?: object): string {
    return text.replace(new RegExp(`[${this.diacriticChars}]+`, "g"), "");
  }
}
