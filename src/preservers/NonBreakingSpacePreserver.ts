import { BasePreserver } from './BasePreserver'

export class NonBreakingSpacePreserver extends BasePreserver {
  prepare(text: string): string {
    return text.replace(/&nbsp;|&#160;/gi, (matched) => {
      this.preserves.push(matched)
      return ' __NBSPS__PRESERVER__ '
    })
  }

  restore(text: string): string {
    return text.replace(
      / ?__NBSPS__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
