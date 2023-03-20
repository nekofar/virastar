import { VirastarOptions } from './VirastarOptions'
import {
  ArabicNumbersProcessor,
  LeadingAndTrailingSpaceProcessor,
  BracesSpacingInsideProcessor,
  BracesSpacingProcessor,
  DashProcessor,
  DateNormalizerProcessor,
  DecodeHtmlEntitiesProcessor,
  DiacriticsProcessor,
  EllipsisProcessor,
  EndOfLineProcessor,
  EnglishNumbersProcessor,
  EnglishQuotesPairsProcessor,
  EnglishQuotesProcessor,
  ExtraMarksProcessor,
  GlyphsProcessor,
  HamzehArabicAltProcessor,
  HamzehArabicProcessor,
  HamzehProcessor,
  IProcessor,
  KashidasAsParentheticProcessor,
  KashidasProcessor,
  LineBreakProcessor,
  MarkdownListProcessor,
  MarkdownNormalizerProcessor,
  MiscNonPersianCharsProcessor,
  MiscSpacingProcessor,
  NumeralSymbolProcessor,
  PrefixSpacingProcessor,
  PunctuationProcessor,
  PunctuationSpacingProcessor,
  QuestionMarkProcessor,
  RemoveDiacriticsProcessor,
  RightToLeftMarkProcessor,
  SpacingProcessor,
  SuffixSpacingHamzehProcessor,
  SuffixSpacingMiscProcessor,
  SuffixSpacingProcessor,
  ThreeDotsProcessor,
  ZeroWidthNonJoinerLateProcessor,
  ZeroWidthNonJoinerProcessor,
} from './processors'
import {
  HtmlCommentPreserver,
  CurlyBracesPreserver,
  FrontMatterPreserver,
  HtmlEntityPreserver,
  HtmlPreserver,
  IPreserver,
  NonBreakingSpacePreserver,
  SquareBracketsPreserver,
  UriPreserver,
} from './preservers'

export class Virastar {
  private readonly options: VirastarOptions = {}

  private readonly defaultOptions: VirastarOptions = {
    cleanupExtraMarks: true,
    cleanupKashidas: true,
    cleanupLineBreaks: true,
    cleanupRightToLeftMarks: true,
    cleanupSpacing: true,
    cleanupZeroWidthNonJoiners: true,
    decodeHtmlEntities: true,
    fix_suffix_spacing: true,
    normalizeEllipsis: true,
    normalizeEndOfLines: true,
    normalizeJalaliDates: true,
    normalizeKashidas: true,
    normalizeMarkDownBraces: true,
    normalizeMarkDownLists: true,
    normalizeThreeDots: true,
    preserveCurlyBraces: false,
    preserveFrontMatter: true,
    preserveHtmlComments: true,
    preserveHtmlEntities: true,
    preserveHtmlTags: true,
    preserveNonBreakingSpaces: true,
    preserveSquareBrackets: false,
    preserveUris: true,
    removeDiacritics: false,
    removeLeadingAndTrailingSpaces: true,
    removeSpacingForPunctuations: true,
    replaceArabicNumbers: true,
    replaceDashes: true,
    replaceDiacritics: true,
    replaceEnglishNumbers: true,
    replaceEnglishQuotes: true,
    replaceEnglishQuotesPairs: true,
    replaceHamzeh: true,
    replaceHamzehArabic: false,
    replaceMiscNonPersianChars: true,
    replaceMiscSpacing: true,
    replaceNumeralSymbols: true,
    replacePersianGlyphs: true,
    replacePrefixSpacing: true,
    replacePunctuations: true,
    replaceQuestionMarks: true,
    replaceSpacingForBracesAndQuotes: true,
    replaceSuffixMisc: true,
    skip_markdown_ordered_lists_numbers_conversion: false,
  }

  private preservers: Record<string, IPreserver>

  private processors: Record<string, IProcessor>

