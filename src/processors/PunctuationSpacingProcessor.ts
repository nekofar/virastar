import { BaseProcessor } from "./BaseProcessor";

export class PunctuationSpacingProcessor extends BaseProcessor {
  /**
   * Removes unnecessary spaces around punctuations and corrects the punctuation marks in Persian text.
   * @param text The text to be processed.
   * @returns The processed text with proper punctuation marks.
   */
  public process(text: string, options?: object): string {
    return (
      text
        // removes space before punctuations
        .replace(/[ \t\u200c]*([:;,؛،.؟?!]{1})/g, "$1")

        // removes more than one space after punctuations
        // except followed by new-lines (or preservers)
        .replace(/([:;,؛،.؟?!]{1})[ \t\u200c]*(?!\n|_{2})/g, "$1 ")

        // removes space after colon that separates time parts
        .replace(/([0-9۰-۹]+):\s+([0-9۰-۹]+)/g, "$1:$2")

        // removes space after dots in numbers
        .replace(/([0-9۰-۹]+)\. ([0-9۰-۹]+)/g, "$1.$2")

        // removes space before common domain tlds
        .replace(
          /([\w\-_]+)\. (ir|com|org|net|info|edu|me)([\s/\\\])»:;.])/g,
          "$1.$2$3"
        )

        // removes space between different/same marks (double-check)
        .replace(/([؟?!])([ ]+)(?=[؟?!])/g, "$1")
    );
  }
}
