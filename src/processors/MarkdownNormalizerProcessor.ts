import { BaseProcessor } from './BaseProcessor'

/**
 * A processor that normalizes various spacing issues in Markdown, including removing spaces between
 * markdown images, removing spaces between [] and (), and removing spaces inside
 * double () [] {}.
 */
export class MarkdownNormalizerProcessor extends BaseProcessor {
  /**
   * Processes the given input text by normalizing various spacing issues in Markdown.
   * @param text - The input text to process.
   * @returns The processed output text.
   */
  public process(text: string): string {
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
}
