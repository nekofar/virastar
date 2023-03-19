import { BasePreserver } from "./BasePreserver";

export class HtmlEntityPreserver extends BasePreserver {

  prepare(text: string): string {
    return text.replace(/&(#?[^;\W]+;?)/g,  (matched) => {
      this.preserves.push(matched)
      return ' __ENTITIES__PRESERVER__ '
    });
  }

  restore(text: string): string {
    return text.replace(
      / ?__ENTITIES__PRESERVER__ ?/g,
      () => this.preserves.shift() as string,
    )
  }
}
