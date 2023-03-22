import { Virastar } from './index'
import { sprintf } from 'sprintf-js'

// demo default options
const options = {
  removeLeadingAndTrailingSpaces: false,
  cleanupExtraMarks: false,
  cleanupKashidas: false,
  cleanup_line_breaks: false,
  cleanupRightToLeftMarks: false,
  cleanupSpacing: false,
  cleanupZeroWidthNonJoiners: false,
  decodeHtmlEntities: false,
  replaceArabicNumbers: false,
  replaceDashes: false,
  replaceDiacritics: false,
  replaceEnglishNumbers: false,
  replaceEnglishQuotesPairs: false,
  replaceEnglishQuotes: false,
  replaceHamzeh: false,
  replaceHamzehArabic: false,
  replaceMiscNonPersianChars: false,
  replaceMiscSpacing: false,
  replaceNumeralSymbols: false,
  replacePrefixSpacing: false,
  replacePersianGlyphs: false,
  replacePunctuations: false,
  replaceQuestionMarks: false,
  replaceSpacingForBracesAndQuotes: false,
  removeSpacingForPunctuations: false,
  replaceSuffixMisc: false,
  fix_suffix_spacing: false,
  normalizeThreeDots: false,
  normalizeKashidas: false,
  normalizeMarkDownBraces: false,
  normalizeMarkDownLists: false,
  normalizeJalaliDates: false,
  normalizeEllipsis: false,
  normalizeEndOfLines: false,
  preserveCurlyBraces: false,
  preserveSquareBrackets: false,
  preserveHtmlComments: false,
  preserveHtmlEntities: false,
  preserveFrontMatter: false,
  preserveHtmlTags: false,
  preserveNonBreakingSpaces: false,
  preserveUris: false,
  removeDiacritics: false,
  skip_markdown_ordered_lists_numbers_conversion: false,
}

