import { BasePreserver } from './BasePreserver'

export class CommentPreserver extends BasePreserver {
  prepare(text: string): string {
    return text.replace(/<!--[\s\S]*?-->/g, (matched) => {
      this.preserves.push(matched)
      return ' __COMMENT__PRESERVER__ '
    })
  }

  restore(text: string): string {
    return text.replace(
      / ?__COMMENT__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
