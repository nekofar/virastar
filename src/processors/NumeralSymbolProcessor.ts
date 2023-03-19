import { BaseProcessor } from "./BaseProcessor";

export class NumeralSymbolProcessor extends BaseProcessor {
  /**
   * Replaces English numerals with their Persian equivalent characters
   * @param text The text that needs to be fixed
   * @param options The options object, which is not used in this method
   * @returns The text with fixed numerals
   */
  public process(text: string, options?: object): string {
    return (
      text
        // replaces english percent signs (U+066A)
        // props @ebraminio/persiantools
        .replace(/([۰-۹]) ?%/g, '$1٪')

        // replaces dots between numbers into decimal separator (U+066B)
        // props @ebraminio/persiantools
        .replace(/([۰-۹])\.(?=[۰-۹])/g, '$1٫')

        // replaces commas between numbers into thousands separator (U+066C)
        // props @languagetool-org
        .replace(/([۰-۹]),(?=[۰-۹])/g, '$1٬')
    )
  }
}
