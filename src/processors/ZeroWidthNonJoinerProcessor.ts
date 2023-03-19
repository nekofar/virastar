import { BaseProcessor } from './BaseProcessor'

export class ZeroWidthNonJoinerProcessor extends BaseProcessor {
  // props @ebraminio/persiantools
  /**
   * Replaces soft hyphens with ZWNJ and cleans up unnecessary ZWNJ.
   *
   * @param text The input string to clean up.
   * @returns The cleaned up string.
   */
  public process(text: string): string {
    return (
      text

        // converts all soft hyphens (&shy;) into zwnj
        .replace(/\u00ad/g, "\u200c")

        // removes more than one zwnj
        .replace(/\u200c{2,}/g, "\u200c")

        // cleans zwnj before and after numbers, english words, spaces and punctuations
        .replace(
          /\u200c([\w\s0-9۰-۹[\](){}«»“”.…,:;?!$%@#*=+\-/\\،؛٫٬×٪؟ـ])/g,
          "$1"
        )
        .replace(
          /([\w\s0-9۰-۹[\](){}«»“”.…,:;?!$%@#*=+\-/\\،؛٫٬×٪؟ـ])\u200c/g,
          "$1"
        )

        // removes unnecessary zwnj on start/end of each line
        .replace(/(^\u200c|\u200c$)/gm, "")
    );
  }

  // props @ebraminio/persiantools
}
