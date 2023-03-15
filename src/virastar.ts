interface VirastarOptions {
  cleanup_begin_and_end?: boolean
  cleanup_extra_marks?: boolean
  cleanup_kashidas?: boolean
  cleanup_line_breaks?: boolean
  cleanup_rlm?: boolean
  cleanup_spacing?: boolean
  cleanup_zwnj?: boolean
  decode_htmlentities?: boolean
  fix_arabic_numbers?: boolean
  fix_dashes?: boolean
  fix_diacritics?: boolean
  fix_english_numbers?: boolean
  fix_english_quotes_pairs?: boolean
  fix_english_quotes?: boolean
  fix_hamzeh?: boolean
  fix_hamzeh_arabic?: boolean
  fix_misc_non_persian_chars?: boolean
  fix_misc_spacing?: boolean
  fix_numeral_symbols?: boolean
  fix_prefix_spacing?: boolean
  fix_persian_glyphs?: boolean
  fix_punctuations?: boolean
  fix_question_mark?: boolean
  fix_spacing_for_braces_and_quotes?: boolean
  fix_spacing_for_punctuations?: boolean
  fix_suffix_misc?: boolean
  fix_suffix_spacing?: boolean
  fix_three_dots?: boolean
  kashidas_as_parenthetic?: boolean
  markdown_normalize_braces?: boolean
  markdown_normalize_lists?: boolean
  normalize_dates?: boolean
  normalize_ellipsis?: boolean
  normalize_eol?: boolean
  preserve_braces?: boolean
  preserve_brackets?: boolean
  preserve_comments?: boolean
  preserve_entities?: boolean
  preserve_frontmatter?: boolean
  preserve_HTML?: boolean
  preserve_nbsps?: boolean
  preserve_URIs?: boolean
  remove_diacritics?: boolean
  skip_markdown_ordered_lists_numbers_conversion?: boolean
}

export class Virastar {
  public opts: VirastarOptions = {}

  constructor(text?: string | object, options: object = {}) {
    if (!(this instanceof Virastar)) {
      return new Virastar(text, options)
    }

    text = text || {}

    if (typeof text === 'object') {
      this.opts = this.parseOptions(text)
    } else {
      this.opts = this.parseOptions(options || {})
    }

    return this
  }

  parseOptions(options: Record<string, any> = {}) {
    const parsed: Record<string, any> = { ...this.defaults }

    for (const i in parsed) {
      if (Object.prototype.hasOwnProperty.call(options, i)) {
        parsed[i] = options[i]
      }
    }

    return parsed
  }

