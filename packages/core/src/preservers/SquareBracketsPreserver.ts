import { BasePreserver } from './BasePreserver'

export class SquareBracketsPreserver extends BasePreserver {
  prepare(text: string): string {
    return text.replace(/(\[.*?])/g, (matched) => {
      this.preserves.push(matched)
      return ' __BRACKETS__PRESERVER__ '
    })
  }

  restore(text: string): string {
    return text.replace(
      / ?__BRACKETS__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
