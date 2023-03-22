import { BaseProcessor } from './BaseProcessor'

export class SuffixSpacingProcessor extends BaseProcessor {
  private readonly chars =
    '\u0621' +
    '\u0627' +
    '\u0622' +
    '\u0623' +
    '\u0625' +
    '\u0626' +
    '\u0624' +
    '\u0628' +
    '\u067E' +
    '\u062A' +
    '\u062B' +
    '\u062C' +
    '\u0686' +
    '\u062D' +
    '\u062E' +
    '\u062F' +
    '\u0630' +
    '\u0631' +
    '\u0632' +
    '\u0698' +
    '\u0633' +
    '\u0634' +
    '\u0635' +
    '\u0636' +
    '\u0637' +
    '\u0638' +
    '\u0639' +
    '\u063A' +
    '\u0641' +
    '\u0642' +
    '\u06A9' +
    '\u06AF' +
    '\u0644' +
    '\u0645' +
    '\u0646' +
    '\u0648' +
    '\u0647' +
    '\u06CC' +
    '\u0629' +
    '\u064A' +
    '\u0643'

  // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
  private readonly diacriticChars =
    '\u0652' +
    '\u064C' +
    '\u064D' +
    '\u064B' +
    '\u064F' +
    '\u0650' +
    '\u064E' +
    '\u0651'

  private readonly patternAfter = `\\s.,;\u060C\u061B!\u061F?"'()[\\]{}\u201C\u201D\u00AB\u00BB`

  // puts zwnj between the word and the suffix
  // NOTE: possible bug: suffixes could be nouns
  public process(text: string): string {
    const replacement = '$1\u200c$2'
    return text
      .replace(
        new RegExp(
          `([${this.chars}${this.diacriticChars}]) (ها(ی)?[${this.patternAfter}])`,
          'g',
        ),
        replacement,
      )
      .replace(
        new RegExp(
          `([${this.chars}${this.diacriticChars}]) ((ام|ات|اش|ای|اید|ایم|اند|مان|تان|شان)[${this.patternAfter}])`,
          'g',
        ),
        replacement,
      )
      .replace(
        new RegExp(
          `([${this.chars}${this.diacriticChars}]) (تر((ی)|(ین))?[${this.patternAfter}])`,
          'g',
        ),
        replacement,
      )
      .replace(
        new RegExp(
          `([${this.chars}${this.diacriticChars}]) ((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)[${this.patternAfter}])`,
          'g',
        ),
        replacement,
      )
  }
}
