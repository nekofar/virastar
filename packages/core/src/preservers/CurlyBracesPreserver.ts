import { BasePreserver } from './BasePreserver'

export class CurlyBracesPreserver extends BasePreserver {
  /**
   * Replaces curly braces in the given text with a unique string to preserve them for later.
   *
   * @param text - The text to prepare.
   * @returns The modified text with curly braces replaced.
   */
  prepare(text: string): string {
    const curlyBracesRegex = /(\{.*?})/g
    return text.replace(curlyBracesRegex, (matched: string) => {
      this.preserves.push(matched)
      return ' __BRACES__PRESERVER__ '
    })
  }

  /**
   * Restores the curly braces that were previously replaced by a unique string.
   *
   * @param text - The text to restore.
   * @returns The modified text with curly braces restored.
   */
  restore(text: string): string {
    const preservedStringRegex = / ?__BRACES__PRESERVER__ ?/g
    return text.replace(
      preservedStringRegex,
      () => this.preserves.shift() as string,
    )
  }
}
