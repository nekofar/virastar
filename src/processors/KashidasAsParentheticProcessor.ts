import { BaseProcessor } from "./BaseProcessor";

export class KashidasAsParentheticProcessor extends BaseProcessor {
  /**
   * Replaces kashidas with ndash in parenthetic
   *
   * @param {string} text - The input text to replace kashidas in
   * @returns {string} The modified text with kashidas replaced with ndash
   */
  public process(text: string, options?: object): string {
    // Replace kashidas preceded by whitespace with ndash
    text = text.replace(/(\s)\u0640+/g, "$1–");
    // Replace kashidas followed by whitespace with ndash
    text = text.replace(/\u0640+(\s)/g, "–$1");
    return text;
  }
}
