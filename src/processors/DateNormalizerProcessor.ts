import { BaseProcessor } from "./BaseProcessor";

export class DateNormalizerProcessor extends BaseProcessor {
  /**
   * Normalizes date formats in the given text by re-ordering date parts with
   * a slash as the delimiter.
   *
   * @param text - The text to normalize.
   * @returns The normalized text.
   */
  public process(text: string): string {
    return text.replace(
      /([0-9۰-۹]{1,2})([/-])([0-9۰-۹]{1,2})\2([0-9۰-۹]{4})/g,
      function (matched, day, delimiter, month, year) {
        return `${year}/${month}/${day}`
      },
    )
  }
}
