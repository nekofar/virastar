import { BasePreserver } from './BasePreserver'

export class HtmlPreserver extends BasePreserver {
  prepare(text: string): string {
    return text.replace(/<\/?[a-z][^>]*?>/gi, (matched) => {
      this, this.preserves.push(matched)
      return ' __HTML__PRESERVER__ '
    })
  }

  restore(text: string): string {
    return text.replace(
      / ?__HTML__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
