import { VirastarOptions } from "./VirastarOptions";
import {
  ArabicNumbersProcessor,
  BeginAndEndProcessor,
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
  ZwnjLateProcessor,
  ZwnjProcessor
} from "./processors"

export class Virastar {
  private readonly options: VirastarOptions = {};

  // @source: https://github.com/jhermsmeier/uri.regex
  private readonly patternURI: string =
    `([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|` +
    `%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|` +
    `::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|` +
    `(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|` +
    `(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|` +
    `(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|` +
    `(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|` +
    `(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|` +
    `(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|` +
    `(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|` +
    `[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|` +
    `(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|` +
    `2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|` +
    `%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|` +
    `%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|` +
    `%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|` +
    `%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|` +
    `%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|` +
    `%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|` +
    `%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?`

  private readonly defaultOptions: VirastarOptions = {
    cleanup_begin_and_end: true,
    cleanup_extra_marks: true,
    cleanup_kashidas: true,
    cleanup_line_breaks: true,
    cleanup_rlm: true,
    cleanup_spacing: true,
    cleanup_zwnj: true,
    decode_htmlentities: true,
    fix_arabic_numbers: true,
    fix_dashes: true,
    fix_diacritics: true,
    fix_english_numbers: true,
    fix_english_quotes_pairs: true,
    fix_english_quotes: true,
    fix_hamzeh: true,
    fix_hamzeh_arabic: false,
    fix_misc_non_persian_chars: true,
    fix_misc_spacing: true,
    fix_numeral_symbols: true,
    fix_prefix_spacing: true,
    fix_persian_glyphs: true,
    fix_punctuations: true,
    fix_question_mark: true,
    fix_spacing_for_braces_and_quotes: true,
    fix_spacing_for_punctuations: true,
    fix_suffix_misc: true,
    fix_suffix_spacing: true,
    fix_three_dots: true,
    kashidas_as_parenthetic: true,
    markdown_normalize_braces: true,
    markdown_normalize_lists: true,
    normalize_dates: true,
    normalize_ellipsis: true,
    normalize_eol: true,
    preserve_braces: false,
    preserve_brackets: false,
    preserve_comments: true,
    preserve_entities: true,
    preserve_frontmatter: true,
    preserve_HTML: true,
    preserve_nbsps: true,
    preserve_URIs: true,
    remove_diacritics: false,
    skip_markdown_ordered_lists_numbers_conversion: false
  }

  private processors: Record<string, IProcessor> = {
    cleanup_begin_and_end: new BeginAndEndProcessor(),
    cleanup_extra_marks: new ExtraMarksProcessor(),
    cleanup_kashidas: new KashidasProcessor(),
    cleanup_line_breaks: new LineBreakProcessor(),
    cleanup_rlm: new RightToLeftMarkProcessor(),
    cleanup_spacing: new SpacingProcessor(),
    cleanup_zwnj: new ZwnjProcessor(),
    decode_htmlentities: new DecodeHtmlEntitiesProcessor(),
    fix_arabic_numbers: new ArabicNumbersProcessor(),
    fix_dashes: new DashProcessor(),
    fix_diacritics: new DiacriticsProcessor(),
    fix_english_numbers: new EnglishNumbersProcessor(),
    fix_english_quotes_pairs: new EnglishQuotesPairsProcessor(),
    fix_english_quotes: new EnglishQuotesProcessor(),
    fix_hamzeh: new HamzehProcessor(),
    fix_hamzeh_arabic: new HamzehArabicProcessor(),
    fix_misc_non_persian_chars: new MiscNonPersianCharsProcessor(),
    fix_misc_spacing: new MiscSpacingProcessor(),
    fix_numeral_symbols: new NumeralSymbolProcessor(),
    fix_prefix_spacing: new PrefixSpacingProcessor(),
    fix_persian_glyphs: new GlyphsProcessor(),
    fix_punctuations: new PunctuationProcessor(),
    fix_question_mark: new QuestionMarkProcessor(),
    fix_spacing_for_braces_and_quotes: new BracesSpacingProcessor(),
    fix_spacing_for_punctuations: new PunctuationSpacingProcessor(),
    fix_suffix_misc: new SuffixSpacingMiscProcessor(),
    // fix_suffix_spacing: new SuffixSpacingHamzehProcessor,
    fix_three_dots: new ThreeDotsProcessor(),
    kashidas_as_parenthetic: new KashidasAsParentheticProcessor(),
    markdown_normalize_braces: new MarkdownNormalizerProcessor(),
    markdown_normalize_lists: new MarkdownListProcessor(),
    normalize_dates: new DateNormalizerProcessor(),
    normalize_ellipsis: new EllipsisProcessor(),
    normalize_eol: new EndOfLineProcessor(),
    // preserve_braces: false,
    // preserve_brackets: false,
    // preserve_comments: new ,
    // preserve_entities: new ,
    // preserve_frontmatter: new ,
    // preserve_HTML: new ,
    // preserve_nbsps: new ,
    // preserve_URIs: new ,
    remove_diacritics: new RemoveDiacriticsProcessor()
    // skip_markdown_ordered_lists_numbers_conversion: false,
  }