  /**
   * Initializes a new instance of Virastar with the given options.
   * @param {VirastarOptions} [options] - The options to configure the Virastar instance.
   */
  constructor(options: VirastarOptions = {}) {
    this.options = this.parseOptions(options)

    this.preservers = {
      preserveCurlyBraces: new CurlyBracesPreserver(),
      preserveFrontMatter: new FrontMatterPreserver(),
      preserveHtmlComments: new HtmlCommentPreserver(),
      preserveHtmlEntities: new HtmlEntityPreserver(),
      preserveHtmlTags: new HtmlPreserver(),
      preserveNonBreakingSpaces: new NonBreakingSpacePreserver(),
      preserveSquareBrackets: new SquareBracketsPreserver(),
      preserveUris: new UriPreserver(),
    }

    this.processors = {
      removeLeadingAndTrailingSpaces: new LeadingAndTrailingSpaceProcessor(),
      cleanupExtraMarks: new ExtraMarksProcessor(),
      cleanupKashidas: new KashidasProcessor(),
      cleanupLineBreaks: new LineBreakProcessor(),
      cleanupRightToLeftMarks: new RightToLeftMarkProcessor(),
      cleanupSpacing: new SpacingProcessor(),
      cleanupZeroWidthNonJoiners: new ZeroWidthNonJoinerProcessor(),
      decodeHtmlEntities: new DecodeHtmlEntitiesProcessor(),
      normalizeEllipsis: new EllipsisProcessor(),
      normalizeEndOfLines: new EndOfLineProcessor(),
      normalizeJalaliDates: new DateNormalizerProcessor(),
      normalizeKashidas: new KashidasAsParentheticProcessor(),
      normalizeMarkDownBraces: new MarkdownNormalizerProcessor(),
      normalizeMarkDownLists: new MarkdownListProcessor(),
      normalizeThreeDots: new ThreeDotsProcessor(),
      removeDiacritics: new RemoveDiacriticsProcessor(),
      removeSpacingForPunctuations: new PunctuationSpacingProcessor(),
      replaceArabicNumbers: new ArabicNumbersProcessor(),
      replaceDashes: new DashProcessor(),
      replaceDiacritics: new DiacriticsProcessor(),
      replaceEnglishNumbers: new EnglishNumbersProcessor(),
      replaceEnglishQuotes: new EnglishQuotesProcessor(),
      replaceEnglishQuotesPairs: new EnglishQuotesPairsProcessor(),
      replaceHamzeh: new HamzehProcessor(),
      replaceHamzehArabic: new HamzehArabicProcessor(),
      replaceMiscNonPersianChars: new MiscNonPersianCharsProcessor(),
      replaceMiscSpacing: new MiscSpacingProcessor(),
      replaceNumeralSymbols: new NumeralSymbolProcessor(),
      replacePersianGlyphs: new GlyphsProcessor(),
      replacePrefixSpacing: new PrefixSpacingProcessor(),
      replacePunctuations: new PunctuationProcessor(),
      replaceQuestionMarks: new QuestionMarkProcessor(),
      replaceSpacingForBracesAndQuotes: new BracesSpacingProcessor(),
      replaceSuffixMisc: new SuffixSpacingMiscProcessor(),
    }
  }

