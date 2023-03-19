import { BaseProcessor } from "./BaseProcessor";

export class EnglishQuotesPairsProcessor extends BaseProcessor {
  /**
   * Replaces English quote pairs with their Persian equivalent.
   *
   * @param text The text to fix.
   * @returns The fixed text.
   */
  public process(text: string, options?: object): string {
    return text.replace(/“(.+?)”/g, "«$1»");
  }
}
