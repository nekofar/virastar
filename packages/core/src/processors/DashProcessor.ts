import type { BaseProcessor } from './BaseProcessor'

/**
 * A class for processing dashes in a given text.
 */
export class DashProcessor implements BaseProcessor {
  /**
   * Replaces triple and double dashes with mdash and ndash respectively.
   * @param text The text to fix.
   * @returns The fixed text.
   */
  public process(text: string): string {
    return (
      text
        // Replaces triple dash with mdash.
        .replace(/-{3}/g, '\u2014')

        // Replaces double dash with ndash.
        .replace(/-{2}/g, '\u2013')
    )
  }
}
