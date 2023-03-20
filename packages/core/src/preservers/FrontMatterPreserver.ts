import { BasePreserver } from './BasePreserver'

export class FrontMatterPreserver extends BasePreserver {
  prepare(text: string) {
    return text.replace(/^---[\S\s]*?---\n/g, (matched) => {
      this.preserves.push(matched)
      return '__FRONTMATTER__PRESERVER__'
    })
  }

  restore(text: string): string {
    return text.replace(
      / ?__FRONTMATTER__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
