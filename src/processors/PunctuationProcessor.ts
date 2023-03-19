import { BaseProcessor } from "./BaseProcessor";

export class PunctuationProcessor extends BaseProcessor {
  /**
   * Replaces ASCII punctuations with their Persian equivalent.
   * @param {string} text The input text.
   * @returns {string} The processed text.
   */
  public process(text: string): string {
    return this.fixPunctuations(text);
  }

  /**
   * Replaces ASCII punctuations with their Persian equivalent.
   * @param {string} text The input text.
   * @returns {string} The processed text.
   */
  private fixPunctuations(text: string): string {
    return this.charReplace(text, ",;", "،؛");
  }

  private charReplace(text: string, from: string, to: string): string {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const index = from.indexOf(text[i]);
      result += index === -1 ? text[i] : to[index];
    }
    return result;
  }
}
