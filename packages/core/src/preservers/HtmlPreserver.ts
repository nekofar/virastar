import { BasePreserver } from './BasePreserver'

/**
 * A class that preserves HTML tags in a given text by replacing them with a
 * placeholder and restoring them later.
 */
export class HtmlPreserver extends BasePreserver {
  /**
   * Replaces HTML tags in the given text with a placeholder and adds them to the
   * `preserves` array.
   * @param text The text to prepare.
   * @returns The prepared text.
   */
  public prepare(text: string): string {
    return text.replace(/<\/?[a-z][^>]*?>/gi, (matched) => {
      this.preserves.push(matched)
      return ' __HTML__PRESERVER__ '
    })
  }

  /**
   * Restores HTML tags in the given text that were previously replaced with a
   * placeholder.
   * @param text The text to restore.
   * @returns The restored text.
   */
  restore(text: string): string {
    return text.replace(
      / ?__HTML__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
