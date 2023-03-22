import { CurlyBracesPreserver } from './CurlyBracesPreserver'
import { FrontMatterPreserver } from './FrontMatterPreserver'
import { HtmlCommentPreserver } from './HtmlCommentPreserver'
import { HtmlEntityPreserver } from './HtmlEntityPreserver'
import { HtmlPreserver } from './HtmlPreserver'
import { NonBreakingSpacePreserver } from './NonBreakingSpacePreserver'
import { SquareBracketsPreserver } from './SquareBracketsPreserver'
import { UriPreserver } from './UriPreserver'
import { MarkDownCodeBlockPreserver } from './MarkDownCodeBlockPreserver'
import type { IPreserver } from './IPreserver'

export class PreserverFactory {
  private static preservers: Record<string, IPreserver | null> = {
    preserveCurlyBraces: null,
    preserveFrontMatter: null,
    preserveHtmlComments: null,
    preserveHtmlEntities: null,
    preserveHtmlTags: null,
    preserveNonBreakingSpaces: null,
    preserveSquareBrackets: null,
    preserveUris: null,
    preserveMarkDownCodeBlocks: null,
  }

  createPreserver(type: string): IPreserver {
    const { preservers } = PreserverFactory
    let preserver = preservers[type]

    if (!preserver) {
      switch (type) {
        case 'preserveCurlyBraces':
          preserver = new CurlyBracesPreserver()
          break
        case 'preserveFrontMatter':
          preserver = new FrontMatterPreserver()
          break
        case 'preserveHtmlComments':
          preserver = new HtmlCommentPreserver()
          break
        case 'preserveHtmlEntities':
          preserver = new HtmlEntityPreserver()
          break
        case 'preserveHtmlTags':
          preserver = new HtmlPreserver()
          break
        case 'preserveNonBreakingSpaces':
          preserver = new NonBreakingSpacePreserver()
          break
        case 'preserveSquareBrackets':
          preserver = new SquareBracketsPreserver()
          break
        case 'preserveUris':
          preserver = new UriPreserver()
          break
        case 'preserveMarkDownCodeBlocks':
          preserver = new MarkDownCodeBlockPreserver()
          break
        default:
          throw new Error('Invalid preserver type')
      }

      preservers[type] = preserver
    }

    return preserver
  }
}