  /**
   * Cleans up a given text by applying various text cleaning techniques based on options.
   *
   * @param text The text to be cleaned up.
   * @param options Optional options object to override default options.
   * @returns The cleaned up text.
   * @throws TypeError if the input text is not a string.
   */
  public cleanup(text: string, options?: VirastarOptions) {
    // Don't bother if it's empty or whitespace
    if (!text.trim()) {
      return text
    }

    // Parse the options object or use default options.
    const opts = options ? this.parseOptions(options) : this.options

    // Single space paddings around the string
    text = ` ${text} `

    // Preserves front-matter data in the text
    if (opts.preserveFrontMatter) {
      text = this.preservers.preserveFrontMatter.prepare(text)
    }

    // Preserves all HTML tags in the text
    if (opts.preserveHtmlTags) {
      text = this.preservers.preserveHtmlTags.prepare(text)
    }

    // Preserves all HTML comments in the text
    if (opts.preserveHtmlComments) {
      text = this.preservers.preserveHtmlComments.prepare(text)
    }

    // Preserves strings inside square brackets (`[]`)
    if (opts.preserveSquareBrackets) {
      text = this.preservers.preserveSquareBrackets.prepare(text)
    }

    // Preserves strings inside curly braces (`{}`)
    if (opts.preserveCurlyBraces) {
      text = this.preservers.preserveCurlyBraces.prepare(text)
    }

    // Preserves all URI strings in the text
    if (opts.preserveUris) {
      text = this.preservers.preserveUris.prepare(text)
    }

    // Preserves all no-break space entities in the text
    if (opts.preserveNonBreakingSpaces) {
      text = this.preservers.preserveNonBreakingSpaces.prepare(text)
    }

    // Decode HTML entities if specified
    if (opts.decodeHtmlEntities) {
      text = new DecodeHtmlEntitiesProcessor().process(text)
    }

    // preserves all html entities in the text
    // @props: @substack/node-ent
    if (opts.preserveHtmlEntities) {
      text = this.preservers.preserveHtmlEntities.prepare(text)
    }

    if (opts.normalizeEndOfLines) {
      text = this.processors.normalizeEndOfLines.process(text)
    }

    if (opts.replacePersianGlyphs) {
      text = this.processors.replacePersianGlyphs.process(text)
    }

    if (opts.replaceDashes) {
      text = this.processors.replaceDashes.process(text)
    }

    if (opts.normalizeThreeDots) {
      text = this.processors.normalizeThreeDots.process(text)
    }

    if (opts.normalizeEllipsis) {
      text = this.processors.normalizeEllipsis.process(text)
    }

    if (opts.replaceEnglishQuotesPairs) {
      text = this.processors.replaceEnglishQuotesPairs.process(text)
    }

    if (opts.replaceEnglishQuotes) {
      text = this.processors.replaceEnglishQuotes.process(text)
    }

    if (opts.replaceHamzeh) {
      if (opts.replaceHamzehArabic) {
        text = new HamzehArabicProcessor().process(text)
      }

      text = new HamzehProcessor().process(text)
    } else if (opts.fix_suffix_spacing) {
      if (opts.replaceHamzehArabic) {
        text = new HamzehArabicAltProcessor().process(text)
      }

      text = new SuffixSpacingHamzehProcessor().process(text)
    }

    if (opts.cleanupRightToLeftMarks) {
      text = this.processors.cleanupRightToLeftMarks.process(text)
    }

    if (opts.cleanupZeroWidthNonJoiners) {
      text = this.processors.cleanupZeroWidthNonJoiners.process(text)
    }

    if (opts.replaceArabicNumbers) {
      text = this.processors.replaceArabicNumbers.process(text)
    }

    // word tokenizer
    text = this.wordTokenizer(text, opts)

    if (opts.normalizeJalaliDates) {
      text = this.processors.normalizeJalaliDates.process(text)
    }

    if (opts.replacePrefixSpacing) {
      text = this.processors.replacePrefixSpacing.process(text)
    }

    if (opts.fix_suffix_spacing) {
      text = new SuffixSpacingProcessor().process(text)
    }

    if (opts.replaceSuffixMisc) {
      text = new SuffixSpacingMiscProcessor().process(text)
    }

    if (opts.replaceSpacingForBracesAndQuotes) {
      text = new BracesSpacingProcessor().process(text)
    }

    if (opts.cleanupExtraMarks) {
      text = this.processors.cleanupExtraMarks.process(text)
    }

    if (opts.removeSpacingForPunctuations) {
      text = this.processors.removeSpacingForPunctuations.process(text)
    }

    if (opts.normalizeKashidas) {
      text = this.processors.normalizeKashidas.process(text)
    }

    if (opts.cleanupKashidas) {
      text = this.processors.cleanupKashidas.process(text)
    }

    if (opts.normalizeMarkDownBraces) {
      text = this.processors.normalizeMarkDownBraces.process(text)
    }

    if (opts.normalizeMarkDownLists) {
      text = this.processors.normalizeMarkDownLists.process(text)
    }

    // doing it again after `fixPunctuationSpacing()`
    if (opts.replaceSpacingForBracesAndQuotes) {
      text = new BracesSpacingInsideProcessor().process(text)
    }

    if (opts.replaceMiscSpacing) {
      text = this.processors.replaceMiscSpacing.process(text)
    }

    if (opts.removeDiacritics) {
      text = this.processors.removeDiacritics.process(text)
    } else if (opts.replaceDiacritics) {
      text = this.processors.replaceDiacritics.process(text)
    }

    if (opts.cleanupSpacing) {
      text = this.processors.cleanupSpacing.process(text)
    }

    if (opts.cleanupZeroWidthNonJoiners) {
      text = new ZeroWidthNonJoinerLateProcessor().process(text)
    }

    if (opts.cleanupLineBreaks) {
      text = this.processors.cleanupLineBreaks.process(text)
    }

    // bringing back entities
    if (opts.preserveHtmlEntities) {
      text = this.preservers.preserveHtmlEntities.restore(text)
    }

    // bringing back nbsps
    if (opts.preserveNonBreakingSpaces) {
      text = this.preservers.preserveNonBreakingSpaces.restore(text)
    }

    // bringing back URIs
    if (opts.preserveUris) {
      text = this.preservers.preserveUris.restore(text)
    }

    // bringing back braces
    if (opts.preserveCurlyBraces) {
      text = this.preservers.preserveCurlyBraces.restore(text)
    }

    // bringing back brackets
    if (opts.preserveSquareBrackets) {
      text = this.preservers.preserveSquareBrackets.restore(text)
    }

    // bringing back HTML comments
    if (opts.preserveHtmlComments) {
      text = this.preservers.preserveHtmlComments.restore(text)
    }

    // bringing back HTML tags
    if (opts.preserveHtmlTags) {
      text = this.preservers.preserveHtmlTags.restore(text)
    }

    // bringing back frontmatter
    if (opts.preserveFrontMatter) {
      text = this.preservers.preserveFrontMatter.restore(text)
    }

    if (opts.removeLeadingAndTrailingSpaces) {
      text = this.processors.removeLeadingAndTrailingSpaces.process(text)
    } else {
      // removes single space paddings around the string
      text = text.replace(/^ /g, '').replace(/ $/g, '')
    }

    return text
  }
  private wordTokenizer(text: string, opts: Record<string, any>) {
    return text.replace(
      /(^|\s+)([[({"'“«]?)(\S+)([\])}"'”»]?)(?=($|\s+))/g,
      (matched, before, leadings, word, trailings, after) => {
        // should not replace to persian chars in english phrases
        if (word.match(/[a-zA-Z\-_]{2,}/g)) {
          return matched
        }

        // should not touch sprintf directives
        // @source: https://stackoverflow.com/a/8915445/
        if (
          word.match(
            /%(?:\d+\$)?[+-]?(?:[ 0]|'.)?-?\d*(?:\.\d+)?[bcdeEufFgGosxX]/g,
          )
        ) {
          return matched
        }

        // should not touch numbers in html entities
        if (word.match(/&#\d+;/g)) {
          return matched
        }

        // skips converting english numbers of ordered lists in markdown
        if (
          opts.skip_markdown_ordered_lists_numbers_conversion &&
          (matched + trailings + after).match(/(?:\r?\n|\r\n?|(?:^|\n))\d+\.\s/)
        ) {
          return matched
        }

        if (opts.replaceEnglishNumbers) {
          matched = this.processors.replaceEnglishNumbers.process(matched)
        }

        if (opts.replaceNumeralSymbols) {
          matched = this.processors.replaceNumeralSymbols.process(matched)
        }

        if (opts.replacePunctuations) {
          matched = this.processors.replacePunctuations.process(matched)
        }

        if (opts.replaceMiscNonPersianChars) {
          matched = this.processors.replaceMiscNonPersianChars.process(matched)
        }

        if (opts.replaceQuestionMarks) {
          matched = this.processors.replaceQuestionMarks.process(matched)
        }

        return matched
      },
    )
  }

  /**
   * Parses the given options and returns an object with default options overridden by the given options.
   * @param options - The options to parse.
   * @returns An object with default options overridden by the given options.
   */
  private parseOptions(options: Record<string, any> = {}): Record<string, any> {
    // Initialize an object with default options.
    const parsed: Record<string, any> = { ...this.defaultOptions }

    // Override default options with given options.
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        parsed[key] = options[key]
      }
    }

    // Return the parsed options object.
    return parsed
  }
}
