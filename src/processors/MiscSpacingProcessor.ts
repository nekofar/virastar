import { BaseProcessor } from "./BaseProcessor";

/**
 * Processor to fix miscellaneous spaces in Persian text.
 */
export class MiscSpacingProcessor extends BaseProcessor {

  /**
   * Removes miscellaneous spaces in Persian text.
   * @param text - The Persian text to fix.
   * @param options - The options for the processor.
   * @returns The cleaned text.
   */
  public process(text: string, options?: object): string {
    // removes space before parentheses on misc cases
    text = text.replace(/ \((ص|عج|س|ع|ره)\)/g, "($1)");

    // removes space before braces containing numbers
    text = text.replace(/ \[([0-9۰-۹]+)]/g, "[$1]");

    return text;
  }
}
