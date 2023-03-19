import { BasePreserver } from './BasePreserver'

export class CurlyBracesPreserver extends BasePreserver {
  prepare(text: string): string {
    return text.replace(/(\{.*?})/g, (matched) => {
      this.preserves.push(matched)
      return ' __BRACES__PRESERVER__ '
    })
  }

  restore(text: string): string {
    return text.replace(
      / ?__BRACES__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
