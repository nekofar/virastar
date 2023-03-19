import { BaseProcessor } from './BaseProcessor'

/**
 * Processor that swaps incorrect quotes pairs `»«` to `«»` and `”“` to `“”`.
 */
export class SwapQuotesProcessor extends BaseProcessor {
  /**
   * Processes the input text by swapping incorrect quotes pairs.
   * @param text - The text to be processed.

   * @returns The processed text.
   */
  public process(text: string): string {
    return text.replace(/(»)(.+?)(«)/g, '«$2»').replace(/(”)(.+?)(“)/g, '“$2”')
  }
}
