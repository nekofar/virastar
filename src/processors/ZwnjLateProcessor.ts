import { BaseProcessor } from './BaseProcessor'

export class ZwnjLateProcessor extends BaseProcessor {
  // props @ebraminio/persiantools
  // late checks for zwnjs
  process(text: string): string {
    return (
      text

        // cleans zwnj after characters that don't connect to the next
        .replace(/([إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, "$1")
    );
  }
}