import { BaseProcessor } from "./BaseProcessor";

export class PrefixSpacingProcessor extends BaseProcessor {
  /**
   * Puts zwnj between the word and the prefix: mi*, nemi*, bi*.
   * Note: there's a possible bug here: prefixes could be separate nouns.
   * @param text - The input text to process.
   * @returns The processed text with zwnj between the word and the prefix.
   */
  public process(text: string): string {
    return this.fixPrefixSpacing(text);
  }

  /**
   * Puts zwnj between the word and the prefix: mi*, nemi*, bi*.
   * Note: there's a possible bug here: prefixes could be separate nouns.
   * @param text - The input text to process.
   * @returns The processed text with zwnj between the word and the prefix.
   */
  private fixPrefixSpacing(text: string): string {
    const replacement = "$1\u200c$3";
    return text
      .replace(/((\s|^)ن?می) ([^ ])/g, replacement)
      .replace(/((\s|^)بی) ([^ ])/g, replacement);
  }
}
