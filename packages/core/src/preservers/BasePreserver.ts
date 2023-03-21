import type { IPreserver } from './IPreserver'

/**
 * Abstract class that implements the IPreserver interface and provides common functionality for preservers.
 */
export abstract class BasePreserver implements IPreserver {
  /**
   * Array of preserved text.
   */
  protected preserves: string[] = []

  /**
   * Retrieves the next preserved Markdown code block from the `preserves` array.
   * @returns The next preserved code block, or undefined if none remain.
   */
  protected getNextPreserved(): string | undefined {
    return this.preserves.shift()
  }

  /**
   * Prepares the given text for preservation by replacing all text with a placeholder string and storing the code blocks in `preserves`.
   * @param text - The text to prepare for preservation.
   * @returns The text with text replaced by a placeholder string.
   */
  public abstract prepare(text: string): string

  /**
   * Restores the preserved text in the given text by replacing the placeholder string with the original code blocks.
   * @param text - The text with preserved code blocks to restore.
   * @returns The text with restored code blocks.
   */
  public abstract restore(text: string): string
}
