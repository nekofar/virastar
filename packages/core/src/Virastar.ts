import type { VirastarOptions } from './VirastarOptions'
import {
  HamzehArabicAltProcessor,
  SuffixSpacingHamzehProcessor,
  ZeroWidthNonJoinerLateProcessor,
} from './processors'
import { ProcessorFactory } from './processors/ProcessorFactory'
import { PreserverFactory } from './preservers/PreserverFactory'

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
    replaceSuffixSpacing: true,
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
    preserveMarkDownCodeBlocks: true,
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

  private preserverFactory: PreserverFactory

  private processorFactory: ProcessorFactory

  /**
   * Initializes a new instance of Virastar with the given options.
   * @param {VirastarOptions} [options] - The options to configure the Virastar instance.
   */
  constructor(options: VirastarOptions = {}) {
    this.options = this.parseOptions(options)

    this.preserverFactory = new PreserverFactory()
    this.processorFactory = new ProcessorFactory()
  }

  /**
   * Process a given text by applying various techniques based on options.
   *
   * @param text The text to be cleaned up.
   * @param options Optional options object to override default options.
   * @returns The cleaned up text.
   * @throws TypeError if the input text is not a string.
   */
  public process(text: string, options?: VirastarOptions) {
    // Don't bother if it's empty or whitespace
    if (!text.trim()) {
      return text
    }

    // Parse the options object or use default options.
    const opts = options ? this.parseOptions(options) : this.options

    // Single space paddings around the string
    text = ` ${text} `

    // Preserves front-matter data in the text
    if (opts['preserveFrontMatter']) {
      text = this.preserverFactory
        .createPreserver('preserveFrontMatter')
        .prepare(text)
    }

    // Preserves all HTML tags in the text
    if (opts['preserveHtmlTags']) {
      text = this.preserverFactory
        .createPreserver('preserveHtmlTags')
        .prepare(text)
    }

    // Preserves all HTML comments in the text
    if (opts['preserveHtmlComments']) {
      text = this.preserverFactory
        .createPreserver('preserveHtmlComments')
        .prepare(text)
    }

    // Preserves strings inside square brackets (`[]`)
    if (opts['preserveSquareBrackets']) {
      text = this.preserverFactory
        .createPreserver('preserveSquareBrackets')
        .prepare(text)
    }

    // Preserves strings inside curly braces (`{}`)
    if (opts['preserveCurlyBraces']) {
      text = this.preserverFactory
        .createPreserver('preserveCurlyBraces')
        .prepare(text)
    }

    // Preserves all URI strings in the text
    if (opts['preserveUris']) {
      text = this.preserverFactory.createPreserver('preserveUris').prepare(text)
    }

    // Preserves all Markdown code blocks in the text
    if (opts['preserveMarkDownCodeBlocks']) {
      text = this.preserverFactory
        .createPreserver('preserveMarkDownCodeBlocks')
        .prepare(text)
    }

    // Preserves all no-break space entities in the text
    if (opts['preserveNonBreakingSpaces']) {
      text = this.preserverFactory
        .createPreserver('preserveNonBreakingSpaces')
        .prepare(text)
    }

    // Decode HTML entities if specified
    if (opts['decodeHtmlEntities']) {
      text = this.processorFactory
        .createProcessor('decodeHtmlEntities')
        .process(text)
    }

    // preserves all html entities in the text
    // @props: @substack/node-ent
    if (opts['preserveHtmlEntities']) {
      text = this.preserverFactory
        .createPreserver('preserveHtmlEntities')
        .prepare(text)
    }

    if (opts['normalizeEndOfLines']) {
      text = this.processorFactory
        .createProcessor('normalizeEndOfLines')
        .process(text)
    }

    if (opts['replacePersianGlyphs']) {
      text = this.processorFactory
        .createProcessor('replacePersianGlyphs')
        .process(text)
    }

    if (opts['replaceDashes']) {
      text = this.processorFactory
        .createProcessor('replaceDashes')
        .process(text)
    }

    if (opts['normalizeThreeDots']) {
      text = this.processorFactory
        .createProcessor('normalizeThreeDots')
        .process(text)
    }

    if (opts['normalizeEllipsis']) {
      text = this.processorFactory
        .createProcessor('normalizeEllipsis')
        .process(text)
    }

    if (opts['replaceEnglishQuotesPairs']) {
      text = this.processorFactory
        .createProcessor('replaceEnglishQuotesPairs')
        .process(text)
    }

    if (opts['replaceEnglishQuotes']) {
      text = this.processorFactory
        .createProcessor('replaceEnglishQuotes')
        .process(text)
    }

    if (opts['replaceHamzeh']) {
      if (opts['replaceHamzehArabic']) {
        text = this.processorFactory
          .createProcessor('replaceHamzehArabic')
          .process(text)
      }

      text = this.processorFactory
        .createProcessor('replaceHamzeh')
        .process(text)
    } else if (opts['replaceSuffixSpacing']) {
      if (opts['replaceHamzehArabic']) {
        text = new HamzehArabicAltProcessor().process(text)
      }

      text = new SuffixSpacingHamzehProcessor().process(text)
    }

    if (opts['cleanupRightToLeftMarks']) {
      text = this.processorFactory
        .createProcessor('cleanupRightToLeftMarks')
        .process(text)
    }

    if (opts['cleanupZeroWidthNonJoiners']) {
      text = this.processorFactory
        .createProcessor('cleanupZeroWidthNonJoiners')
        .process(text)
    }

    if (opts['replaceArabicNumbers']) {
      text = this.processorFactory
        .createProcessor('replaceArabicNumbers')
        .process(text)
    }

    // word tokenizer
    text = this.wordTokenizer(text, opts)

    if (opts['normalizeJalaliDates']) {
      text = this.processorFactory
        .createProcessor('normalizeJalaliDates')
        .process(text)
    }

    if (opts['replacePrefixSpacing']) {
      text = this.processorFactory
        .createProcessor('replacePrefixSpacing')
        .process(text)
    }

    if (opts['replaceSuffixSpacing']) {
      text = this.processorFactory
        .createProcessor('replaceSuffixSpacing')
        .process(text)    }

    if (opts['replaceSuffixMisc']) {
      text = this.processorFactory
        .createProcessor('replaceSuffixMisc')
        .process(text)
    }

    if (opts['replaceSpacingForBracesAndQuotes']) {
      text = this.processorFactory
        .createProcessor('replacesExtraSpacesAroundBraces')
        .process(text)
    }

    if (opts['cleanupExtraMarks']) {
      text = this.processorFactory
        .createProcessor('cleanupExtraMarks')
        .process(text)
    }

    if (opts['removeSpacingForPunctuations']) {
      text = this.processorFactory
        .createProcessor('removeSpacingForPunctuations')
        .process(text)
    }

    if (opts['normalizeKashidas']) {
      text = this.processorFactory
        .createProcessor('normalizeKashidas')
        .process(text)
    }

    if (opts['cleanupKashidas']) {
      text = this.processorFactory
        .createProcessor('cleanupKashidas')
        .process(text)
    }

    if (opts['normalizeMarkDownBraces']) {
      text = this.processorFactory
        .createProcessor('normalizeMarkDownBraces')
        .process(text)
    }

    if (opts['normalizeMarkDownLists']) {
      text = this.processorFactory
        .createProcessor('normalizeMarkDownLists')
        .process(text)
    }

    // doing it again after `fixPunctuationSpacing()`
    if (opts['replaceSpacingForBracesAndQuotes']) {
      text = this.processorFactory
        .createProcessor('replacesSpacesInsideBraces')
        .process(text)
    }

    if (opts['replaceMiscSpacing']) {
      text = this.processorFactory
        .createProcessor('replaceMiscSpacing')
        .process(text)
    }

    if (opts['removeDiacritics']) {
      text = this.processorFactory
        .createProcessor('removeDiacritics')
        .process(text)
    } else if (opts['replaceDiacritics']) {
      text = this.processorFactory
        .createProcessor('replaceDiacritics')
        .process(text)
    }

    if (opts['cleanupSpacing']) {
      text = this.processorFactory
        .createProcessor('cleanupSpacing')
        .process(text)
    }

    if (opts['cleanupZeroWidthNonJoiners']) {
      text = new ZeroWidthNonJoinerLateProcessor().process(text)
    }

    if (opts['cleanupLineBreaks']) {
      text = this.processorFactory
        .createProcessor('cleanupLineBreaks')
        .process(text)
    }

    // bringing back entities
    if (opts['preserveHtmlEntities']) {
      text = this.preserverFactory
        .createPreserver('preserveHtmlEntities')
        .restore(text)
    }

    // bringing back nbsps
    if (opts['preserveNonBreakingSpaces']) {
      text = this.preserverFactory
        .createPreserver('preserveNonBreakingSpaces')
        .restore(text)
    }

    // bringing back Markdown code blocks
    if (opts['preserveMarkDownCodeBlocks']) {
      text = this.preserverFactory
        .createPreserver('preserveMarkDownCodeBlocks')
        .restore(text)
    }

    // bringing back URIs
    if (opts['preserveUris']) {
      text = this.preserverFactory.createPreserver('preserveUris').restore(text)
    }

    // bringing back braces
    if (opts['preserveCurlyBraces']) {
      text = this.preserverFactory
        .createPreserver('preserveCurlyBraces')
        .restore(text)
    }

    // bringing back brackets
    if (opts['preserveSquareBrackets']) {
      text = this.preserverFactory
        .createPreserver('preserveSquareBrackets')
        .restore(text)
    }

    // bringing back HTML comments
    if (opts['preserveHtmlComments']) {
      text = this.preserverFactory
        .createPreserver('preserveHtmlComments')
        .restore(text)
    }

    // bringing back HTML tags
    if (opts['preserveHtmlTags']) {
      text = this.preserverFactory
        .createPreserver('preserveHtmlTags')
        .restore(text)
    }

    // bringing back frontmatter
    if (opts['preserveFrontMatter']) {
      text = this.preserverFactory
        .createPreserver('preserveFrontMatter')
        .restore(text)
    }

    if (opts['removeLeadingAndTrailingSpaces']) {
      text = this.processorFactory
        .createProcessor('removeLeadingAndTrailingSpaces')
        .process(text)
    } else {
      // removes single space paddings around the string
      text = text.replace(/^ /g, '').replace(/ $/g, '')
    }

    return text
  }
  private wordTokenizer(text: string, opts: Record<string, any>) {
    return text.replace(
      /(^|\s+)([[({"'“«]?)(\S+)([\])}"'”»]?)(?=($|\s+))/g,
      (matched, _before, _leadings, word, trailings, after) => {
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
          opts['skip_markdown_ordered_lists_numbers_conversion'] &&
          (matched + trailings + after).match(/(?:\r?\n|\r\n?|(?:^|\n))\d+\.\s/)
        ) {
          return matched
        }

        if (opts['replaceEnglishNumbers']) {
          matched = this.processorFactory
            .createProcessor('replaceEnglishNumbers')
            .process(matched)
        }

        if (opts['replaceNumeralSymbols']) {
          matched = this.processorFactory
            .createProcessor('replaceNumeralSymbols')
            .process(matched)
        }

        if (opts['replacePunctuations']) {
          matched = this.processorFactory
            .createProcessor('replacePunctuations')
            .process(matched)
        }

        if (opts['replaceMiscNonPersianChars']) {
          matched = this.processorFactory
            .createProcessor('replaceMiscNonPersianChars')
            .process(matched)
        }

        if (opts['replaceQuestionMarks']) {
          matched = this.processorFactory
            .createProcessor('replaceQuestionMarks')
            .process(matched)
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
