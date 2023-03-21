import type { IProcessor } from './IProcessor'

/**
 * Base class for processors.
 */
export abstract class BaseProcessor implements IProcessor {
  /**
   * Processes the given input text.
   * @param text - The input text to process.
   * @returns The processed output text.
   */
  public abstract process(text: string): string
}