  /**
   * Initializes a new instance of Virastar with the given options.
   * @param {VirastarOptions} [options] - The options to configure the Virastar instance.
   */
  constructor(options: VirastarOptions = {}) {
    this.options = this.parseOptions(options);
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

    const opts = options ? this.parseOptions(options) : this.options

    // Single space paddings around the string
    text = ` ${text} `

    // Preserves frontmatter data in the text
    const frontmatter: string[] = []
    if (opts.preserve_frontmatter) {
      text = text.replace(/^ ---[\S\s]*?---\n/g, (matched) => {
        frontmatter.push(matched)
        return ' __FRONTMATTER__PRESERVER__ '
      })
    }

    // Preserves all HTML tags in the text
    const html: string[] = []
    if (opts.preserve_HTML) {
      text = text.replace(/<\/?[a-z][^>]*?>/gi, (matched) => {
        html.push(matched)
        return ' __HTML__PRESERVER__ '
      })
    }

    // Preserves all HTML comments in the text
    const comments: string[] = []
    if (opts.preserve_comments) {
      text = text.replace(/<!--[\s\S]*?-->/g, (matched) => {
        comments.push(matched)
        return ' __COMMENT__PRESERVER__ '
      })
    }

    // Preserves strings inside square brackets (`[]`)
    const brackets: string[] = []
    if (opts.preserve_brackets) {
      text = text.replace(/(\[.*?])/g, (matched) => {
        brackets.push(matched)
        return ' __BRACKETS__PRESERVER__ '
      })
    }

    // Preserves strings inside curly braces (`{}`)
    const braces: string[] = []
    if (opts.preserve_braces) {
      text = text.replace(/(\{.*?})/g, function (matched) {
        braces.push(matched)
        return ' __BRACES__PRESERVER__ '
      })
    }

    // Preserves all URI strings in the text
    const mdlinks: string[] = []
    const uris: string[] = []
    if (opts.preserve_URIs) {
      // Stores Markdown links separately
      text = text.replace(/]\((.*?)\)/g, (matched, link) => {
        if (link) {
          mdlinks.push(link.trim())
          return '](__MD_LINK__PRESERVER__)' // No padding!
        }
        return matched
      })

      text = text.replace(new RegExp(this.patternURI), (matched) => {
        uris.push(matched)
        return ' __URI__PRESERVER__ '
      })
    }