describe('Virastar', () => {
  let virastar: Virastar

  beforeEach(() => {
    virastar = new Virastar()
  })

  describe('#cleanup()', () => {
    it('should cleanup simple sentences', () => {
      expect(
        virastar.process(
          'ويراستار به شما كمك مي كند تا متون فارسي زيبا تر و درست تري بنويسيد .',
          {},
        ),
      ).toBe(
        'ویراستار به شما کمک می‌کند تا متون فارسی زیباتر و درست‌تری بنویسید.',
      )

      expect(
        virastar.process(
          'ويراستار به طور پيش فرض اين کار ها را انجام می دهد :',
          {},
        ),
      ).toBe('ویراستار به طور پیش فرض این کارها را انجام می‌دهد:')
    })

    it('should cleanup simple sentences #1', () => {
      expect(
        virastar.process(
          '1. نویسه های عربي را به فارسی تبديل مي کند.  مثلا كاف و ياي عربي .',
          {},
        ),
      ).toBe('۱. نویسه‌های عربی را به فارسی تبدیل می‌کند. مثلا کاف و یای عربی.')
    })

    it('should cleanup simple sentences #2', () => {
      expect(
        virastar.process(
          '2. نویسه های انگليسي رايج در تايپ فارسي را به معادل صحيح فارسي آن تبدیل می کند, مثلا تبدیل کامای انگلیسی به ویرگول (,), يا نقطه ویرگول به جای semicolon (;) و یا استفاده از "گيومه های فارسي"',
          {},
        ),
      ).toBe(
        '۲. نویسه‌های انگلیسی رایج در تایپ فارسی را به معادل صحیح فارسی آن تبدیل می‌کند، مثلا تبدیل کامای انگلیسی به ویرگول (،)، یا نقطه ویرگول به جای semicolon (؛) و یا استفاده از «گیومه‌های فارسی»',
      )
    })

    it('should cleanup simple sentences #3', () => {
      expect(
        virastar.process(
          '3. اعداد عربي و انگليسي و علائم رياضی را به معادل فارسی آن ها تبديل مي کند.    مثلا  :  12%  456',
          {},
        ),
      ).toBe(
        '۳. اعداد عربی و انگلیسی و علائم ریاضی را به معادل فارسی آن‌ها تبدیل می‌کند. مثلا: ۱۲٪ ۴۵۶',
      )
    })

    it('should cleanup simple sentences #4', () => {
      expect(
        virastar.process(
          '4. سه نقطه را به نويسه صحيح آن که تنها يك نويسه است تبديل کرده و فاصله گذاري آن را اصلاح مي کند ...',
          {},
        ),
      ).toBe(
        '۴. سه نقطه را به نویسه صحیح آن که تنها یک نویسه است تبدیل کرده و فاصله گذاری آن را اصلاح می‌کند…',
      )
    })

    it('should cleanup simple sentences #5', () => {
      expect(
        virastar.process(
          '5. در ترکيباتي مانند \'\'خانه ي پدری\'\' که  با "ه" تمام می‌شوند نشانه "ی" كسره ی اضافه را به "هٔ" تبديل می كند.',
          {},
        ),
      ).toBe(
        '۵. در ترکیباتی مانند «خانهٔ پدری» که با «ه» تمام می‌شوند نشانه «ی» کسرهٔ اضافه را به «هٔ» تبدیل می‌کند.',
      )
    })

    it('should cleanup simple sentences #6', () => {
      expect(
        virastar.process(
          '6. دو علامت منهاي پي در پي را به خط کشيده کوتاه (--) و سه علامت منهاي پي در پي را به خط کشیده بلند (---) تبديل مي كند .',
          {},
        ),
      ).toBe(
        '۶. دو علامت منهای پی در پی را به خط کشیده کوتاه (–) و سه علامت منهای پی در پی را به خط کشیده بلند (—) تبدیل می‌کند.',
      )
    })

    it('should cleanup simple sentences #7', () => {
      expect(
        virastar.process(
          '7. فاصله گذاری را تصحيح مي کند . بين هر کلمه تنها یک فاصله و بین پیشوندها و پسوندهاي مانند "مي","تر"و"ترین"  يک نيم فاصله قرار مي دهد.  بین ویرگول یا نقطه و کلمه قبل آن فاصله را حذف می کند.',
          {},
        ),
      ).toBe(
        '۷. فاصله گذاری را تصحیح می‌کند. بین هر کلمه تنها یک فاصله و بین پیشوندها و پسوندهای مانند «می»، «تر» و «ترین» یک نیم فاصله قرار می‌دهد. بین ویرگول یا نقطه و کلمه قبل آن فاصله را حذف می‌کند.',
      )
    })

    it('should cleanup simple sentences #8', () => {
      expect(
        virastar.process(
          '8. فاصله گذاری را برای متون بین "  گیومه  " , {    آکولاد   }  , [   کروشه  ]  و ( پرانتز    ) تنظيم مي کند .',
          {},
        ),
      ).toBe(
        '۸. فاصله گذاری را برای متون بین «گیومه»، {آکولاد}، [کروشه] و (پرانتز) تنظیم می‌کند.',
      )
    })

    it('should cleanup simple sentences #9', () => {
      expect(
        virastar.process(
          '9. علامت تعحب و سوال اضافی را حذف مي کند؟؟؟!!!!!!!',
          {},
        ),
      ).toBe('۹. علامت تعحب و سوال اضافی را حذف می‌کند؟!')
    })

    it('should replace kashidas to ndash in parenthetic', () => {
      expect(
        virastar.process(
          'ـ که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم ـ',
          {},
        ),
      ).toBe('– که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم –')
    })

    it('should not put space after dots in numbers', () => {
      expect(
        virastar.process(
          'پوسته دوهزارونوزده، حداقل به نسخه وردپرس 4.7 نیاز دارد. شما نسخه %s را اجرا می کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.',
          {},
        ),
      ).toBe(
        'پوسته دوهزارونوزده، حداقل به نسخه وردپرس ۴٫۷ نیاز دارد. شما نسخه %s را اجرا می‌کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.',
      )
    })

    it('should not replace sprintf directives', () => {
      expect(
        virastar.process(
          'این افزونه به php نسخه "%1$s" نياز دارد. شما از نسخه (%2$s) استفاده می کنید. لطفاً پس از ارتقا دوباره تلاش کنید.',
          {},
        ),
      ).toBe(
        'این افزونه به php نسخه «%1$s» نیاز دارد. شما از نسخه (%2$s) استفاده می‌کنید. لطفاً پس از ارتقا دوباره تلاش کنید.',
      )
    })

    it('should converts back html named character references', () => {
      expect(virastar.process('&quot;گيومه های فارسي&quot;')).toBe(
        '«گیومه‌های فارسی»',
      )
      expect(virastar.process('&apos;گيومه های فارسي&apos;')).toBe(
        '«گیومه‌های فارسی»',
      )
    })

    // @REF: https://github.com/aziz/virastar/blob/master/spec/virastar_spec.rb

    it('should replace Arabic kaf with its Persian equivalent', () => {
      expect(virastar.process('ك')).toBe('ک')
      expect(virastar.process('كمك')).toBe('کمک')
    })

    it('should replace Arabic Yeh with its Persian equivalent', () => {
      expect(virastar.process('ي')).toBe('ی')
      expect(virastar.process('بيني')).toBe('بینی')
    })

    it('should replace Arabic numbers with their Persian equivalent', () => {
      expect(virastar.process('٠١٢٣٤٥٦٧٨٩')).toBe('۰۱۲۳۴۵۶۷۸۹')
    })

    it('should replace English numbers with their Persian equivalent', () => {
      expect(virastar.process('0123456789')).toBe('۰۱۲۳۴۵۶۷۸۹')
    })

    it('should replace English comma and semicolon with their Persian equivalent', () => {
      expect(virastar.process(';,')).toBe('؛ ،')
    })

    it('should correct :;,.?! spacing (one space after and no space before)', () => {
      expect(virastar.process('گفت : سلام')).toBe('گفت: سلام')
    })

    it('should replace English quotes with their Persian equivalent', () => {
      expect(virastar.process("''تست''")).toBe('«تست»')
      expect(virastar.process("'تست'")).toBe('«تست»')
      expect(virastar.process('`تست`')).toBe('«تست»')
      expect(virastar.process('``تست``')).toBe('«تست»')
      expect(virastar.process('"گفت: سلام"')).toBe('«گفت: سلام»')
      expect(virastar.process('"این" یا "آن"')).toBe('«این» یا «آن»') // not greedy
    })

    it('should convert ه ی to هٔ', () => {
      expect(virastar.process('خانه ی ما')).toBe('خانهٔ ما')
      expect(virastar.process('خانه ی ما')).toBe('خانهٔ ما')
      expect(virastar.process('خانه ي ما')).toBe('خانهٔ ما')
    })

    it('should replace double dash to ndash and triple dash to mdash', () => {
      expect(virastar.process('--')).toBe('–')
      expect(virastar.process('---')).toBe('—')
    })

    it('should replace more than one space with just a single one', () => {
      expect(virastar.process('  سلام   جهان ،  من ویراستار هستم!')).toBe(
        'سلام جهان، من ویراستار هستم!',
      )
    })

    it('should fix spacing for () [] {}  “” «» (one space outside, no space inside)', () => {
      const templates = [
        ['this is%s a test%s', 'this is %sa test%s'],
        ['this is %s a test  %s', 'this is %sa test%s'],
        ['this is  %s  a test %s  yeah!', 'this is %sa test%s yeah!'],
        ['this is   %sa test %s  yeah!', 'this is %sa test%s yeah!'],
      ]

      // matched brackets
      const matched = [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        // ['“', '”'],
        ['«', '»'],
      ]

      for (const pair in matched) {
        for (const str in templates) {
          expect(
            virastar.process(
              sprintf(
                templates[str]![0]!,
                matched[pair]![0],
                matched[pair]![1],
              ),
            ),
          ).toBe(
            sprintf(templates[str]![1]!, matched[pair]![0], matched[pair]![1]),
          )
        }
      }

      // mismatched brackets
      const mismatched = [
        ['(', ']'],
        ['[', ')'],
        ['{', '”'],
        ['(', '}'],
        ['«', ']'],
      ]
      const templates2 = [
        "mismatched brackets%s don't apply%s",
        "mismatched brackets %s don't apply %s",
        "mismatched brackets %s don't apply %s yeah!",
        "mismatched brackets %sdon't apply %s yeah!",
      ]

      for (let pair2 in mismatched) {
        for (let str2 in templates2) {
          const template = sprintf(
            templates2[str2]!,
            mismatched[pair2]![0],
            mismatched[pair2]![1],
          )
          expect(virastar.process(template)).toBe(template)
        }
      }
    })

    it('should replace English percent sign to its Persian equivalent', () => {
      expect(virastar.process('96%')).toBe('۹۶٪')
    })

    it.skip('should remove spaces before and after line breaks', () => {
      expect(virastar.process('this is \n \n \n     \n a test')).toBe(
        'this is \n\na test',
      )
      expect(virastar.process('this is\n\n\n\na test')).toBe(
        'this is\n\na test',
      )
      expect(virastar.process('this is \n\n\n    a test')).toBe(
        'this is \n\na test',
      )
    })

    it.skip('should remove more that two line breaks', () => {
      expect(virastar.process('this is \n \n \n     \n a test')).toBe(
        'this is \n\na test',
      )
      expect(virastar.process('this is\n\n\n\na test')).toBe(
        'this is\n\na test',
      )
      expect(virastar.process('this is \n\n\n    a test')).toBe(
        'this is \n\na test',
      )
    })

    it('should not replace line breaks and should remove spaces after line break', () => {
      expect(virastar.process('this is \n  a test')).toBe('this is \na test')
    })

    it('should put zwnj between word and prefix/suffix (ha haye* tar* tarin mi* nemi*)', () => {
      expect(virastar.process('ما می توانیم')).toBe('ما می‌توانیم')
      expect(virastar.process('ما نمی توانیم')).toBe('ما نمی‌توانیم')
      expect(virastar.process('این بهترین کتاب ها است')).toBe(
        'این بهترین کتاب‌ها است',
      )
      expect(virastar.process('بزرگ تری و قدرتمند ترین زبان های دنیا')).toBe(
        'بزرگ‌تری و قدرتمندترین زبان‌های دنیا',
      )
    })

    it('should not replace English numbers in English phrases', () => {
      expect(virastar.process('عزیز ATM74 در IBM-96 085 B 95BCS')).toBe(
        'عزیز ATM74 در IBM-96 ۰۸۵ B 95BCS',
      )
    })

    it('should not create spacing for something like (,)', () => {
      expect(virastar.process('this is (,) comma')).toBe('this is (،) comma')
    })

    it('should not puts space after time colon separator', () => {
      expect(virastar.process('12:34')).toBe('۱۲:۳۴')
    })

    it.skip('should not destroy URLs', () => {
      expect(virastar.process('https://virastar.brothersincode.ir')).toBe(
        'https://virastar.brothersincode.ir',
      )
      expect(
        virastar.process(
          'https://virastar.brothersincode.ir\nhttp://twitter.com',
        ),
      ).toBe('https://virastar.brothersincode.ir\nhttp://twitter.com')
    })

    it('should not replace line breaks when the line ends with quotes', () => {
      let actual = 'salam "khoobi" \n chetori'
      let output = 'salam «khoobi» \nchetori'
      expect(virastar.process(actual)).toBe(output)
    })

    it("should not put space after quotes, {}, () or [] if there's ,.; just after that", () => {
      let actual = '«این», {این}, (این), [این] or {این}. بعضی وقت ها (این).'
      let output = '«این»، {این}، (این)، [این] or {این}. بعضی وقت‌ها (این).'
      expect(virastar.process(actual)).toBe(output)
    })

    it('should be able to convert numbers with dashes', () => {
      expect(virastar.process('1- salam')).toBe('۱- salam')
    })

    it('aggressive editing', () => {
      expect(virastar.process('salam!!!')).toBe('salam!')
      expect(virastar.process('چطور؟؟؟')).toBe('چطور؟')
    })

    it('should remove all kashida', () => {
      expect(virastar.process('سلامـــت')).toBe('سلامت')
      expect(virastar.process('لــعل سـلـسـبیــل')).toBe('لعل سلسبیل')
    })
  })

  describe('#cleanup(): Equals', () => {
    it('should preserve certain strings', () => {
      const equals = [
        '![alt name](https://example.com/media/image.jpg)',
        '[![alt name](https://example.com/media/image.jpg)](https://example.com/media/image.jpg)',
        '[![](https://example.com/media/image.jpg)](https://example.com/media/image.jpg)',
        '[![](https://example.com/media/image.jpg)](https://example.com/media/image.jpg) [![](https://example.com/media/image.jpg)](https://example.com/media/image.jpg)',
        '[![](https://upload.wikimedia.org/wikipedia/commons/0/0c/Nastaliq-proportions.jpg)](https://en.wikipedia.org/wiki/File:Nastaliq-proportions.jpg)',
      ]

      for (let equal in equals) {
        expect(virastar.process(equals[equal]!)).toBe(equals[equal])
      }
    })
  })

  describe('#cleanup(): Additional', () => {
    it('should preserve all HTML tags', () => {
      expect(
        virastar.process(
          '<strong title="نباید تغییر کند!!!!!">سلام جهان</strong>',
        ),
      ).toBe('<strong title="نباید تغییر کند!!!!!">سلام جهان</strong>')
    })

    it('should fix heh plus standalone hamza', () => {
      expect(virastar.process('از غم به هر بهانهء ممكن عبور كن !')).toBe(
        'از غم به هر بهانهٔ ممکن عبور کن!',
      ) // without space
      expect(virastar.process('از غم به هر بهانه ء ممكن عبور كن !')).toBe(
        'از غم به هر بهانهٔ ممکن عبور کن!',
      ) // with space
    })

    it('should fix heh plus hamza into ye', () => {
      expect(virastar.process('خانه‌ٔ پدری', { replaceHamzeh: false })).toBe(
        'خانه‌ی پدری',
      )
      expect(virastar.process('خانه ء پدری', { replaceHamzeh: false })).toBe(
        'خانه‌ی پدری',
      )
      expect(virastar.process('خانه ي پدری', { replaceHamzeh: false })).toBe(
        'خانه‌ی پدری',
      )
      expect(virastar.process('خانه‌ی پدری', { replaceHamzeh: false })).toBe(
        'خانه‌ی پدری',
      ) // no change
    })

    it('should convert all soft hyphens into zwnj', () => {
      expect(
        virastar.process('عادت به تنهایی... این دیگر از آن حرف­هاست! '),
      ).toBe('عادت به تنهایی… این دیگر از آن حرف‌هاست!')
    })

    it('should normalize ellipsis', () => {
      expect(virastar.process('...…...')).toBe('…')
    })

    it('should normalize question/exclamation marks', () => {
      expect(
        virastar.process('عادت به تنهایی... این دیگر از آن حرف­هاست!!!?'),
      ).toBe('عادت به تنهایی… این دیگر از آن حرف‌هاست؟!')
      expect(virastar.process('متن فارسی؟!')).toBe('متن فارسی؟!')
      expect(virastar.process('متن فارسی!؟')).toBe('متن فارسی؟!')
      expect(virastar.process('متن فارسی?!')).toBe('متن فارسی؟!')
      expect(virastar.process('متن فارسی!?')).toBe('متن فارسی؟!')
      expect(virastar.process('؟!')).toBe('؟!')
      expect(virastar.process('!؟')).toBe('؟!')
      expect(virastar.process('?!')).toBe('؟!')
      expect(virastar.process('!?')).toBe('؟!')
      expect(virastar.process('کتاب????!!!!')).toBe('کتاب؟!')
      expect(virastar.process('کتاب!!!!?????')).toBe('کتاب؟!')
      expect(virastar.process('کتاب؟؟؟!!!!')).toBe('کتاب؟!')
      expect(virastar.process('کتاب!!!!!!!!!؟؟؟؟؟؟؟؟')).toBe('کتاب؟!')
      expect(virastar.process('کتاب!!!!!!')).toBe('کتاب!')
      expect(virastar.process('کتاب؟؟؟؟')).toBe('کتاب؟')
      expect(virastar.process('کتاب?????')).toBe('کتاب؟')
    })

    it('extra: fixSuffixSpacing()', () => {
      expect(
        virastar.process('"و من هم به خاطر جلب اعتماد او پذیرفته ام"'),
      ).toBe('«و من هم به خاطر جلب اعتماد او پذیرفته‌ام»') // within quotes
      expect(
        virastar.process('و من هم به خاطر جلب اعتماد او پذیرفته ام.'),
      ).toBe('و من هم به خاطر جلب اعتماد او پذیرفته‌ام.') // followed by dot
      expect(
        virastar.process('و من هم به خاطر جلب اعتماد او پذیرفته ام!'),
      ).toBe('و من هم به خاطر جلب اعتماد او پذیرفته‌ام!') // followed by exclamation
      expect(
        virastar.process('و من هم به خاطر جلب اعتماد او پذیرفته ام؟'),
      ).toBe('و من هم به خاطر جلب اعتماد او پذیرفته‌ام؟') // followed by question
      expect(virastar.process('و من هم به خاطر جلب اعتماد او پذیرفته ام')).toBe(
        'و من هم به خاطر جلب اعتماد او پذیرفته‌ام',
      ) // as last word (with the help of padding)

      expect(
        virastar.process(
          'و به چلو ماهی و باسلوق و مترادف کرده ایم، محض خالی نبودن عریضه دیوان حافظ را هم تنگش زده ایم. سوءتفاهم نشود.',
        ),
      ).toBe(
        'و به چلو ماهی و باسلوق و مترادف کرده‌ایم، محض خالی نبودن عریضه دیوان حافظ را هم تنگش زده‌ایم. سوءتفاهم نشود.',
      )
      expect(
        virastar.process(
          'عرضم این است که ما در بیداری نیز خود را فریب می دهیم و به شکم چرانی مان صبغه فرهیختگی می زنیم.',
        ),
      ).toBe(
        'عرضم این است که ما در بیداری نیز خود را فریب می‌دهیم و به شکم چرانی‌مان صبغه فرهیختگی می‌زنیم.',
      )
      expect(virastar.process('به خواب های تان دقت کنید.')).toBe(
        'به خواب‌های‌تان دقت کنید.',
      )
    })

    it('extra: fixSuffixMisc()', () => {
      expect(virastar.process('خانه‌يی بر روی آب')).toBe('خانه‌ای بر روی آب')
      expect(virastar.process('خانه‌ئی بر روی آب')).toBe('خانه‌ای بر روی آب')
      expect(virastar.process('خانه‌یی بر روی آب')).toBe('خانه‌ای بر روی آب')
    })

    it('extra: fixDiacritics():‌ cleans more than one diacritic characters', () => {
      expect(virastar.process('لطفاًً')).toBe('لطفاً')
    })

    it('extra: fixNumeralSymbols(): replaces english percent signs', () => {
      expect(virastar.process('۹۶%')).toBe('۹۶٪')
    })

    it('extra: fixNumeralSymbols(): replaces dots between numbers into decimal separator', () => {
      expect(virastar.process('۱۲.۵۶')).toBe('۱۲٫۵۶')
    })

    it('extra: fixNumeralSymbols(): replaces commas between numbers into thousands separator', () => {
      expect(virastar.process('۱۲,۵۴۳')).toBe('۱۲٬۵۴۳')
    })

    it('extra: cleanupKashidas(): converts kashida between numbers to ndash', () => {
      expect(virastar.process('۱۱ـ۲۳')).toBe('۱۱–۲۳')
    })

    it('extra: kashidasAsParenthetic(): replaces kashidas to ndash in parenthetic', () => {
      expect(
        virastar.process('ـکه همواره به فتوحات پادشاهان خویش در هند می‌بالیمـ'),
      ).toBe('–که همواره به فتوحات پادشاهان خویش در هند می‌بالیم–')
      expect(
        virastar.process(
          'ما مردم افغانستان ـکه همواره به فتوحات پادشاهان خویش در هند می‌بالیمـ شاید حالا که دو دهه رنج تهاجم بیگانگان را چشیده‌ایم‌، بتوانیم درد و رنج مردم هند را در دوران لشکرکشی‌های اجدادمان دریابیم‌.',
        ),
      ).toBe(
        'ما مردم افغانستان –که همواره به فتوحات پادشاهان خویش در هند می‌بالیم– شاید حالا که دو دهه رنج تهاجم بیگانگان را چشیده‌ایم، بتوانیم درد و رنج مردم هند را در دوران لشکرکشی‌های اجدادمان دریابیم.',
      )
    })

    it('extra: fixHamzehArabic(): converts arabic hamza', () => {
      expect(
        virastar.process('آن دسته از علایم که مشخص‌کنندة انتهای جمله', {
          replaceHamzehArabic: true,
        }),
      ).toBe('آن دسته از علایم که مشخص‌کنندهٔ انتهای جمله')
      expect(
        virastar.process('آن دسته از علایم که مشخص‌کنندة انتهای جمله', {
          replaceHamzehArabic: true,
          replaceHamzeh: false,
        }),
      ).toBe('آن دسته از علایم که مشخص‌کننده‌ی انتهای جمله')
    })

    it('extra: fixThreeDots(): removes space between dots/replaces three dots with ellipsis character', () => {
      expect(virastar.process('...')).toBe('…')
      expect(virastar.process('......')).toBe('…')
      expect(virastar.process('. . . .   ...   ..... . . . .')).toBe('…')
      expect(virastar.process('خداحافظ ... به به')).toBe('خداحافظ… به به')
    })

    it('extra: normalizeDates(): reorders date parts with slash as delimiter', () => {
      expect(virastar.process('23/10/1355')).toBe('۱۳۵۵/۱۰/۲۳')
      expect(virastar.process('3/1/1355')).toBe('۱۳۵۵/۱/۳')
    })

    it('extra: removeDiacritics(): removes all diacritic characters', () => {
      expect(
        virastar.process(
          'اذا عَمَّتِ الْبُلْدانَ الْفِتَنُ فَعَلَیکمْ بِقُمْ وَحَوالیها وَنَواحیها فَانَ الْبَلاءَ مَدْفُوعٌ عَنْها',
          { removeDiacritics: true },
        ),
      ).toBe(
        'اذا عمت البلدان الفتن فعلیکم بقم وحوالیها ونواحیها فان البلاء مدفوع عنها',
      )
    })
  })

  describe('cleanup', () => {
    it('should return the same string when all cleanup options are disabled', () => {
      const input = '&nbsp;امروز&nbsp;۲۰&nbsp;مرداد&nbsp;۱۴۰۰&nbsp;'
      const expected = '&nbsp;امروز&nbsp;۲۰&nbsp;مرداد&nbsp;۱۴۰۰&nbsp;'

      const result = virastar.process(input, {
        ...options,
      })

      expect(result).toBe(expected)
    })

    it('should preserve strings inside curly braces when preserveCurlyBraces is true', () => {
      const input = '{سلام}، این {جمله} یک {تست} است.'
      const expected = '{سلام}، این {جمله} یک {تست} است.'
      const result = virastar.process(input, {
        ...options,
        preserveCurlyBraces: true,
      })
      expect(result).toBe(expected)
    })

    it('should preserve strings inside brackets when preserveSquareBrackets is true', () => {
      const input = '[سلام]، این [جمله] یک [تست] است.'
      const expected = '[سلام]، این [جمله] یک [تست] است.'
      const result = virastar.process(input, {
        ...options,
        preserveSquareBrackets: true,
      })
      expect(result).toBe(expected)
    })

    it('should preserve and restore HTML comments', () => {
      const input = `
      <div>
        <!-- This is a comment -->
        <p>Hello world</p>
        <!-- Another comment -->
      </div>
    `
      const expected = `
      <div>
        <!-- This is a comment -->
        <p>Hello world</p>
        <!-- Another comment -->
      </div>
    `

      const result = virastar.process(input, {
        ...options,
        preserveHtmlComments: true,
      })

      expect(result).toBe(expected)
    })

    it('should bring back all preserved html entities', () => {
      const input = 'سلام &nbsp; جهان'
      const expected = 'سلام &nbsp; جهان'

      const result = virastar.process(input, {
        ...options,
        preserveHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })

    it('should preserve frontmatter data when preserveFrontMatter is true', () => {
      const input = `---
title: My Awesome Title
---

این یک تست است.`
      const expected = `---
title: My Awesome Title
---

این یک تست است.`

      const result = virastar.process(input, {
        ...options,
        preserveFrontMatter: true,
      })

      expect(result).toBe(expected)
    })

    it('should preserve all HTML tags when preserveHtmlTags option is enabled', () => {
      const input =
        '<p>متنی <strong>با</strong> <em>تگ‌های</em> <a href="#">HTML</a></p>'
      const expected =
        '<p>متنی <strong>با</strong> <em>تگ‌های</em> <a href="#">HTML</a></p>'

      const result = virastar.process(input, {
        ...options,
        preserveHtmlTags: true,
      })

      expect(result).toBe(expected)
    })

    it('should preserve all no-break space entities when `preserveNonBreakingSpaces` is true', () => {
      const input =
        'این یک &nbsp; متن است که شامل فضای بین‌کلمه‌ای نیز می‌باشد.'
      const expected =
        'این یک &nbsp; متن است که شامل فضای بین‌کلمه‌ای نیز می‌باشد.'

      const result = virastar.process(input, {
        ...options,
        preserveNonBreakingSpaces: true,
        decodeHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })

    it('should bring back URIs in text', () => {
      const input = 'جستجوی در اینترنت: https://fa.wikipedia.org'
      const expected = 'جستجوی در اینترنت: https://fa.wikipedia.org'

      const result = virastar.process(input, {
        ...options,
        preserveUris: true,
      })

      expect(result).toBe(expected)
    })

    it('should preserve Markdown links in text', () => {
      const input =
        'برای خواندن بیشتر، به [ویکی‌پدیا](https://fa.wikipedia.org) مراجعه کنید.'
      const expected =
        'برای خواندن بیشتر، به [ویکی‌پدیا](https://fa.wikipedia.org) مراجعه کنید.'

      const result = virastar.process(input, {
        ...options,
        preserveUris: true,
      })

      expect(result).toBe(expected)
    })

    it('should return matched text when skip_markdown_ordered_lists_numbers_conversion is true', () => {
      const input = 'سومین مورد\n1. خریداری\n2. نصب\n3. راه اندازی'
      const expected = 'سومین مورد\n1. خریداری\n2. نصب\n3. راه اندازی'

      const result = virastar.process(input, {
        ...options,
        skip_markdown_ordered_lists_numbers_conversion: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('removeLeadingAndTrailingSpaces', () => {
    it('should remove leading and trailing whitespace and newlines', () => {
      const input = '  \n\t۱۲۳۴۵۶۷۸۹۰  \n\t'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        removeLeadingAndTrailingSpaces: true,
      })

      expect(result).toBe(expected)
    })

    it('should only remove leading whitespace and newlines when inside the text', () => {
      const input = '  \n\t۱۲۳  ۴۵ ۶۷۸۹۰  \n\t'
      const expected = '۱۲۳  ۴۵ ۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        removeLeadingAndTrailingSpaces: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove all kinds of directionality marks', () => {
      const input = '\u200f۱۲۳۴۵۶۷۸۹۰\u200f'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        removeLeadingAndTrailingSpaces: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove zwnj', () => {
      const input = '‌۱۲۳۴۵۶۷۸۹۰‌'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        removeLeadingAndTrailingSpaces: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove nbsp', () => {
      const input = '۱۲۳۴۵۶۷۸۹۰ '
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        removeLeadingAndTrailingSpaces: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupExtraMarks', () => {
    it('should remove extra marks from the text', () => {
      const input = 'سلام؟؟؟! چطورید؟؟!'
      const expected = 'سلام؟! چطورید؟!'

      const result = virastar.process(input, {
        ...options,
        cleanupExtraMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace multiple exclamation marks with a single one', () => {
      const input = 'وای! خدایا!!'
      const expected = 'وای! خدایا!'

      const result = virastar.process(input, {
        ...options,
        cleanupExtraMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace multiple question marks with a single one', () => {
      const input = '؟؟؟چرا'
      const expected = '؟چرا'

      const result = virastar.process(input, {
        ...options,
        cleanupExtraMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should reorder consecutive marks', () => {
      const input = 'چطوری!؟'
      const expected = 'چطوری؟!'

      const result = virastar.process(input, {
        ...options,
        cleanupExtraMarks: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupKashidas', () => {
    it('should replace kashidas between numbers with ndash', () => {
      const input = '۱۲۳۴۵۶۷۸۹۰ــــــ۱۲۳۴۵۶۷۸۹۰'
      const expected = '۱۲۳۴۵۶۷۸۹۰–۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        cleanupKashidas: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove all kashidas between non-whitespace characters', () => {
      const input = 'تـحـت مـجـازیـت هـوا'
      const expected = 'تحت مجازیت هوا'

      const result = virastar.process(input, {
        ...options,
        cleanupKashidas: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupLineBreaks', () => {
    it('should replace more than two contiguous line-breaks with two line-breaks', () => {
      const input = 'خط ۱\n\n\nخط ۲\n\n\n\n\n\n\n\n\n\n\n\n\nخط ۳'
      const expected = 'خط ۱\n\nخط ۲\n\nخط ۳'

      const result = virastar.process(input, {
        ...options,
        cleanupLineBreaks: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace less than two contiguous line-breaks', () => {
      const input = 'خط ۱\nخط ۲\n\n\nخط ۳'
      const expected = 'خط ۱\nخط ۲\n\nخط ۳'

      const result = virastar.process(input, {
        ...options,
        cleanupLineBreaks: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace a single line-break', () => {
      const input = 'متن با یک خط\n'
      const expected = 'متن با یک خط\n'

      const result = virastar.process(input, {
        ...options,
        cleanupLineBreaks: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace when there is no contiguous line-breaks', () => {
      const input = 'متن بدون خطی\nبا خطی دیگر\n'
      const expected = 'متن بدون خطی\nبا خطی دیگر\n'

      const result = virastar.process(input, {
        ...options,
        cleanupLineBreaks: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupRLM', () => {
    it('should replace RLM followed by persian character with ZWNJ', () => {
      const input = 'این\u200Fیک متن فارسی است.'
      const expected = 'این\u200cیک متن فارسی است.'

      const result = virastar.process(input, {
        ...options,
        cleanupRightToLeftMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace RLM before latin character with ZWNJ', () => {
      const input = 'This\u200Fis a persian text.'
      const expected = 'This\u200Fis a persian text.'

      const result = virastar.process(input, {
        ...options,
        cleanupRightToLeftMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace RLM before dash with ZWNJ', () => {
      const input = 'یک متن فارسی -\u200F مثال'
      const expected = 'یک متن فارسی -\u200F مثال'

      const result = virastar.process(input, {
        ...options,
        cleanupRightToLeftMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace multiple RLM with ZWNJ', () => {
      const input = 'این\u200Fیک\u200Fمتن فارسی است.'
      const expected = 'این\u200cیک\u200cمتن فارسی است.'

      const result = virastar.process(input, {
        ...options,
        cleanupRightToLeftMarks: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupSpacing', () => {
    it('should replace more than one space with just a single one', () => {
      const input = 'تست    تست. تست  تست\n'
      const expected = 'تست تست. تست تست\n'

      const result = virastar.process(input, {
        ...options,
        cleanupSpacing: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should clean tab/space/zwnj/zwj/nbsp between two new-lines', () => {
      const input = 'تست\n \t \u200c \nتست'
      const expected = 'تست\n\nتست'

      const result = virastar.process(input, {
        ...options,
        cleanupSpacing: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupZWNJ', () => {
    it('should cleanup soft hyphens and multiple zwnj', () => {
      const input =
        'این یک\u00adمتن است که زیاده\u200c\u200c\u200c\u200c\u200c\u200c\u200cاستفاده از زوج نیم\u200cفاصله در آن صورت گرفته است.'
      const expected =
        'این یک\u200cمتن است که زیاده\u200cاستفاده از زوج نیم\u200cفاصله در آن صورت گرفته است.'

      const result = virastar.process(input, {
        ...options,
        cleanupZeroWidthNonJoiners: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should cleanup unnecessary zwnj around words, numbers and punctuations', () => {
      const input =
        'برای آزمایش توانایی \u200c   این علائم [ ] { } ( ) ؛  ،   ؟   " "   در متون پارسی'
      const expected = 'برای آزمایش توانایی این علائم[]{}()؛،؟""در متون پارسی'

      const result = virastar.process(input, {
        ...options,
        cleanupZeroWidthNonJoiners: true,
      })

      expect(result).toBe(expected)
    })

    it('should cleanup unnecessary zwnj on start/end of each line', () => {
      const input =
        '\u200cاین یک متن است که در چندین خط نوشته شده\nاین خط دوم است\nاین خط سوم است\u200c'
      const expected =
        'این یک متن است که در چندین خط نوشته شده\nاین خط دوم است\nاین خط سوم است'

      const result = virastar.process(input, {
        ...options,
        cleanupZeroWidthNonJoiners: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove extra ZWNJ characters before and after English words', () => {
      const input = 'the \u200cbook \u200cis \u200cinteresting.'
      const expected = 'the book is interesting.'

      const result = virastar.process(input, {
        ...options,
        cleanupZeroWidthNonJoiners: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove extra ZWNJ characters before and after numbers', () => {
      const input = '۱۲۳۴۵۶۷۸۹۰ \u200c۱۲۳۴۵۶۷۸۹۰ '
      const expected = '۱۲۳۴۵۶۷۸۹۰ ۱۲۳۴۵۶۷۸۹۰ '

      const result = virastar.process(input, {
        ...options,
        cleanupZeroWidthNonJoiners: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('decodeHTMLEntities', () => {
    it('should decode HTML entities in the given text', () => {
      const input =
        '&#1740;&#1705;&#32;&#1606;&#1605;&#1575;&#1740;&#1588;&zwnj;&#1606;&#1575;&#1605;&#1607;&#32;&#1605;&#1593;&#1585;&#1608;&#1601;&#32;&#1576;&#1607;&#32;&#1605;&#1585;&#1583;&#32;&#1582;&#1575;&#1606;&#1607;&zwnj;&#1583;&#1575;&#1585;&#32;&#1608;&#32;&#1583;&#1608;&#1576;&#1604;&#1607;&zwnj;&#1740;&#32;&#1601;&#1740;&#1604;&#1605;&zwnj;&#1607;&#1575;&#1740;&#32;&#1576;&#1604;&#1606;&#1583;&#32;&#1604;&#1606;&#1711;&#1585;&#1740;'
      const expected =
        'یک نمایش‌نامه معروف به مرد خانه‌دار و دوبله‌ی فیلم‌های بلند لنگری'

      const result = virastar.process(input, {
        ...options,
        decodeHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should decode HTML entities correctly', () => {
      const input =
        'این یک &nbsp;متن است&#x60; با&nbsp;entity ها&nbsp;مختلف. &lt;br&gt;'
      const expected = 'این یک  متن است` با entity ها مختلف. <br>'

      const result = virastar.process(input, {
        ...options,
        decodeHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })

    it('should handle invalid HTML entities', () => {
      const input = 'این یک متن با entity های نامعتبر &invalid; است.'
      const expected = 'این یک متن با entity های نامعتبر &invalid; است.'

      const result = virastar.process(input, {
        ...options,
        decodeHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })

    it('should handle decimal entities', () => {
      const input =
        '&#1587;&#1604;&#1575;&#1605;&#32;&#1583;&#1606;&#1740;&#1575;'
      const expected = 'سلام دنیا'

      const result = virastar.process(input, {
        ...options,
        decodeHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })

    it('should handle hexadecimal entities', () => {
      const input =
        '&#x633;&#x644;&#x627;&#x645;&#x20;&#x62f;&#x646;&#x6cc;&#x627;'
      const expected = 'سلام دنیا'

      const result = virastar.process(input, {
        ...options,
        decodeHtmlEntities: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixArabicNumbers', () => {
    it('should replace Arabic numbers with Persian numbers', () => {
      const input = '۱۲۳٤٥٦۷۸۹٠'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        replaceArabicNumbers: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace anything if there are no Arabic numbers', () => {
      const input = '۱۲۳۴۵۶۷۸۹۰'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.process(input, {
        ...options,
        replaceArabicNumbers: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixDashes', () => {
    it('should replace triple dashes with mdash and double dashes with ndash', () => {
      const input = 'این یک متن است که --- و -- های زیادی دارد.'
      const expected = 'این یک متن است که — و – های زیادی دارد.'

      const result = virastar.process(input, {
        ...options,
        replaceDashes: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixDiacritics', () => {
    it.skip('should fix diacritics and remove spaces before them', () => {
      const input = 'کتَابِت، اینجا خونه است'
      const expected = 'کتابت، اینجا خونه است'

      const result = virastar.process(input, {
        ...options,
        replaceDiacritics: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should fix diacritics and remove zwnj before them', () => {
      const input = 'ما هم‌زَمان بودیم'
      const expected = 'ما همزمان بودیم'

      const result = virastar.process(input, {
        ...options,
        replaceDiacritics: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should fix diacritics and remove multiple diacritics', () => {
      const input = 'کتابتِِِ ِ ِ ِ َ    ؟؟؟؟؟'
      const expected = 'کتابتِ َ    ؟؟؟؟؟'

      const result = virastar.process(input, {
        ...options,
        replaceDiacritics: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixEnglishNumbers', () => {
    it('should replace English numbers with their Persian equivalent', () => {
      const input = '123۴۵6'
      const expected = '۱۲۳۴۵۶'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishNumbers: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace already Persian numbers', () => {
      const input = '۱۲۳۴۵۶'
      const expected = '۱۲۳۴۵۶'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishNumbers: true,
      })

      expect(result).toBe(expected)
    })

    it('should handle empty string', () => {
      const input = ''
      const expected = ''

      const result = virastar.process(input, {
        ...options,
        replaceEnglishNumbers: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixEnglishQuotesPairs', () => {
    it('should replace English quote pairs with their Persian equivalent', () => {
      const input = '“Hello, World!”'
      const expected = '«Hello, World!»'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotesPairs: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace all occurrences of English quote pairs with their Persian equivalent', () => {
      const input = '“Hello, World!” “Welcome to the party.”'
      const expected = '«Hello, World!» «Welcome to the party.»'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotesPairs: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace single quotes or apostrophes', () => {
      const input = "Don't forget to say “Hello, World!”"
      const expected = "Don't forget to say «Hello, World!»"

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotesPairs: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should not replace quotes inside HTML tags', () => {
      const input = '<p>“Hello, World!”</p>'
      const expected = '<p>“Hello, World!”</p>'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotesPairs: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should not replace quotes inside code blocks', () => {
      const input = '```“Hello, World!”```'
      const expected = '```“Hello, World!”```'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotesPairs: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixEnglishQuotes', () => {
    it('should replace double quotes with Persian quotes', () => {
      const input = '"با چشم‌هایی متعجب به یکدیگر نگاه کردند"'
      const expected = '«با چشم‌هایی متعجب به یکدیگر نگاه کردند»'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotes: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace single quotes with Persian quotes', () => {
      const input = `'با چشم‌هایی متعجب به یکدیگر نگاه کردند'`
      const expected = '«با چشم‌هایی متعجب به یکدیگر نگاه کردند»'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotes: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace backticks with Persian quotes', () => {
      const input = `\`با چشم‌هایی متعجب به یکدیگر نگاه کردند\``
      const expected = '«با چشم‌هایی متعجب به یکدیگر نگاه کردند»'

      const result = virastar.process(input, {
        ...options,
        replaceEnglishQuotes: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixHamzehArabic', () => {
    it.skip('should replace arabic hamzeh with هٔ', () => {
      const input = 'تست ة تست' // 'test ة test'
      const expected = 'تست هٔ تست' // 'test هٔ test'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: false,
      })

      expect(result).toBe(expected)
    })

    it.skip('should not replace hamzeh when it is not followed by space, zwnj or tab', () => {
      const input = 'تستة تست' // 'testة test'
      const expected = 'تستة تست' // 'testة test'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should not replace hamzeh when it is at the end of the word', () => {
      const input = 'تستة' // 'testة'
      const expected = 'تستة' // 'testة'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should not replace hamzeh when it is at the beginning of the word', () => {
      const input = 'ةتست' // 'ةtest'
      const expected = 'ةتست' // 'ةtest'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixHamzehArabicAlt', () => {
    it.skip('should replace Arabic Hamzeh ة with ه‌ی in the text', () => {
      const input = 'ماشینة ورزشة'
      const expectedOutput = 'ماشینه‌ی ورزشه‌ی'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expectedOutput)
    })

    it.skip('should not replace Hamzeh ة at the end of the word', () => {
      const input = 'دندانپزشكة'
      const expectedOutput = 'دندانپزشكه‌ی'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expectedOutput)
    })

    it.skip('should not replace Hamzeh ة with no space before it', () => {
      const input = 'بانكة'
      const expectedOutput = 'بانكه‌ی'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expectedOutput)
    })

    it.skip('should not replace Hamzeh ة with no space after it', () => {
      const input = 'مدرسة'
      const expectedOutput = 'مدرسه‌ی'

      const result = virastar.process(input, {
        ...options,
        replaceHamzeh: true,
        replaceHamzehArabic: true,
      })

      expect(result).toBe(expectedOutput)
    })
  })

  describe('fixMiscNonPersianChars', () => {
    it.skip('should replace misc non-Persian characters with their Persian equivalents', () => {
      const input = 'كڪيىۍېہە'
      const expected = 'ککییییههه'

      const result = virastar.process(input, {
        ...options,
        replaceMiscNonPersianChars: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixMiscSpacing', () => {
    it('should remove space before parentheses when given misc cases', () => {
      const input = 'مثال (ص) جمله (س) کلمه (ع)'
      const expected = 'مثال(ص) جمله(س) کلمه(ع)'

      const result = virastar.process(input, {
        ...options,
        replaceMiscSpacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove space before braces containing numbers', () => {
      const input = 'اعداد [۱۲۳۴۵۶۷۸۹۰]'
      const expected = 'اعداد[۱۲۳۴۵۶۷۸۹۰]'

      const result = virastar.process(input, {
        ...options,
        replaceMiscSpacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should not change the text if there are no misc cases', () => {
      const input = 'این یک متن است'
      const expected = 'این یک متن است'

      const result = virastar.process(input, {
        ...options,
        replaceMiscSpacing: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixNumeralSymbols', () => {
    test('should replace english numerals with their persian equivalent characters', () => {
      const input = '۱,۰۰۰٫۵۰%'
      const expected = '۱٬۰۰۰٫۵۰٪'

      const result = virastar.process(input, {
        ...options,
        replaceNumeralSymbols: true,
      })

      expect(result).toBe(expected)
    })

    test('should replace multiple occurrences of english numerals with their persian equivalent characters', () => {
      const input = '۱۲۳,۴۵۶.۷۸% ۹۰۰.۱۲'
      const expected = '۱۲۳٬۴۵۶٫۷۸٪ ۹۰۰٫۱۲'

      const result = virastar.process(input, {
        ...options,
        replaceNumeralSymbols: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixPrefixSpacing', () => {
    it('should put zwnj between the word and the mi* prefix', () => {
      const input = 'من می روم'
      const expected = 'من می\u200cروم'

      const result = virastar.process(input, {
        ...options,
        replacePrefixSpacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should put zwnj between the word and the nemi* prefix', () => {
      const input = 'من نمی روم'
      const expected = 'من نمی\u200cروم'

      const result = virastar.process(input, {
        ...options,
        replacePrefixSpacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should put zwnj between the word and the bi* prefix', () => {
      const input = 'من بی خیال شدم'
      const expected = 'من بی‌خیال شدم'

      const result = virastar.process(input, {
        ...options,
        replacePrefixSpacing: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixPersianGlyphs', () => {
    it('should replace incorrect persian glyphs with standard characters', () => {
      const input = 'ﭖ ﻉ ﺥ ﮎ ﻛ ﺭ ﻝ'
      const expected = 'پ ع خ ک ک ر ل'

      const result = virastar.process(input, {
        ...options,
        replacePersianGlyphs: true,
      })

      expect(result).toBe(expected)
    })

    it('should not change text without incorrect persian glyphs', () => {
      const input = 'این یک متن عادی است.'
      const expected = 'این یک متن عادی است.'

      const result = virastar.process(input, {
        ...options,
        replacePersianGlyphs: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixPunctuations', () => {
    it('should replace ASCII punctuations with Persian punctuations', () => {
      const input = 'من آمده‌ام، با خودم کتاب‌هایی آورده‌ام؛ من می‌خوانم.'
      const expected =
        'من آمده\u200cام، با خودم کتاب\u200cهایی آورده\u200cام؛ من می\u200cخوانم.'

      const result = virastar.process(input, {
        ...options,
        replacePunctuations: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixQuestionMark', () => {
    it('should replace all question marks with Persian equivalent', () => {
      const input = 'چرا سوالی نیست? من همیشه پر از سوالاتم?'
      const expected = 'چرا سوالی نیست؟ من همیشه پر از سوالاتم؟'

      const result = virastar.process(input, {
        ...options,
        replaceQuestionMarks: true,
      })

      expect(result).toBe(expected)
    })

    it('should return the same text if there is no question mark in it', () => {
      const input = 'این جمله سوالی نیست.'
      const expected = 'این جمله سوالی نیست.'

      const result = virastar.process(input, {
        ...options,
        replaceQuestionMarks: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixBracesSpacingInside', () => {
    it('should remove inside spaces for ()', () => {
      const input = 'این یک ( تست ) است.'
      const expected = 'این یک (تست) است.'

      const result = virastar.process(input, {
        ...options,
        replaceSpacingForBracesAndQuotes: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove inside spaces for []', () => {
      const input = 'این یک [ تست ] است.'
      const expected = 'این یک [تست] است.'

      const result = virastar.process(input, {
        ...options,
        replaceSpacingForBracesAndQuotes: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove inside spaces for {}', () => {
      const input = 'این یک { تست } است.'
      const expected = 'این یک {تست} است.'

      const result = virastar.process(input, {
        ...options,
        replaceSpacingForBracesAndQuotes: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove inside spaces for “”', () => {
      const input = 'این یک “ تست ” است.'
      const expected = 'این یک “تست” است.'

      const result = virastar.process(input, {
        ...options,
        replaceSpacingForBracesAndQuotes: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove inside spaces for «»', () => {
      const input = 'این یک « تست » است.'
      const expected = 'این یک «تست» است.'

      const result = virastar.process(input, {
        ...options,
        replaceSpacingForBracesAndQuotes: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixPunctuationSpacing', () => {
    it('should remove spaces before punctuations and reduce multiple spaces after punctuations to one space', () => {
      const input = 'اگر دوست داشته باشید ؛ به من یاد می‌دهید ؟'
      const expected = 'اگر دوست داشته باشید؛ به من یاد می‌دهید؟'

      const result = virastar.process(input, {
        ...options,
        removeSpacingForPunctuations: true,
      })

      expect(result).toBe(expected)
    })

    it('should not remove space after colon that separates non-time parts', () => {
      const input = 'نام: محمد، سن: ۲۵'
      const expected = 'نام: محمد، سن: ۲۵'

      const result = virastar.process(input, {
        ...options,
        removeSpacingForPunctuations: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove space after colon that separates time parts', () => {
      const input = 'زمان: ۱۰: ۴۵'
      const expected = 'زمان: ۱۰:۴۵'

      const result = virastar.process(input, {
        ...options,
        removeSpacingForPunctuations: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove space after dots in numbers', () => {
      const input = 'قیمت: ۱۰. ۵ دلار'
      const expected = 'قیمت: ۱۰.۵ دلار'

      const result = virastar.process(input, {
        ...options,
        removeSpacingForPunctuations: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove space before common domain tlds', () => {
      const input = 'برای دسترسی به سایت‌های time .ir و google. com'
      const expected = 'برای دسترسی به سایت‌های time.ir و google.com'

      const result = virastar.process(input, {
        ...options,
        removeSpacingForPunctuations: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove spaces between different/same marks', () => {
      const input = '؟     !'
      const expected = '؟!'

      const result = virastar.process(input, {
        ...options,
        removeSpacingForPunctuations: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixSuffixMisc', () => {
    it('should replace ه followed by ئ or ی, and then by ی, with ه\u200cای', () => {
      const input = 'خانه‌ئی'
      const expected = 'خانه‌ای'

      const result = virastar.process(input, {
        ...options,
        replaceSuffixMisc: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace when there is no ئ or ی after ه', () => {
      const input = 'همچنان'
      const expected = 'همچنان'

      const result = virastar.process(input, {
        ...options,
        replaceSuffixMisc: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace when there is no ه before ئ or ی', () => {
      const input = 'خانه‌ایی'
      const expected = 'خانه‌ایی'

      const result = virastar.process(input, {
        ...options,
        replaceSuffixMisc: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace when ه followed by ئ or ی is not followed by ی', () => {
      const input = 'به زودی'
      const expected = 'به زودی'

      const result = virastar.process(input, {
        ...options,
        replaceSuffixMisc: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixSuffixSpacingHamzeh', () => {
    it('should add correct hamzeh spacing for heh+ye', () => {
      const input = 'مدیریت های دوم'
      const expected = 'مدیریت\u200cهای دوم'

      const result = virastar.process(input, {
        ...options,
        fix_suffix_spacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should add correct hamzeh spacing for heh+standalone hamza', () => {
      const input = 'راه هایی'
      const expected = 'راه\u200cهایی'

      const result = virastar.process(input, {
        ...options,
        fix_suffix_spacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should add correct hamzeh spacing for heh+hamza above', () => {
      const input = 'تراش هایی'
      const expected = 'تراش\u200cهایی'

      const result = virastar.process(input, {
        ...options,
        fix_suffix_spacing: true,
      })

      expect(result).toBe(expected)
    })

    it('should not add hamzeh spacing if not applicable', () => {
      const input = 'هوا'
      const expected = 'هوا'

      const result = virastar.process(input, {
        ...options,
        fix_suffix_spacing: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('fixThreeDots', () => {
    it('should replace three dots with ellipsis character', () => {
      const input = 'سلام ... دنیا'
      const expected = 'سلام… دنیا'

      const result = virastar.process(input, {
        ...options,
        normalizeThreeDots: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove spaces between dots', () => {
      const input = 'سلام.  .  . دنیا'
      const expected = 'سلام… دنیا'

      const result = virastar.process(input, {
        ...options,
        normalizeThreeDots: true,
      })

      expect(result).toBe(expected)
    })

    it('should not replace two dots', () => {
      const input = 'من .. دوستت دارم'
      const expected = 'من .. دوستت دارم'

      const result = virastar.process(input, {
        ...options,
        normalizeThreeDots: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('kashidasAsParenthetic', () => {
    it('should replace kashidas with ndash for parenthetic spacing', () => {
      const input = 'تستــــــ'
      const expected = 'تست–'

      const result = virastar.process(input, {
        ...options,
        normalizeKashidas: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('markdownNormalizeBraces', () => {
    it('should remove spaces between ! and opening brace on markdown images', () => {
      const input = '! [alt] (src)'
      const expected = '![alt](src)'

      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownBraces: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove spaces between [] and ()', () => {
      const input = '[text] (link)'
      const expected = '[text](link)'

      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownBraces: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove spaces inside double () [] {}', () => {
      const input = '[[ text ]]'
      const expected = '[[text]]'

      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownBraces: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove spaces between double () [] {}', () => {
      const input = '[[text] ]'
      const expected = '[[text]]'

      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownBraces: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('markdownNormalizeLists', () => {
    it('should remove extra line between two items list for bulleted lists', () => {
      const input = `* item 1

* item 2`
      const expected = `* item 1
* item 2`
      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownLists: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove extra line between two items list for hyphenated lists', () => {
      const input = `- item 1

- item 2`
      const expected = `- item 1
- item 2`
      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownLists: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove extra line between two items list for numbered lists', () => {
      const input = `# item 1

# item 2`
      const expected = `# item 1
# item 2`
      const result = virastar.process(input, {
        ...options,
        normalizeMarkDownLists: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('normalizeDates', () => {
    it('should re-order date parts with slash as delimiter', () => {
      const input = '۱۴/۰۳/۲۰۲۱'
      const expected = '۲۰۲۱/۰۳/۱۴'

      const result = virastar.process(input, {
        ...options,
        normalizeJalaliDates: true,
      })

      expect(result).toBe(expected)
    })

    it('should not modify the text if it does not contain a date', () => {
      const input = 'متنی بدون تاریخ'
      const expected = input

      const result = virastar.process(input, {
        ...options,
        normalizeJalaliDates: true,
      })

      expect(result).toBe(expected)
    })

    it('should handle multiple dates in the text', () => {
      const input = '۱۴/۰۳/۲۰۲۱ - ۱۴/۰۳/۲۰۲۲'
      const expected = '۲۰۲۱/۰۳/۱۴ - ۲۰۲۲/۰۳/۱۴'

      const result = virastar.process(input, {
        ...options,
        normalizeJalaliDates: true,
      })

      expect(result).toBe(expected)
    })

    it('should handle different date formats', () => {
      const input = '۲۰-۰۳-۲۰۲۱'
      const expected = '۲۰۲۱/۰۳/۲۰'

      const result = virastar.process(input, {
        ...options,
        normalizeJalaliDates: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('normalizeEllipsis', () => {
    it('should replace more than one ellipsis with one', () => {
      const input = 'سلام……'
      const expected = 'سلام…'

      const result = virastar.process(input, {
        ...options,
        normalizeEllipsis: true,
      })

      expect(result).toBe(expected)
    })

    it.skip('should replace (space|tab|zwnj) after ellipsis with one space', () => {
      const input = 'سلام…\t\t'
      const expected = 'سلام… '

      const result = virastar.process(input, {
        ...options,
        normalizeEllipsis: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('normalizeEOL', () => {
    it('should replace windows end of lines with unix eol (`\\n`)', () => {
      const input = 'متن با سلام\r\nاین یک تست است\nو برای تست\rمی باشد'
      const expected = 'متن با سلام\nاین یک تست است\nو برای تست\nمی باشد'

      const result = virastar.process(input, {
        ...options,
        normalizeEndOfLines: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('removeDiacritics', () => {
    it('should remove all diacritic characters from the input text', () => {
      const input = 'دَرخِتِ قَدِيمي زَيرآب'
      const expected = 'درخت قديمي زيرآب'

      const result = virastar.process(input, {
        ...options,
        removeDiacritics: true,
      })

      expect(result).toBe(expected)
    })

    it('should not change the text if there are no diacritic characters', () => {
      const input = 'شيوه نگارش فارسی را بهبود بخشيد'
      const expected = 'شيوه نگارش فارسی را بهبود بخشيد'

      const result = virastar.process(input, {
        ...options,
        removeDiacritics: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove diacritic characters in combination with other characters', () => {
      const input = 'چِند ضَربِه از مَي خورِد؟'
      const expected = 'چند ضربه از مي خورد؟'

      const result = virastar.process(input, {
        ...options,
        removeDiacritics: true,
      })

      expect(result).toBe(expected)
    })
  })
})
