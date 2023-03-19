import { BaseProcessor } from "./BaseProcessor";

/**
 * A processor that replaces diacritic characters with their clean equivalent
 */
export class DiacriticsProcessor extends BaseProcessor {
  // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
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
   * Replaces diacritic characters with their clean equivalent
   * @param text - The text to fix
   * @param options - Options for the processor (not used in this implementation)
   * @returns The text with diacritic characters replaced
   */
  public process(text: string, options?: object): string {
    return (
      text
        // cleans zwnj before diacritic characters
        .replace(new RegExp(`\u200c([${this.diacriticChars}])`, "g"), "$1")

        // cleans more than one diacritic characters
        // props @languagetool-org
        .replace(
          new RegExp(`(.*)([${this.diacriticChars}]){2,}(.*)`, "g"),
          "$1$2$3"
        )

        // cleans spaces before diacritic characters
        .replace(new RegExp(`(\\S) +([${this.diacriticChars}])`, "g"), "$1$2")
    );
  }
}
