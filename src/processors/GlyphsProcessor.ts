import { BaseProcessor } from './BaseProcessor'

/**
 * A class for replacing Persian glyphs with their corresponding standard characters
 */
export class GlyphsProcessor extends BaseProcessor {
  // props @ebraminio/persiantools
  // An object that maps Persian characters to their standardized glyphs
  private readonly glyphs: { [key: string]: string } = {
    // these two are for visually available ZWNJ #visualZwnj
    "\u0626": "\uFE89\uFE8A\uFE8B\uFE8C", // Ya
    "\u0627": "\uFE8E\u0627", // Alef
    "\u0628": "\uFE8F\uFE90\uFE91\uFE92", // Be
    "\u062A": "\uFE95\uFE96\uFE97\uFE98", // Te
    "\u062B": "\uFE99\uFE9A\uFE9B\uFE9C", // The
    "\u062C": "\uFE9D\uFE9E\uFE9F\uFEA0", // Jeem
    "\u062D": "\uFEA1\uFEA2\uFEA3\uFEA4", // Hah
    "\u062E": "\uFEA5\uFEA6\uFEA7\uFEA8", // Kheh
    "\u062F": "\uFEA9\uFEAA", // Dal
    "\u0630": "\uFEAB\uFEAC", // Zal
    "\u0631": "\uFEAD\uFEAE", // Reh
    "\u0632": "\uFEAF\uFEB0", // Ze
    "\u0633": "\uFEB1\uFEB2\uFEB3\uFEB4", // Seen
    "\u0634": "\uFEB5\uFEB6\uFEB7\uFEB8", // Sheen
    "\u0635": "\uFEB9\uFEBA\uFEBB\uFEBC", // Sad
    "\u0636": "\uFEBD\uFEBE\uFEBF\uFEC0", // Zad
    "\u0637": "\uFEC1\uFEC2\uFEC3\uFEC4", // Toh
    "\u0638": "\uFEC5\uFEC6\uFEC7\uFEC8", // Zah
    "\u0639": "\uFEC9\uFECA\uFECB\uFECC", // Ain
    "\u063A": "\uFECD\uFECE\uFECF\uFED0", // Ghain
    "\u0641": "\uFED1\uFED2\uFED3\uFED4", // Feh
    "\u0642": "\uFED5\uFED6\uFED7\uFED8", // Ghaf
    "\u0644": "\uFEDD\uFEDE\uFEDF\uFEE0", // Lam
    "\u0644\u0627": "\uFEFC", // La + Alef
    "\u0645": "\uFEE1\uFEE2\uFEE3\uFEE4", // Mim
    "\u0646": "\uFEE5\uFEE6\uFEE7\uFEE8", // Noon
    "\u0647": "\uFEE9\uFEEA\uFEEB\uFEEC", // Heh
    "\u0647\u0654": "\uFBA4\uFBA5",
    "\u0648": "\uFEED\uFEEE",
    "\u067E": "\uFB56\uFB57\uFB58\uFB59",
    "\u0686": "\uFB7A\uFB7B\uFB7C\uFB7D",
    "\u0698": "\uFB8A\uFB8B",
    "\u06A9": "\uFB8E\uFB8F\uFB90\uFB91\uFED9\uFEDA\uFEDB\uFEDC",
    "\u06AF": "\uFB92\uFB93\uFB94\uFB95",
    "\u06CC": "\uFBFC\uFBFD\uFBFE\uFBFF\uFEEF\uFEF0\uFEF1\uFEF2\uFEF3\uFEF4",
    "\u06CC\u200C": "\uFEF0\uFEF2",
    "\u200C\u0647": "\uFEEB",
    "\uFE81": "\uFE81\uFE82",
    "\uFE83": "\uFE84\uFE83",
    "\uFE85": "\uFE85\uFE86",
    "\uFE87": "\uFE87\uFE88",
    "\uFEF5": "\uFEF6",
    "\uFEF7": "\uFEF8",
    "\uFEF9": "\uFEFA"
  }

  /**
   * Replaces each occurrence of characters in a string with their corresponding
   * standardized glyphs from a given array.
   * @param text The input string to be processed.
   * @param array An object that maps characters to their standardized glyphs.
   * @returns A string with all incorrect glyphs replaced by their corresponding standard characters.
   */
  public process(text: string): string {
    return this.arrReplace(text, this.glyphs);
  }

  /**
   * Replaces characters in the given text based on the replacement map provided
   * @param text - The text to replace characters in
   * @param array
   * @returns The modified text after replacing characters
   */
  private arrReplace(text: string, array: { [key: string]: string }) {
    for (const i in array) {
      if (array.hasOwnProperty(i)) {
        text = text.replace(new RegExp(`[${array[i]}]`, 'g'), i)
      }
    }
    return text
  }
}
