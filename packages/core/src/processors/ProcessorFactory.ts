import { LeadingAndTrailingSpaceProcessor } from './LeadingAndTrailingSpaceProcessor'
import { ExtraMarksProcessor } from './ExtraMarksProcessor'
import { KashidasProcessor } from './KashidasProcessor'
import { LineBreakProcessor } from './LineBreakProcessor'
import { RightToLeftMarkProcessor } from './RightToLeftMarkProcessor'
import { SpacingProcessor } from './SpacingProcessor'
import { ZeroWidthNonJoinerProcessor } from './ZeroWidthNonJoinerProcessor'
import { DecodeHtmlEntitiesProcessor } from './DecodeHtmlEntitiesProcessor'
import { EllipsisProcessor } from './EllipsisProcessor'
import { EndOfLineProcessor } from './EndOfLineProcessor'
import { DateNormalizerProcessor } from './DateNormalizerProcessor'
import { KashidasAsParentheticProcessor } from './KashidasAsParentheticProcessor'
import { MarkdownNormalizerProcessor } from './MarkdownNormalizerProcessor'
import { MarkdownListProcessor } from './MarkdownListProcessor'
import { ThreeDotsProcessor } from './ThreeDotsProcessor'
import { RemoveDiacriticsProcessor } from './RemoveDiacriticsProcessor'
import { PunctuationSpacingProcessor } from './PunctuationSpacingProcessor'
import { ArabicNumbersProcessor } from './ArabicNumbersProcessor'
import { DashProcessor } from './DashProcessor'
import { DiacriticsProcessor } from './DiacriticsProcessor'
import { EnglishNumbersProcessor } from './EnglishNumbersProcessor'
import { EnglishQuotesProcessor } from './EnglishQuotesProcessor'
import { EnglishQuotesPairsProcessor } from './EnglishQuotesPairsProcessor'
import { HamzehProcessor } from './HamzehProcessor'
import { HamzehArabicProcessor } from './HamzehArabicProcessor'
import { MiscNonPersianCharsProcessor } from './MiscNonPersianCharsProcessor'
import { MiscSpacingProcessor } from './MiscSpacingProcessor'
import { NumeralSymbolProcessor } from './NumeralSymbolProcessor'
import { GlyphsProcessor } from './GlyphsProcessor'
import { PrefixSpacingProcessor } from './PrefixSpacingProcessor'
import { PunctuationProcessor } from './PunctuationProcessor'
import { QuestionMarkProcessor } from './QuestionMarkProcessor'
import { BracesSpacingProcessor } from './BracesSpacingProcessor'
import { SuffixSpacingMiscProcessor } from './SuffixSpacingMiscProcessor'
import type { IProcessor } from './IProcessor'
import { BracesSpacingInsideProcessor } from './BracesSpacingInsideProcessor'
import { SuffixSpacingProcessor } from "./SuffixSpacingProcessor";

export class ProcessorFactory {
  private static processors: Record<string, IProcessor | null> = {
    removeLeadingAndTrailingSpaces: null,
    cleanupExtraMarks: null,
    cleanupKashidas: null,
    cleanupLineBreaks: null,
    cleanupRightToLeftMarks: null,
    cleanupSpacing: null,
    cleanupZeroWidthNonJoiners: null,
    decodeHtmlEntities: null,
    normalizeEllipsis: null,
    normalizeEndOfLines: null,
    normalizeJalaliDates: null,
    normalizeKashidas: null,
    normalizeMarkDownBraces: null,
    normalizeMarkDownLists: null,
    normalizeThreeDots: null,
    removeDiacritics: null,
    removeSpacingForPunctuations: null,
    replaceArabicNumbers: null,
    replaceDashes: null,
    replaceDiacritics: null,
    replaceEnglishNumbers: null,
    replaceEnglishQuotes: null,
    replaceEnglishQuotesPairs: null,
    replaceHamzeh: null,
    replaceHamzehArabic: null,
    replaceMiscNonPersianChars: null,
    replaceMiscSpacing: null,
    replaceNumeralSymbols: null,
    replacePersianGlyphs: null,
    replacePrefixSpacing: null,
    replacePunctuations: null,
    replaceQuestionMarks: null,
    replaceSpacingForBracesAndQuotes: null,
    replaceSuffixMisc: null,
    replacesSpacesInsideBraces: null,
    replacesExtraSpacesAroundBraces: null,
    replaceSuffixSpacing: null,
  }