    // Preserves all no-break space entities in the text
    const nbsps: string[] = []
    if (opts.preserve_nbsps) {
      text = text.replace(/&nbsp;|&#160;/gi, (matched) => {
        nbsps.push(matched)
        return ' __NBSPS__PRESERVER__ '
      })
    }

    if (opts.decode_htmlentities) {
      text = new DecodeHtmlEntitiesProcessor().process(text);
    }

    // preserves all html entities in the text
    // @props: @substack/node-ent
    const entities: string[] = []
    if (opts.preserve_entities) {
      text = text.replace(/&(#?[^;\W]+;?)/g, function (matched) {
        entities.push(matched)
        return ' __ENTITIES__PRESERVER__ '
      })
    }

    if (opts.normalize_eol) {
      text = this.processors.normalize_eol.process(text);
    }

    if (opts.fix_persian_glyphs) {
      text = this.processors.fix_persian_glyphs.process(text);
    }

    if (opts.fix_dashes) {
      text = this.processors.fix_dashes.process(text);
    }

    if (opts.fix_three_dots) {
      text = this.processors.fix_three_dots.process(text);
    }

    if (opts.normalize_ellipsis) {
      text = this.processors.normalize_ellipsis.process(text);
    }

    if (opts.fix_english_quotes_pairs) {
      text = this.processors.fix_english_quotes_pairs.process(text);
    }

    if (opts.fix_english_quotes) {
      text = this.processors.fix_english_quotes.process(text);
    }

    if (opts.fix_hamzeh) {
      if (opts.fix_hamzeh_arabic) {
        text = new HamzehArabicProcessor().process(text);
      }

      text = new HamzehProcessor().process(text);
    } else if (opts.fix_suffix_spacing) {
      if (opts.fix_hamzeh_arabic) {
        text = new HamzehArabicAltProcessor().process(text);
      }

      text = new SuffixSpacingHamzehProcessor().process(text);
    }

    if (opts.cleanup_rlm) {
      text = this.processors.cleanup_rlm.process(text);
    }

    if (opts.cleanup_zwnj) {
      text = this.processors.cleanup_zwnj.process(text);
    }

    if (opts.fix_arabic_numbers) {
      text = this.processors.fix_arabic_numbers.process(text);
    }

    // word tokenizer
    text = this.wordTokenizer(text, opts);

    if (opts.normalize_dates) {
      text = this.processors.normalize_dates.process(text);
    }

    if (opts.fix_prefix_spacing) {
      text = this.processors.fix_prefix_spacing.process(text);
    }

    if (opts.fix_suffix_spacing) {
      text = new SuffixSpacingProcessor().process(text);
    }

    if (opts.fix_suffix_misc) {
      text = new SuffixSpacingMiscProcessor().process(text);
    }

    if (opts.fix_spacing_for_braces_and_quotes) {
      text = new BracesSpacingProcessor().process(text);
    }

    if (opts.cleanup_extra_marks) {
      text = this.processors.cleanup_extra_marks.process(text);
    }

    if (opts.fix_spacing_for_punctuations) {
      text = this.processors.fix_spacing_for_punctuations.process(text);
    }

    if (opts.kashidas_as_parenthetic) {
      text = this.processors.kashidas_as_parenthetic.process(text);
    }

    if (opts.cleanup_kashidas) {
      text = this.processors.cleanup_kashidas.process(text);
    }

    if (opts.markdown_normalize_braces) {
      text = this.processors.markdown_normalize_braces.process(text);
    }

    if (opts.markdown_normalize_lists) {
      text = this.processors.markdown_normalize_lists.process(text);
    }

    // doing it again after `fixPunctuationSpacing()`
    if (opts.fix_spacing_for_braces_and_quotes) {
      text = new BracesSpacingInsideProcessor().process(text);
    }

    if (opts.fix_misc_spacing) {
      text = this.processors.fix_misc_spacing.process(text);
    }

    if (opts.remove_diacritics) {
      text = this.processors.remove_diacritics.process(text);
    } else if (opts.fix_diacritics) {
      text = this.processors.fix_diacritics.process(text);
    }

    if (opts.cleanup_spacing) {
      text = this.processors.cleanup_spacing.process(text);
    }

    if (opts.cleanup_zwnj) {
      text = new ZwnjLateProcessor().process(text);
    }

    if (opts.cleanup_line_breaks) {
      text = this.processors.cleanup_line_breaks.process(text);
    }

    // bringing back entities
    if (opts.preserve_entities) {
      text = text.replace(
        / ?__ENTITIES__PRESERVER__ ?/g,
        () => entities.shift() as string
      )
    }

    // bringing back nbsps
    if (opts.preserve_nbsps) {
      text = text.replace(
        / ?__NBSPS__PRESERVER__ ?/g,
        () => nbsps.shift() as string
      )
    }

    // bringing back URIs
    if (opts.preserve_URIs) {
      // no padding!
      text = text.replace(
        /__MD_LINK__PRESERVER__/g,
        () => mdlinks.shift() as string,
      )

      text = text.replace(
        / ?__URI__PRESERVER__ ?/g,
        () => uris.shift() as string
      )
    }

    // bringing back braces
    if (opts.preserve_braces) {
      text = text.replace(
        / ?__BRACES__PRESERVER__ ?/g,
        () => braces.shift() as string
      )
    }

    // bringing back brackets
    if (opts.preserve_brackets) {
      text = text.replace(
        / ?__BRACKETS__PRESERVER__ ?/g,
        () => brackets.shift() as string
      )
    }

    // bringing back HTML comments
    if (opts.preserve_comments) {
      text = text.replace(
        / ?__COMMENT__PRESERVER__ ?/g,
        () => comments.shift() as string
      )
    }

    // bringing back HTML tags
    if (opts.preserve_HTML) {
      text = text.replace(
        / ?__HTML__PRESERVER__ ?/g,
        () => html.shift() as string
      )
    }

    // bringing back frontmatter
    if (opts.preserve_frontmatter) {
      text = text.replace(
        / ?__FRONTMATTER__PRESERVER__ ?/g,
        () => frontmatter.shift() as string
      )
    }

    if (opts.cleanup_begin_and_end) {
      text = this.processors.cleanup_begin_and_end.process(text);
    } else {
      // removes single space paddings around the string
      text = text.replace(/^ /g, "").replace(/ $/g, "");
    }

    return text;
  }

  private wordTokenizer(text: string, opts: Record<string, any>) {
    return text.replace(
      /(^|\s+)([[({"'“«]?)(\S+)([\])}"'”»]?)(?=($|\s+))/g,
      (matched, before, leadings, word, trailings, after) => {
        // should not replace to persian chars in english phrases
        if (word.match(/[a-zA-Z\-_]{2,}/g)) {
          return matched;
        }

        // should not touch sprintf directives
        // @source: https://stackoverflow.com/a/8915445/
        if (
          word.match(
            /%(?:\d+\$)?[+-]?(?:[ 0]|'.)?-?\d*(?:\.\d+)?[bcdeEufFgGosxX]/g
          )
        ) {
          return matched;
        }

        // should not touch numbers in html entities
        if (word.match(/&#\d+;/g)) {
          return matched;
        }

        // skips converting english numbers of ordered lists in markdown
        if (
          opts.skip_markdown_ordered_lists_numbers_conversion &&
          (matched + trailings + after).match(/(?:\r?\n|\r\n?|(?:^|\n))\d+\.\s/)
        ) {
          return matched;
        }

        if (opts.fix_english_numbers) {
          matched = this.processors.fix_english_numbers.process(matched);
        }

        if (opts.fix_numeral_symbols) {
          matched = this.processors.fix_numeral_symbols.process(matched);
        }

        if (opts.fix_punctuations) {
          matched = this.processors.fix_punctuations.process(matched);
        }

        if (opts.fix_misc_non_persian_chars) {
          matched = this.processors.fix_misc_non_persian_chars.process(matched);
        }

        if (opts.fix_question_mark) {
          matched = this.processors.fix_question_mark.process(matched);
        }

        return matched;
      }
    );
  }

  /**
   * Parses the given options and returns an object with default options overridden by the given options.
   * @param options - The options to parse.
   * @returns An object with default options overridden by the given options.
   */
  private parseOptions(options: Record<string, any> = {}): Record<string, any> {
    // Initialize an object with default options.
    const parsed: Record<string, any> = { ...this.defaultOptions };

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