  charReplace(text: string, fromBatch: string, toBatch: string) {
    const fromChars = fromBatch.split('')
    const toChars = toBatch.split('')
    for (let i in fromChars) {
      text = text.replace(this.newRegExp(fromChars[i]), toChars[i])
    }
    return text
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
        // eslint-disable-line no-prototype-builtins
        text = text.replace(this.newRegExp('[' + array[i] + ']'), i)
      }
    }
    return text
  }

  /**
   * Creates and returns a new regular expression object.
   * @param pattern The pattern to be searched for.
   * @param flags The regular expression flags to use (optional).
   * @returns A new regular expression object.
   */
  private newRegExp(pattern: string, flags?: string): RegExp {
    return new RegExp(pattern, flags || 'g')
  }

  charsPersian = 'ءاآأإئؤبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیةيك'

  // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
  // `\u064e\u0650\u064f\u064b\u064d\u064c\u0651\u06c0`
  charsDiacritic = 'ًٌٍَُِّْ'

  // @source: https://github.com/jhermsmeier/uri.regex
  patternURI =
    "([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?"
  patternAfter = '\\s.,;،؛!؟?"\'()[\\]{}“”«»'

  defaults = {
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
    skip_markdown_ordered_lists_numbers_conversion: false,
  }

  digits = '۱۲۳۴۵۶۷۸۹۰'

  /* eslint-disable */
  private entities: { [key: string]: string } = {
    'sbquo;': '\u201a',
    'lsquo;': '\u2018',
    'lsquor;': '\u201a',
    'ldquo;': '\u201c',
    'ldquor;': '\u201e',
    'rdquo;': '\u201d',
    'rdquor;': '\u201d',
    'rsquo;': '\u2019',
    'rsquor;': '\u2019',
    'apos;': "'",
    'QUOT;': '"',
    QUOT: '"',
    'quot;': '"',
    quot: '"',
    'zwj;': '\u200d',
    'ZWNJ;': '\u200c',
    'zwnj;': '\u200c',
    'shy;': '\u00ad', // wrongly used as zwnj
  }

  // props @ebraminio/persiantools
  // noinspection JSNonASCIINames,NonAsciiCharacters
  glyphs = {
    // these two are for visually available ZWNJ #visualZwnj
    '\u200cه': 'ﻫ',
    'ی\u200c': 'ﻰﻲ',
    ﺃ: 'ﺄﺃ',
    ﺁ: 'ﺁﺂ',
    ﺇ: 'ﺇﺈ',
    ا: 'ﺎا',
    ب: 'ﺏﺐﺑﺒ',
    پ: 'ﭖﭗﭘﭙ',
    ت: 'ﺕﺖﺗﺘ',
    ث: 'ﺙﺚﺛﺜ',
    ج: 'ﺝﺞﺟﺠ',
    چ: 'ﭺﭻﭼﭽ',
    ح: 'ﺡﺢﺣﺤ',
    خ: 'ﺥﺦﺧﺨ',
    د: 'ﺩﺪ',
    ذ: 'ﺫﺬ',
    ر: 'ﺭﺮ',
    ز: 'ﺯﺰ',
    ژ: 'ﮊﮋ',
    س: 'ﺱﺲﺳﺴ',
    ش: 'ﺵﺶﺷﺸ',
    ص: 'ﺹﺺﺻﺼ',
    ض: 'ﺽﺾﺿﻀ',
    ط: 'ﻁﻂﻃﻄ',
    ظ: 'ﻅﻆﻇﻈ',
    ع: 'ﻉﻊﻋﻌ',
    غ: 'ﻍﻎﻏﻐ',
    ف: 'ﻑﻒﻓﻔ',
    ق: 'ﻕﻖﻗﻘ',
    ک: 'ﮎﮏﮐﮑﻙﻚﻛﻜ',
    گ: 'ﮒﮓﮔﮕ',
    ل: 'ﻝﻞﻟﻠ',
    م: 'ﻡﻢﻣﻤ',
    ن: 'ﻥﻦﻧﻨ',
    ه: 'ﻩﻪﻫﻬ',
    هٔ: 'ﮤﮥ',
    و: 'ﻭﻮ',
    ﺅ: 'ﺅﺆ',
    ی: 'ﯼﯽﯾﯿﻯﻰﻱﻲﻳﻴ',
    ئ: 'ﺉﺊﺋﺌ',
    لا: 'ﻼ',
    ﻹ: 'ﻺ',
    ﻷ: 'ﻸ',
    ﻵ: 'ﻶ',
  }

  /* eslint-enable */

  /**
   * Cleans up a given text by applying various text cleaning techniques based on options.
   *
   * @param text The text to be cleaned up.
   * @param options Optional options object to override default options.
   * @returns The cleaned up text.
   * @throws TypeError if the input text is not a string.
   */
  cleanup(text: string, options?: VirastarOptions) {
    // Don't bother if it's empty or whitespace
    if (!text.trim()) {
      return text
    }

    const opts = options ? this.parseOptions(options) : this.opts

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
      text = text.replace(/(\{.*?\})/g, function (matched) {
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
      text = this.decodeHTMLEntities(text)
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
      text = this.normalizeEOL(text)
    }

    if (opts.fix_persian_glyphs) {
      text = this.fixPersianGlyphs(text)
    }

    if (opts.fix_dashes) {
      text = this.fixDashes(text)
    }

    if (opts.fix_three_dots) {
      text = this.fixThreeDots(text)
    }

    if (opts.normalize_ellipsis) {
      text = this.normalizeEllipsis(text)
    }

    if (opts.fix_english_quotes_pairs) {
      text = this.fixEnglishQuotesPairs(text)
    }

    if (opts.fix_english_quotes) {
      text = this.fixEnglishQuotes(text)
    }

    if (opts.fix_hamzeh) {
      if (opts.fix_hamzeh_arabic) {
        text = this.fixHamzehArabic(text)
      }

      text = this.fixHamzeh(text)
    } else if (opts.fix_suffix_spacing) {
      if (opts.fix_hamzeh_arabic) {
        text = this.fixHamzehArabicAlt(text)
      }

      text = this.fixSuffixSpacingHamzeh(text)
    }

    if (opts.cleanup_rlm) {
      text = this.cleanupRLM(text)
    }

    if (opts.cleanup_zwnj) {
      text = this.cleanupZWNJ(text)
    }

    if (opts.fix_arabic_numbers) {
      text = this.fixArabicNumbers(text)
    }

    // word tokenizer
    text = text.replace(
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

        if (opts.fix_english_numbers) {
          matched = this.fixEnglishNumbers(matched)
        }

        if (opts.fix_numeral_symbols) {
          matched = this.fixNumeralSymbols(matched)
        }

        if (opts.fix_punctuations) {
          matched = this.fixPunctuations(matched)
        }

        if (opts.fix_misc_non_persian_chars) {
          matched = this.fixMiscNonPersianChars(matched)
        }

        if (opts.fix_question_mark) {
          matched = this.fixQuestionMark(matched)
        }

        return matched
      },
    )

    if (opts.normalize_dates) {
      text = this.normalizeDates(text)
    }

    if (opts.fix_prefix_spacing) {
      text = this.fixPrefixSpacing(text)
    }

    if (opts.fix_suffix_spacing) {
      text = this.fixSuffixSpacing(text)
    }

    if (opts.fix_suffix_misc) {
      text = this.fixSuffixMisc(text)
    }

    if (opts.fix_spacing_for_braces_and_quotes) {
      text = this.fixBracesSpacing(text)
    }

    if (opts.cleanup_extra_marks) {
      text = this.cleanupExtraMarks(text)
    }

    if (opts.fix_spacing_for_punctuations) {
      text = this.fixPunctuationSpacing(text)
    }

    if (opts.kashidas_as_parenthetic) {
      text = this.kashidasAsParenthetic(text)
    }

    if (opts.cleanup_kashidas) {
      text = this.cleanupKashidas(text)
    }

    if (opts.markdown_normalize_braces) {
      text = this.markdownNormalizeBraces(text)
    }

    if (opts.markdown_normalize_lists) {
      text = this.markdownNormalizeLists(text)
    }

    // doing it again after `fixPunctuationSpacing()`
    if (opts.fix_spacing_for_braces_and_quotes) {
      text = this.fixBracesSpacingInside(text)
    }

    if (opts.fix_misc_spacing) {
      text = this.fixMiscSpacing(text)
    }

    if (opts.remove_diacritics) {
      text = this.removeDiacritics(text)
    } else if (opts.fix_diacritics) {
      text = this.fixDiacritics(text)
    }

    if (opts.cleanup_spacing) {
      text = this.cleanupSpacing(text)
    }

    if (opts.cleanup_zwnj) {
      text = this.cleanupZWNJLate(text)
    }

    if (opts.cleanup_line_breaks) {
      text = this.cleanupLineBreaks(text)
    }

    // bringing back entities
    if (opts.preserve_entities) {
      text = text.replace(
        /[ ]?__ENTITIES__PRESERVER__[ ]?/g,
        () => entities.shift() as string,
      )
    }

    // bringing back nbsps
    if (opts.preserve_nbsps) {
      text = text.replace(
        /[ ]?__NBSPS__PRESERVER__[ ]?/g,
        () => nbsps.shift() as string,
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
        /[ ]?__URI__PRESERVER__[ ]?/g,
        () => uris.shift() as string,
      )
    }

    // bringing back braces
    if (opts.preserve_braces) {
      text = text.replace(
        /[ ]?__BRACES__PRESERVER__[ ]?/g,
        () => braces.shift() as string,
      )
    }

    // bringing back brackets
    if (opts.preserve_brackets) {
      text = text.replace(
        /[ ]?__BRACKETS__PRESERVER__[ ]?/g,
        () => brackets.shift() as string,
      )
    }

    // bringing back HTML comments
    if (opts.preserve_comments) {
      text = text.replace(
        /[ ]?__COMMENT__PRESERVER__[ ]?/g,
        () => comments.shift() as string,
      )
    }

    // bringing back HTML tags
    if (opts.preserve_HTML) {
      text = text.replace(
        /[ ]?__HTML__PRESERVER__[ ]?/g,
        () => html.shift() as string,
      )
    }

    // bringing back frontmatter
    if (opts.preserve_frontmatter) {
      text = text.replace(
        /[ ]?__FRONTMATTER__PRESERVER__[ ]?/g,
        () => frontmatter.shift() as string,
      )
    }

    if (opts.cleanup_begin_and_end) {
      text = this.cleanupBeginAndEnd(text)
    } else {
      // removes single space paddings around the string
      text = text.replace(/^[ ]/g, '').replace(/[ ]$/g, '')
    }

    return text
  }

  // props @ebraminio/persiantools
  /**
   * Replaces soft hyphens with ZWNJ and cleans up unnecessary ZWNJ.
   *
   * @param text The input string to clean up.
   * @returns The cleaned up string.
   */
  private cleanupZWNJ(text: string) {
    return (
      text

        // converts all soft hyphens (&shy;) into zwnj
        .replace(/\u00ad/g, '\u200c')

        // removes more than one zwnj
        .replace(/\u200c{2,}/g, '\u200c')

        // cleans zwnj before and after numbers, english words, spaces and punctuations
        .replace(
          /\u200c([\w\s0-9۰-۹[\](){}«»“”.…,:;?!$%@#*=+\-/\\،؛٫٬×٪؟ـ])/g,
          '$1',
        )
        .replace(
          /([\w\s0-9۰-۹[\](){}«»“”.…,:;?!$%@#*=+\-/\\،؛٫٬×٪؟ـ])\u200c/g,
          '$1',
        )

        // removes unnecessary zwnj on start/end of each line
        .replace(/(^\u200c|\u200c$)/gm, '')
    )
  }

  // late checks for zwnjs
  cleanupZWNJLate(text: string) {
    return (
      text

        // cleans zwnj after characters that don't conncet to the next
        .replace(/([إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, '$1')
    )
  }

  /**
   * Decodes HTML entities in the given text.
   * @param text - The text containing HTML entities to decode.
   * @returns The text with HTML entities decoded.
   */
  private decodeHTMLEntities(text: string): string {
    return text.replace(/&(#?[^;\W]+;?)/g, (matched: string, match: string) => {
      let n: RegExpExecArray | null

      if ((n = /^#(\d+);?$/.exec(match))) {
        return String.fromCharCode(parseInt(n[1], 10))
      } else if ((n = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match))) {
        return String.fromCharCode(parseInt(n[1], 16))
      } else {
        const hasSemi = /;$/.test(match)
        const withoutSemi = hasSemi ? match.replace(/;$/, '') : match
        const target =
          this.entities[withoutSemi] || (hasSemi && this.entities[match])

        if (typeof target === 'number') {
          return String.fromCharCode(target)
        } else if (typeof target === 'string') {
          return target
        } else {
          return '&' + match
        }
      }
    })
  }

  normalizeEOL(text: string) {
    return (
      text

        // replaces windows end of lines with unix eol (`\n`)
        .replace(/(\r?\n)|(\r\n?)/g, '\n')
    )
  }

  /**
   * Replaces triple and double dashes with mdash and ndash respectively.
   * @param text The text to fix.
   * @returns The fixed text.
   */
  private fixDashes(text: string): string {
    return (
      text
        // Replaces triple dash to mdash
        .replace(/-{3}/g, '\u2014')

        // Replaces double dash to ndash
        .replace(/-{2}/g, '\u2013')
    )
  }

  fixThreeDots(text: string) {
    return (
      text

        // removes spaces between dots
        .replace(/\.([ ]+)(?=[.])/g, '.')

        // replaces three dots with ellipsis character
        .replace(/[ \t]*\.{3,}/g, '…')
    )
  }

  normalizeEllipsis(text: string) {
    return (
      text

        // replaces more than one ellipsis with one
        .replace(/(…){2,}/g, '…')

        // replaces (space|tab|zwnj) after ellipsis with one space
        // NOTE: allows for space before ellipsis
        .replace(/([ ]{1,})*…[ \t\u200c]*/g, '$1… ')
    )
  }

  /**
   * Replaces English quote pairs with their Persian equivalent.
   *
   * @param text The text to fix.
   * @returns The fixed text.
   */
  private fixEnglishQuotesPairs(text: string): string {
    return text.replace(/“(.+?)”/g, '«$1»')
  }

  /**
   * Replaces English quote marks with their Persian equivalent.
   * @param text The input string in Persian to be fixed.
   * @returns Returns a string with English quote marks replaced with their Persian equivalent.
   */
  private fixEnglishQuotes(text: string): string {
    return text.replace(/(["'`]+)(.+?)(\1)/g, '«$2»')
  }

  /**
   * Replaces various forms of "heh" followed by "ye" or "hamza" with the standard form "heh with hamza"
   * and replaces various forms of the Persian letter "ve" with the standard form "heh with hamza".
   * @param text The text to fix.
   * @returns The fixed text.
   */
  private fixHamzeh(text: string): string {
    const replacement = '$1هٔ$3'

    return (
      text
        // replaces ه followed by (space|ZWNJ|lrm) follow by ی with هٔ
        .replace(/(\S)(ه[\s\u200c\u200e]+[یي])([\s\u200c\u200e])/g, replacement)

        // replaces ه followed by (space|ZWNJ|lrm|nothing) follow by ء with هٔ
        .replace(
          /(\S)(ه[\s\u200c\u200e]?\u0621)([\s\u200c\u200e])/g,
          replacement,
        )

        // replaces هٓ or single-character ۀ with the standard هٔ
        .replace(/(ۀ|هٓ)/g, 'هٔ')
    )
  }

  /**
   * Replaces Arabic hamzeh with هٔ in the input string.
   * @param text The input string to replace Arabic hamzeh in.
   * @returns The input string with Arabic hamzeh replaced with هٔ.
   */
  private fixHamzehArabic(text: string): string {
    return text.replace(/(\S)ة([\s\u200c\u200e])/g, '$1هٔ$2')
  }

  /**
   * Replaces Arabic Hamzeh ة with ه‌ی in Persian text
   * @param text Input text in Persian
   * @returns Text with Hamzeh ة replaced with ه‌ی
   */
  private fixHamzehArabicAlt(text: string): string {
    return text.replace(/(\S)ة([\s\u200c\u200e])/g, '$1ه‌ی$2')
  }

  /**
   * Replaces Right-to-Left marks followed by Persian characters with Zero-Width Non-Joiners (ZWNJ) in the given text.
   * @param text The input string to process.
   * @returns Returns the processed string.
   */
  private cleanupRLM(text: string): string {
    return text.replace(/([^a-zA-Z\-_])(\u200F)/g, '$1\u200c')
  }

  // converts incorrect persian glyphs to standard characters
  private fixPersianGlyphs(text: string) {
    return this.arrReplace(text, this.glyphs)
  }

  // props @ebraminio/persiantools
  /**
   * Replaces misc. non-Persian characters with their Persian equivalent.
   * @param text The text to fix.
   * @returns The fixed text.
   */
  private fixMiscNonPersianChars(text: string): string {
    return this.charReplace(text, 'كڪيىۍېہە', 'ککییییههه')
  }

  /**
   * Replaces English numbers with their Persian equivalent.
   * @param text - The input text to be processed.
   * @returns The processed text with Persian numbers.
   */
  private fixEnglishNumbers(text: string): string {
    return this.charReplace(text, '1234567890', this.digits)
  }

  /**
   * Replaces Arabic numbers with their Persian equivalent.
   *
   * @param text - The input text.
   * @returns The text with Arabic numbers replaced with their Persian equivalent.
   */
  private fixArabicNumbers(text: string): string {
    const arabicNumbers = '١٢٣٤٥٦٧٨٩٠'
    const persianNumbers = '۱۲۳۴۵۶۷۸۹۰'

    return this.charReplace(text, arabicNumbers, persianNumbers)
  }

  /**
   * Converts Persian numbers to Arabic numbers in a given string.
   * @param text - The input string to convert Persian numbers.
   * @returns The string with Persian numbers converted to Arabic numbers.
   */
  private convertPersianNumbers(text: string): string {
    // Using regex to match Persian numbers and replacing them with Arabic numbers
    return text.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (char) {
      // Converting each matched Persian number to an Arabic number
      return (char.charCodeAt(0) & 0xf).toString()
    })
  }

  /**
   * Replaces English numerals with their Persian equivalent characters
   * @param text The text that needs to be fixed
   * @returns The text with fixed numerals
   */
  private fixNumeralSymbols(text: string): string {
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

  normalizeDates(text: string) {
    return (
      text

        // re-orders date parts with slash as delimiter
        .replace(
          /([0-9۰-۹]{1,2})([/-])([0-9۰-۹]{1,2})\2([0-9۰-۹]{4})/g,
          function (
            matched: any,
            day: string,
            delimiter: any,
            month: string,
            year: string,
          ) {
            return year + '/' + month + '/' + day
          },
        )
    )
  }

  fixPunctuations(text: string) {
    return this.charReplace(text, ',;', '،؛')
  }

  // replaces question marks with its persian equivalent
  fixQuestionMark(text: string) {
    return text.replace(/(\?)/g, '\u061F') // \u061F = ؟
  }

  /**
   * Puts zwnj between the word and the prefix: mi*, nemi*, bi*.
   * Note: there's a possible bug here: prefixes could be separate nouns.
   * @param text - The input text to process.
   * @returns The processed text with zwnj between the word and the prefix.
   */
  private fixPrefixSpacing(text: string): string {
    const replacement = '$1\u200c$3'
    return text
      .replace(/((\s|^)ن?می) ([^ ])/g, replacement)
      .replace(/((\s|^)بی) ([^ ])/g, replacement)
  }

  // puts zwnj between the word and the suffix
  // NOTE: possible bug: suffixes could be nouns
  fixSuffixSpacing(text: string) {
    const replacement = '$1\u200c$2'
    return (
      text

        // must done before others
        // *ha *haye
        .replace(
          this.newRegExp(
            '([' +
              this.charsPersian +
              this.charsDiacritic +
              ']) (ها(ی)?[' +
              this.patternAfter +
              '])',
          ),
          replacement,
        )

        // *am *at *ash *ei *eid *eem *and *man *tan *shan
        .replace(
          this.newRegExp(
            '([' +
              this.charsPersian +
              this.charsDiacritic +
              ']) ((ام|ات|اش|ای|اید|ایم|اند|مان|تان|شان)[' +
              this.patternAfter +
              '])',
          ),
          replacement,
        )

        // *tar *tari *tarin
        .replace(
          this.newRegExp(
            '([' +
              this.charsPersian +
              this.charsDiacritic +
              ']) (تر((ی)|(ین))?[' +
              this.patternAfter +
              '])',
          ),
          replacement,
        )

        // *hayee *hayam *hayat *hayash *hayetan *hayeman *hayeshan
        .replace(
          this.newRegExp(
            '([' +
              this.charsPersian +
              this.charsDiacritic +
              ']) ((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)[' +
              this.patternAfter +
              '])',
          ),
          replacement,
        )
    )
  }

  fixSuffixSpacingHamzeh(text: string) {
    const replacement = '$1\u0647\u200c\u06cc$3'
    return (
      text

        // heh + ye
        .replace(/(\S)(ه[\s\u200c]+[یي])([\s\u200c])/g, replacement)

        // heh + standalone hamza
        .replace(/(\S)(ه[\s\u200c]?\u0621)([\s\u200c])/g, replacement)

        // heh + hamza above
        .replace(/(\S)(ه[\s\u200c]?\u0654)([\s\u200c])/g, replacement)
    )
  }

  fixSuffixMisc(text: string) {
    return (
      text
        // replaces ه followed by ئ or ی, and then by ی, with ه\u200cای,
        // EXAMPLE: خانه‌ئی becomes خانه‌ای
        // props @ebraminio/persiantools
        .replace(/(\S)ه[\u200c\u200e][ئی]ی([\s\u200c\u200e])/g, '$1ه\u200cای$2')
    )
  }

  /**
   * Removes extra marks from the text and replaces repeated marks with a single one.
   *
   * @param text The input text to clean up.
   * @returns The cleaned text.
   */
  private cleanupExtraMarks(text: string) {
    // remove space between different/same marks
    text = text.replace(/([؟?!])([ ]+)(?=[؟?!])/g, '$1')

    // replace more than one exclamation mark with just one
    text = text.replace(/(!){2,}/g, '$1')

    // replace more than one english or persian question mark with just one
    text = text.replace(/([\u061F?]){2,}/g, '$1')

    // re-order consecutive marks
    text = text.replace(/(!)([ \t]*)([\u061F?])/g, '$3$1')

    // `?!` --> `!?`
    return text
  }

  // replaces kashidas to ndash in parenthetic
  kashidasAsParenthetic(text: string) {
    return text.replace(/(\s)\u0640+/g, '$1–').replace(/\u0640+(\s)/g, '–$1')
  }

  /**
   * Replaces kashidas between numbers with ndash, and removes all kashidas between non-whitespace characters
   *
   * @param {string} text - The text to clean up
   * @returns {string} The cleaned up text
   */
  private cleanupKashidas(text: string) {
    return (
      text
        // converts kashida between numbers to ndash
        .replace(/([0-9۰-۹]+)ـ+([0-9۰-۹]+)/g, '$1–$2')

        // removes all kashidas between non-whitespace characters
        // MAYBE: more punctuations
        .replace(/([^\s.])\u0640+(?![\s.])/g, '$1')
    )
  }

  fixPunctuationSpacing(text: string) {
    return (
      text
        // removes space before punctuations
        .replace(/[ \t\u200c]*([:;,؛،.؟?!]{1})/g, '$1')

        // removes more than one space after punctuations
        // except followed by new-lines (or preservers)
        .replace(/([:;,؛،.؟?!]{1})[ \t\u200c]*(?!\n|_{2})/g, '$1 ')

        // removes space after colon that separates time parts
        .replace(/([0-9۰-۹]+):\s+([0-9۰-۹]+)/g, '$1:$2')

        // removes space after dots in numbers
        .replace(/([0-9۰-۹]+)\. ([0-9۰-۹]+)/g, '$1.$2')

        // removes space before common domain tlds
        .replace(
          /([\w\-_]+)\. (ir|com|org|net|info|edu|me)([\s/\\\])»:;.])/g,
          '$1.$2$3',
        )

        // removes space between different/same marks (double-check)
        .replace(/([؟?!])([ ]+)(?=[؟?!])/g, '$1')
    )
  }

  fixBracesSpacing(text: string) {
    const replacement = ' $1$2$3 '
    return (
      text
        // removes inside spaces and more than one outside
        // for `()`, `[]`, `{}`, `“”` and `«»`
        .replace(
          /[ \t\u200c]*(\()\s*([^)]+?)\s*?(\))[ \t\u200c]*/g,
          replacement,
        )
        .replace(
          /[ \t\u200c]*(\[)\s*([^\]]+?)\s*?(])[ \t\u200c]*/g,
          replacement,
        )
        .replace(/[ \t\u200c]*(\{)\s*([^}]+?)\s*?(})[ \t\u200c]*/g, replacement)
        .replace(/[ \t\u200c]*(“)\s*([^”]+?)\s*?(”)[ \t\u200c]*/g, replacement)
        .replace(/[ \t\u200c]*(«)\s*([^»]+?)\s*?(»)[ \t\u200c]*/g, replacement)
    )
  }

  fixBracesSpacingInside(text: string) {
    const replacement = '$1$2$3'
    return (
      text
        // removes inside spaces for `()`, `[]`, `{}`, `“”` and `«»`
        .replace(/(\()\s*([^)]+?)\s*?(\))/g, replacement)
        .replace(/(\[)\s*([^\]]+?)\s*?(])/g, replacement)
        .replace(/(\{)\s*([^}]+?)\s*?(})/g, replacement)
        .replace(/(“)\s*([^”]+?)\s*?(”)/g, replacement)
        .replace(/(«)\s*([^»]+?)\s*?(»)/g, replacement)

        // NOTE: must be here, wierd not working if on `markdownNormalizeBraces()`
        // removes markdown link spaces inside normal ()
        .replace(/(\(\[.*?]\(.*?\))\s+(\))/g, '$1$2')
    )
  }

  markdownNormalizeBraces(text: string) {
    return (
      text
        // removes space between ! and opening brace on markdown images
        // EXAMPLE: `! [alt] (src)` --> `![alt](src)`
        .replace(/! (\[.*?])[ ]?(\(.*?\))[ ]?/g, '!$1$2')

        // removes spaces between [] and ()
        // EXAMPLE: `[text] (link)` --> `[text](link)`
        .replace(/(\[.*?])[ \t]+(\(.*?\))/g, '$1$2')

        // removes spaces inside double () [] {}
        // EXAMPLE: `[[ text ]]` --> `[[text]]`
        .replace(/\(\([ \t]*(.*?)[ \t]*\)\)/g, '(($1))')
        .replace(/\[\[[ \t]*(.*?)[ \t]*]]/g, '[[$1]]')
        .replace(/\{\{[ \t]*(.*?)[ \t]*}}/g, '{{$1}}')
        .replace(/\{\{\{[ \t]*(.*?)[ \t]*}}}/g, '{{{$1}}}') // mustache escape

        // removes spaces between double () [] {}
        // EXAMPLE: `[[text] ]` --> `[[text]]`
        .replace(/(\(\(.*\))[ \t]+(\))/g, '$1$2')
        .replace(/(\[\[.*])[ \t]+(])/g, '$1$2')
        .replace(/(\{\{.*})[ \t]+(})/g, '$1$2')
    )
  }

  markdownNormalizeLists(text: string) {
    return (
      text
        // removes extra line between two items list
        .replace(/((\n|^)\*.*?)\n+(?=\n\*)/g, '$1')
        .replace(/((\n|^)-.*?)\n+(?=\n-)/g, '$1')
        .replace(/((\n|^)#.*?)\n+(?=\n#)/g, '$1')
    )
  }

  /**
   * Removes miscellaneous spaces in Persian text.
   * @param text - The Persian text to fix.
   * @returns The cleaned text.
   */
  private fixMiscSpacing(text: string): string {
    return (
      text

        // removes space before parentheses on misc cases
        .replace(/ \((ص|عج|س|ع|ره)\)/g, '($1)')

        // removes space before braces containing numbers
        .replace(/ \[([0-9۰-۹]+)]/g, '[$1]')
    )
  }

  /**
   * Replaces diacritic characters with their clean equivalent
   * @param text - The text to fix
   * @returns The text with diacritic characters replaced
   */
  private fixDiacritics(text: string): string {
    return (
      text
        // cleans zwnj before diacritic characters
        .replace(this.newRegExp('\u200c([' + this.charsDiacritic + '])'), '$1')

        // cleans more than one diacritic characters
        // props @languagetool-org
        .replace(
          this.newRegExp(`(.*)([${this.charsDiacritic}]){2,}(.*)`),
          '$1$2$3',
        )

        // cleans spaces before diacritic characters
        .replace(
          this.newRegExp('(\\S)[ ]+([' + this.charsDiacritic + '])'),
          '$1$2',
        )
    )
  }

  removeDiacritics(text: string) {
    return (
      text

        // removes all diacritic characters
        .replace(this.newRegExp('[' + this.charsDiacritic + ']+'), '')
    )
  }

  /**
   * Cleans up the spacing in the given text.
   * @param {string} text - The text to clean up spacing for.
   * @returns {string} The cleaned up text.
   */
  private cleanupSpacing(text: string): string {
    return (
      text

        // replaces more than one space with just a single one
        // except before/after preservers and before new-lines
        // .replace(/(?<![_]{2})([ ]{2,})(?![_]{2}|\n)/g, ' ') // WORKS: using lookbehind
        .replace(/([^_])([ ]{2,})(?![_]{2}|\n)/g, '$1 ')

        // cleans tab/space/zwnj/zwj/nbsp between two new-lines(\n)
        // @REF: https://stackoverflow.com/a/10965543/
        .replace(/^\n([\t\u0020\u200c\u200d\u00a0]*)\n$/gm, '\n\n')
    )
  }

  /**
   * Cleans up line breaks in a Persian text.
   * @param {string} text - The Persian text to clean up.
   * @returns {string} - The cleaned text.
   */
  private cleanupLineBreaks(text: string): string {
    // Cleans more than two contiguous line-breaks.
    return text.replace(/\n{2,}/g, '\n\n')
  }

  /**
   * Removes leading and trailing whitespace, newlines, zwnj, directionality marks, and nbsp from text.
   */
  private cleanupBeginAndEnd(text: string) {
    return (
      text
        // Removes space/tab/zwnj/nbsp from the beginning of the new-lines.
        .replace(/([\n]+)[ \t\u200c\u00a0]*/g, '$1')

        // Removes spaces, tabs, zwnj, direction marks, and new lines from
        // the beginning and end of text.
        // Ref: https://stackoverflow.com/a/38490203
        .replace(/^[\s\u200c\u200e\u200f]+|[\s\u200c\u200e\u200f]+$/g, '')
    )
  }

  flipPunctuations(text: string) {
    const end = ['-']
    const start = ['!', '.', '،', '…', '"']
    const before = []
    const after = []

    text = this.fixThreeDots(text)

    for (let iStart = 0; iStart < start.length; iStart++) {
      const sElement = start[iStart]
      const sReg = this.newRegExp('^\\' + sElement, 'i')
      if (sReg.test(text)) {
        text = text.replace(sReg, '').trim()
        after.push(sElement)
      }
    }

    for (let iEnd = 0; iEnd < end.length; iEnd++) {
      const eElement = end[iEnd]
      const eReg = this.newRegExp('\\' + eElement + '$', 'i')
      if (eReg.test(text)) {
        text = text.replace(eReg, '').trim()
        before.push(eElement)
      }
    }

    for (let iBefore = 0; iBefore < before.length; iBefore++) {
      text = before[iBefore] + ' ' + text
    }

    for (let iAfter = 0; iAfter < after.length; iAfter++) {
      text += after[iAfter]
    }

    return this.normalizeEllipsis(text)
  }

  // swap incorrect quotes pairs `»«` to `«»` and `”“` to `“”`
  swapQuotes(text: string) {
    return text.replace(/(»)(.+?)(«)/g, '«$2»').replace(/(”)(.+?)(“)/g, '“$2”')
  }
}