  createProcessor(type: string): IProcessor {
    const { processors } = ProcessorFactory
    let processor = processors[type]

    if (!processor) {
      switch (type) {
        case 'removeLeadingAndTrailingSpaces':
          processor = new LeadingAndTrailingSpaceProcessor()
          break
        case 'cleanupExtraMarks':
          processor = new ExtraMarksProcessor()
          break
        case 'cleanupKashidas':
          processor = new KashidasProcessor()
          break
        case 'cleanupLineBreaks':
          processor = new LineBreakProcessor()
          break
        case 'cleanupRightToLeftMarks':
          processor = new RightToLeftMarkProcessor()
          break
        case 'cleanupSpacing':
          processor = new SpacingProcessor()
          break
        case 'cleanupZeroWidthNonJoiners':
          processor = new ZeroWidthNonJoinerProcessor()
          break
        case 'decodeHtmlEntities':
          processor = new DecodeHtmlEntitiesProcessor()
          break
        case 'normalizeEllipsis':
          processor = new EllipsisProcessor()
          break
        case 'normalizeEndOfLines':
          processor = new EndOfLineProcessor()
          break
        case 'normalizeJalaliDates':
          processor = new DateNormalizerProcessor()
          break
        case 'normalizeKashidas':
          processor = new KashidasAsParentheticProcessor()
          break
        case 'normalizeMarkDownBraces':
          processor = new MarkdownNormalizerProcessor()
          break
        case 'normalizeMarkDownLists':
          processor = new MarkdownListProcessor()
          break
        case 'normalizeThreeDots':
          processor = new ThreeDotsProcessor()
          break
        case 'removeDiacritics':
          processor = new RemoveDiacriticsProcessor()
          break
        case 'removeSpacingForPunctuations':
          processor = new PunctuationSpacingProcessor()
          break
        case 'replaceArabicNumbers':
          processor = new ArabicNumbersProcessor()
          break
        case 'replaceDashes':
          processor = new DashProcessor()
          break
        case 'replaceDiacritics':
          processor = new DiacriticsProcessor()
          break
        case 'replaceEnglishNumbers':
          processor = new EnglishNumbersProcessor()
          break
        case 'replaceEnglishQuotes':
          processor = new EnglishQuotesProcessor()
          break
        case 'replaceEnglishQuotesPairs':
          processor = new EnglishQuotesPairsProcessor()
          break
        case 'replaceHamzeh':
          processor = new HamzehProcessor()
          break
        case 'replaceHamzehArabic':
          processor = new HamzehArabicProcessor()
          break
        case 'replaceMiscNonPersianChars':
          processor = new MiscNonPersianCharsProcessor()
          break
        case 'replaceMiscSpacing':
          processor = new MiscSpacingProcessor()
          break
        case 'replaceNumeralSymbols':
          processor = new NumeralSymbolProcessor()
          break
        case 'replacePersianGlyphs':
          processor = new GlyphsProcessor()
          break
        case 'replacePrefixSpacing':
          processor = new PrefixSpacingProcessor()
          break
        case 'replacePunctuations':
          processor = new PunctuationProcessor()
          break
        case 'replaceQuestionMarks':
          processor = new QuestionMarkProcessor()
          break
        case 'replaceSpacingForBracesAndQuotes':
          processor = new BracesSpacingProcessor()
          break
        case 'replaceSuffixMisc':
          processor = new SuffixSpacingMiscProcessor()
          break
        case 'replacesSpacesInsideBraces':
          processor = new BracesSpacingInsideProcessor()
          break
        case 'replacesExtraSpacesAroundBraces':
          processor = new BracesSpacingProcessor()
          break
       case 'replaceSuffixSpacing':
          processor = new SuffixSpacingProcessor()
          break
        default:
          throw new Error('Invalid processor type')
      }

      processors[type] = processor
    }
    return processor
  }
}
