import { Virastar } from './virastar'
import { sprintf } from 'sprintf-js'

// demo default options
const options = {
  // cleanup_begin_and_end: true,
  // cleanup_extra_marks: true,
  // cleanup_kashidas: true,
  // cleanup_line_breaks: true,
  // cleanup_rlm: true,
  // cleanup_spacing: true,
  // cleanup_zwnj: true,
  // decode_htmlentities: true,
  // fix_arabic_numbers: true,
  // fix_dashes: true,
  // fix_diacritics: true,
  // fix_english_numbers: true,
  // fix_english_quotes_pairs: true,
  // fix_english_quotes: true,
  // fix_hamzeh: true,
  // fix_hamzeh_arabic: true,
  // fix_misc_non_persian_chars: true,
  // fix_misc_spacing: true,
  // fix_numeral_symbols: true,
  // fix_perfix_spacing: true,
  // fix_persian_glyphs: false,
  // fix_punctuations: true,
  // fix_question_mark: true,
  // fix_spacing_for_braces_and_quotes: true,
  // fix_spacing_for_punctuations: true,
  // fix_suffix_misc: true,
  // fix_suffix_spacing: true,
  // fix_three_dots: true,
  // kashidas_as_parenthetic: true,
  // markdown_normalize_braces: true,
  // markdown_normalize_lists: true,
  // normalize_dates: true,
  // normalize_ellipsis: true,
  // normalize_eol: true,
  // preserve_braces: true,
  // preserve_brackets: true,
  // preserve_comments: true,
  // preserve_entities: true,
  // preserve_frontmatter: true,
  // preserve_HTML: true,
  // preserve_nbsps: true,
  // preserve_URIs: true,
  // remove_diacritics: true,
  // skip_markdown_ordered_lists_numbers_conversion: true,
}

const optionsDisabled = {
  cleanup_begin_and_end: false,
  cleanup_extra_marks: false,
  cleanup_kashidas: false,
  cleanup_line_breaks: false,
  cleanup_rlm: false,
  cleanup_spacing: false,
  cleanup_zwnj: false,
  decode_htmlentities: false,
  fix_arabic_numbers: false,
  fix_dashes: false,
  fix_diacritics: false,
  fix_english_numbers: false,
  fix_english_quotes_pairs: false,
  fix_english_quotes: false,
  fix_hamzeh: false,
  fix_hamzeh_arabic: false,
  fix_misc_non_persian_chars: false,
  fix_misc_spacing: false,
  fix_numeral_symbols: false,
  fix_perfix_spacing: false,
  fix_persian_glyphs: false,
  fix_punctuations: false,
  fix_question_mark: false,
  fix_spacing_for_braces_and_quotes: false,
  fix_spacing_for_punctuations: false,
  fix_suffix_misc: false,
  fix_suffix_spacing: false,
  fix_three_dots: false,
  kashidas_as_parenthetic: false,
  markdown_normalize_braces: false,
  markdown_normalize_lists: false,
  normalize_dates: false,
  normalize_ellipsis: false,
  normalize_eol: false,
  preserve_braces: false,
  preserve_brackets: false,
  preserve_comments: false,
  preserve_entities: false,
  preserve_frontmatter: false,
  preserve_HTML: false,
  preserve_nbsps: false,
  preserve_URIs: false,
  remove_diacritics: false,
  skip_markdown_ordered_lists_numbers_conversion: false,
}

describe('Virastar', () => {
  let virastar: Virastar

  it('should create new instance', () => {
    virastar = new Virastar()
  })

  describe('#cleanup()', () => {
    it('should cleanup simple sentences', () => {
      expect(
        virastar.cleanup(
          'ويراستار به شما كمك مي كند تا متون فارسي زيبا تر و درست تري بنويسيد .',
          options,
        ),
      ).toEqual(
        'ویراستار به شما کمک می‌کند تا متون فارسی زیباتر و درست‌تری بنویسید.',
      )

      expect(
        virastar.cleanup(
          'ويراستار به طور پيش فرض اين کار ها را انجام می دهد :',
          options,
        ),
      ).toEqual('ویراستار به طور پیش فرض این کارها را انجام می‌دهد:')
    })

    it('should cleanup simple sentences #1', () => {
      expect(
        virastar.cleanup(
          '1. نویسه های عربي را به فارسی تبديل مي کند.  مثلا كاف و ياي عربي .',
          options,
        ),
      ).toEqual(
        '۱. نویسه‌های عربی را به فارسی تبدیل می‌کند. مثلا کاف و یای عربی.',
      )
    })

    it('should cleanup simple sentences #2', () => {
      expect(
        virastar.cleanup(
          '2. نویسه های انگليسي رايج در تايپ فارسي را به معادل صحيح فارسي آن تبدیل می کند, مثلا تبدیل کامای انگلیسی به ویرگول (,), يا نقطه ویرگول به جای semicolon (;) و یا استفاده از "گيومه های فارسي"',
          options,
        ),
      ).toEqual(
        '۲. نویسه‌های انگلیسی رایج در تایپ فارسی را به معادل صحیح فارسی آن تبدیل می‌کند، مثلا تبدیل کامای انگلیسی به ویرگول (،)، یا نقطه ویرگول به جای semicolon (؛) و یا استفاده از «گیومه‌های فارسی»',
      )
    })

    it('should cleanup simple sentences #3', () => {
      expect(
        virastar.cleanup(
          '3. اعداد عربي و انگليسي و علائم رياضی را به معادل فارسی آن ها تبديل مي کند.    مثلا  :  12%  456',
          options,
        ),
      ).toEqual(
        '۳. اعداد عربی و انگلیسی و علائم ریاضی را به معادل فارسی آن‌ها تبدیل می‌کند. مثلا: ۱۲٪ ۴۵۶',
      )
    })

    it('should cleanup simple sentences #4', () => {
      expect(
        virastar.cleanup(
          '4. سه نقطه را به نويسه صحيح آن که تنها يك نويسه است تبديل کرده و فاصله گذاري آن را اصلاح مي کند ...',
          options,
        ),
      ).toEqual(
        '۴. سه نقطه را به نویسه صحیح آن که تنها یک نویسه است تبدیل کرده و فاصله گذاری آن را اصلاح می‌کند…',
      )
    })

    it('should cleanup simple sentences #5', () => {
      expect(
        virastar.cleanup(
          '5. در ترکيباتي مانند \'\'خانه ي پدری\'\' که  با "ه" تمام می‌شوند نشانه "ی" كسره ی اضافه را به "هٔ" تبديل می كند.',
          options,
        ),
      ).toEqual(
        '۵. در ترکیباتی مانند «خانهٔ پدری» که با «ه» تمام می‌شوند نشانه «ی» کسرهٔ اضافه را به «هٔ» تبدیل می‌کند.',
      )
    })

    it('should cleanup simple sentences #6', () => {
      expect(
        virastar.cleanup(
          '6. دو علامت منهاي پي در پي را به خط کشيده کوتاه (--) و سه علامت منهاي پي در پي را به خط کشیده بلند (---) تبديل مي كند .',
          options,
        ),
      ).toEqual(
        '۶. دو علامت منهای پی در پی را به خط کشیده کوتاه (–) و سه علامت منهای پی در پی را به خط کشیده بلند (—) تبدیل می‌کند.',
      )
    })

    it('should cleanup simple sentences #7', () => {
      expect(
        virastar.cleanup(
          '7. فاصله گذاری را تصحيح مي کند . بين هر کلمه تنها یک فاصله و بین پیشوندها و پسوندهاي مانند "مي","تر"و"ترین"  يک نيم فاصله قرار مي دهد.  بین ویرگول یا نقطه و کلمه قبل آن فاصله را حذف می کند.',
          options,
        ),
      ).toEqual(
        '۷. فاصله گذاری را تصحیح می‌کند. بین هر کلمه تنها یک فاصله و بین پیشوندها و پسوندهای مانند «می»، «تر» و «ترین» یک نیم فاصله قرار می‌دهد. بین ویرگول یا نقطه و کلمه قبل آن فاصله را حذف می‌کند.',
      )
    })

    it('should cleanup simple sentences #8', () => {
      expect(
        virastar.cleanup(
          '8. فاصله گذاری را برای متون بین "  گیومه  " , {    آکولاد   }  , [   کروشه  ]  و ( پرانتز    ) تنظيم مي کند .',
          options,
        ),
      ).toEqual(
        '۸. فاصله گذاری را برای متون بین «گیومه»، {آکولاد}، [کروشه] و (پرانتز) تنظیم می‌کند.',
      )
    })

    it('should cleanup simple sentences #9', () => {
      expect(
        virastar.cleanup(
          '9. علامت تعحب و سوال اضافی را حذف مي کند؟؟؟!!!!!!!',
          options,
        ),
      ).toEqual('۹. علامت تعحب و سوال اضافی را حذف می‌کند؟!')
    })

    it('should replace kashidas to ndash in parenthetic', () => {
      expect(
        virastar.cleanup(
          'ـ که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم ـ',
          {},
        ),
      ).toEqual(
        '– که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم –',
      )
    })

    it('should not put space after dots in numbers', () => {
      expect(
        virastar.cleanup(
          'پوسته دوهزارونوزده، حداقل به نسخه وردپرس 4.7 نیاز دارد. شما نسخه %s را اجرا می کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.',
          {},
        ),
      ).toEqual(
        'پوسته دوهزارونوزده، حداقل به نسخه وردپرس ۴٫۷ نیاز دارد. شما نسخه %s را اجرا می‌کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.',
      )
    })

    it('should not replace sprintf directives', () => {
      expect(
        virastar.cleanup(
          'این افزونه به php نسخه "%1$s" نياز دارد. شما از نسخه (%2$s) استفاده می کنید. لطفاً پس از ارتقا دوباره تلاش کنید.',
          {},
        ),
      ).toEqual(
        'این افزونه به php نسخه «%1$s» نیاز دارد. شما از نسخه (%2$s) استفاده می‌کنید. لطفاً پس از ارتقا دوباره تلاش کنید.',
      )
    })

    it('should converts back html named character references', () => {
      expect(virastar.cleanup('&quot;گيومه های فارسي&quot;')).toEqual(
        '«گیومه‌های فارسی»',
      )
      expect(virastar.cleanup('&apos;گيومه های فارسي&apos;')).toEqual(
        '«گیومه‌های فارسی»',
      )
    })

    // @REF: https://github.com/aziz/virastar/blob/master/spec/virastar_spec.rb

    it('should replace Arabic kaf with its Persian equivalent', () => {
      expect(virastar.cleanup('ك')).toEqual('ک')
      expect(virastar.cleanup('كمك')).toEqual('کمک')
    })

    it('should replace Arabic Yeh with its Persian equivalent', () => {
      expect(virastar.cleanup('ي')).toEqual('ی')
      expect(virastar.cleanup('بيني')).toEqual('بینی')
    })

    it('should replace Arabic numbers with their Persian equivalent', () => {
      expect(virastar.cleanup('٠١٢٣٤٥٦٧٨٩')).toEqual('۰۱۲۳۴۵۶۷۸۹')
    })

    it('should replace English numbers with their Persian equivalent', () => {
      expect(virastar.cleanup('0123456789')).toEqual('۰۱۲۳۴۵۶۷۸۹')
    })

    it('should replace English comma and semicolon with their Persian equivalent', () => {
      expect(virastar.cleanup(';,')).toEqual('؛ ،')
    })

    it('should correct :;,.?! spacing (one space after and no space before)', () => {
      expect(virastar.cleanup('گفت : سلام')).toEqual('گفت: سلام')
    })

    it('should replace English quotes with their Persian equivalent', () => {
      expect(virastar.cleanup("''تست''")).toEqual('«تست»')
      expect(virastar.cleanup("'تست'")).toEqual('«تست»')
      expect(virastar.cleanup('`تست`')).toEqual('«تست»')
      expect(virastar.cleanup('``تست``')).toEqual('«تست»')
      expect(virastar.cleanup('"گفت: سلام"')).toEqual('«گفت: سلام»')
      expect(virastar.cleanup('"این" یا "آن"')).toEqual('«این» یا «آن»') // not greedy
    })

    it('should convert ه ی to هٔ', () => {
      expect(virastar.cleanup('خانه ی ما')).toEqual('خانهٔ ما')
      expect(virastar.cleanup('خانه ی ما')).toEqual('خانهٔ ما')
      expect(virastar.cleanup('خانه ي ما')).toEqual('خانهٔ ما')
    })

    it('should replace double dash to ndash and triple dash to mdash', () => {
      expect(virastar.cleanup('--')).toEqual('–')
      expect(virastar.cleanup('---')).toEqual('—')
    })

    it('should replace more than one space with just a single one', () => {
      expect(virastar.cleanup('  سلام   جهان ،  من ویراستار هستم!')).toEqual(
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
            virastar.cleanup(
              sprintf(templates[str][0], matched[pair][0], matched[pair][1]),
            ),
          ).toEqual(
            sprintf(templates[str][1], matched[pair][0], matched[pair][1]),
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
            templates2[str2],
            mismatched[pair2][0],
            mismatched[pair2][1],
          )
          expect(virastar.cleanup(template)).toEqual(template)
        }
      }
    })

    it('should replace English percent sign to its Persian equivalent', () => {
      expect(virastar.cleanup('96%')).toEqual('۹۶٪')
    })

    it('should remove spaces before and after line breaks', () => {
      expect(virastar.cleanup('this is \n \n \n     \n a test')).toEqual(
        'this is \n\na test',
      )
      expect(virastar.cleanup('this is\n\n\n\na test')).toEqual(
        'this is\n\na test',
      )
      expect(virastar.cleanup('this is \n\n\n    a test')).toEqual(
        'this is \n\na test',
      )
    })

    it('should remove more that two line breaks', () => {
      expect(virastar.cleanup('this is \n \n \n     \n a test')).toEqual(
        'this is \n\na test',
      )
      expect(virastar.cleanup('this is\n\n\n\na test')).toEqual(
        'this is\n\na test',
      )
      expect(virastar.cleanup('this is \n\n\n    a test')).toEqual(
        'this is \n\na test',
      )
    })

    it('should not replace line breaks and should remove spaces after line break', () => {
      expect(virastar.cleanup('this is \n  a test')).toEqual('this is \na test')
    })

    it('should put zwnj between word and prefix/suffix (ha haye* tar* tarin mi* nemi*)', () => {
      expect(virastar.cleanup('ما می توانیم')).toEqual('ما می‌توانیم')
      expect(virastar.cleanup('ما نمی توانیم')).toEqual('ما نمی‌توانیم')
      expect(virastar.cleanup('این بهترین کتاب ها است')).toEqual(
        'این بهترین کتاب‌ها است',
      )
      expect(virastar.cleanup('بزرگ تری و قدرتمند ترین زبان های دنیا')).toEqual(
        'بزرگ‌تری و قدرتمندترین زبان‌های دنیا',
      )
    })

    it('should not replace English numbers in English phrases', () => {
      expect(virastar.cleanup('عزیز ATM74 در IBM-96 085 B 95BCS')).toEqual(
        'عزیز ATM74 در IBM-96 ۰۸۵ B 95BCS',
      )
    })

    it('should not create spacing for something like (,)', () => {
      expect(virastar.cleanup('this is (,) comma')).toEqual('this is (،) comma')
    })

    it('should not puts space after time colon separator', () => {
      expect(virastar.cleanup('12:34')).toEqual('۱۲:۳۴')
    })

    it('should not destroy URLs', () => {
      expect(virastar.cleanup('https://virastar.brothersincode.ir')).toEqual(
        'https://virastar.brothersincode.ir',
      )
      expect(
        virastar.cleanup(
          'https://virastar.brothersincode.ir\nhttp://twitter.com',
        ),
      ).toEqual('https://virastar.brothersincode.ir\nhttp://twitter.com')
    })

    it('should not replace line breaks when the line ends with quotes', () => {
      let actual = 'salam "khoobi" \n chetori'
      let output = 'salam «khoobi» \nchetori'
      expect(virastar.cleanup(actual)).toEqual(output)
    })

    it("should not put space after quotes, {}, () or [] if there's ,.; just after that", () => {
      let actual = '«این», {این}, (این), [این] or {این}. بعضی وقت ها (این).'
      let output = '«این»، {این}، (این)، [این] or {این}. بعضی وقت‌ها (این).'
      expect(virastar.cleanup(actual)).toEqual(output)
    })

    it('should be able to convert numbers with dashes', () => {
      expect(virastar.cleanup('1- salam')).toEqual('۱- salam')
    })

    it('aggressive editing', () => {
      expect(virastar.cleanup('salam!!!')).toEqual('salam!')
      expect(virastar.cleanup('چطور؟؟؟')).toEqual('چطور؟')
    })

    it('should remove all kashida', () => {
      expect(virastar.cleanup('سلامـــت')).toEqual('سلامت')
      expect(virastar.cleanup('لــعل سـلـسـبیــل')).toEqual('لعل سلسبیل')
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
        expect(virastar.cleanup(equals[equal])).toEqual(equals[equal])
      }
    })
  })

  describe('#cleanup(): Additional', () => {
    it('should preserve all HTML tags', () => {
      expect(
        virastar.cleanup(
          '<strong title="نباید تغییر کند!!!!!">سلام جهان</strong>',
        ),
      ).toEqual('<strong title="نباید تغییر کند!!!!!">سلام جهان</strong>')
    })

    it('should fix heh plus standalone hamza', () => {
      expect(virastar.cleanup('از غم به هر بهانهء ممكن عبور كن !')).toEqual(
        'از غم به هر بهانهٔ ممکن عبور کن!',
      ) // without space
      expect(virastar.cleanup('از غم به هر بهانه ء ممكن عبور كن !')).toEqual(
        'از غم به هر بهانهٔ ممکن عبور کن!',
      ) // with space
    })

    it('should fix heh plus hamza into ye', () => {
      expect(virastar.cleanup('خانه‌ٔ پدری', { fix_hamzeh: false })).toEqual(
        'خانه‌ی پدری',
      )
      expect(virastar.cleanup('خانه ء پدری', { fix_hamzeh: false })).toEqual(
        'خانه‌ی پدری',
      )
      expect(virastar.cleanup('خانه ي پدری', { fix_hamzeh: false })).toEqual(
        'خانه‌ی پدری',
      )
      expect(virastar.cleanup('خانه‌ی پدری', { fix_hamzeh: false })).toEqual(
        'خانه‌ی پدری',
      ) // no change
    })

    it('should convert all soft hyphens into zwnj', () => {
      expect(
        virastar.cleanup('عادت به تنهایی... این دیگر از آن حرف­هاست! '),
      ).toEqual('عادت به تنهایی… این دیگر از آن حرف‌هاست!')
    })

    it('should normalize ellipsis', () => {
      expect(virastar.cleanup('...…...')).toEqual('…')
    })

    it('should normalize question/exclamation marks', () => {
      expect(
        virastar.cleanup('عادت به تنهایی... این دیگر از آن حرف­هاست!!!?'),
      ).toEqual('عادت به تنهایی… این دیگر از آن حرف‌هاست؟!')
      expect(virastar.cleanup('متن فارسی؟!')).toEqual('متن فارسی؟!')
      expect(virastar.cleanup('متن فارسی!؟')).toEqual('متن فارسی؟!')
      expect(virastar.cleanup('متن فارسی?!')).toEqual('متن فارسی؟!')
      expect(virastar.cleanup('متن فارسی!?')).toEqual('متن فارسی؟!')
      expect(virastar.cleanup('؟!')).toEqual('؟!')
      expect(virastar.cleanup('!؟')).toEqual('؟!')
      expect(virastar.cleanup('?!')).toEqual('؟!')
      expect(virastar.cleanup('!?')).toEqual('؟!')
      expect(virastar.cleanup('کتاب????!!!!')).toEqual('کتاب؟!')
      expect(virastar.cleanup('کتاب!!!!?????')).toEqual('کتاب؟!')
      expect(virastar.cleanup('کتاب؟؟؟!!!!')).toEqual('کتاب؟!')
      expect(virastar.cleanup('کتاب!!!!!!!!!؟؟؟؟؟؟؟؟')).toEqual('کتاب؟!')
      expect(virastar.cleanup('کتاب!!!!!!')).toEqual('کتاب!')
      expect(virastar.cleanup('کتاب؟؟؟؟')).toEqual('کتاب؟')
      expect(virastar.cleanup('کتاب?????')).toEqual('کتاب؟')
    })

    it('extra: fixSuffixSpacing()', () => {
      expect(
        virastar.cleanup('"و من هم به خاطر جلب اعتماد او پذیرفته ام"'),
      ).toEqual('«و من هم به خاطر جلب اعتماد او پذیرفته‌ام»') // within quotes
      expect(
        virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام.'),
      ).toEqual('و من هم به خاطر جلب اعتماد او پذیرفته‌ام.') // followed by dot
      expect(
        virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام!'),
      ).toEqual('و من هم به خاطر جلب اعتماد او پذیرفته‌ام!') // followed by exclamation
      expect(
        virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام؟'),
      ).toEqual('و من هم به خاطر جلب اعتماد او پذیرفته‌ام؟') // followed by question
      expect(
        virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام'),
      ).toEqual('و من هم به خاطر جلب اعتماد او پذیرفته‌ام') // as last word (with the help of padding)

      expect(
        virastar.cleanup(
          'و به چلو ماهی و باسلوق و مترادف کرده ایم، محض خالی نبودن عریضه دیوان حافظ را هم تنگش زده ایم. سوءتفاهم نشود.',
        ),
      ).toEqual(
        'و به چلو ماهی و باسلوق و مترادف کرده‌ایم، محض خالی نبودن عریضه دیوان حافظ را هم تنگش زده‌ایم. سوءتفاهم نشود.',
      )
      expect(
        virastar.cleanup(
          'عرضم این است که ما در بیداری نیز خود را فریب می دهیم و به شکم چرانی مان صبغه فرهیختگی می زنیم.',
        ),
      ).toEqual(
        'عرضم این است که ما در بیداری نیز خود را فریب می‌دهیم و به شکم چرانی‌مان صبغه فرهیختگی می‌زنیم.',
      )
      expect(virastar.cleanup('به خواب های تان دقت کنید.')).toEqual(
        'به خواب‌های‌تان دقت کنید.',
      )
    })

    it('extra: fixSuffixMisc()', () => {
      expect(virastar.cleanup('خانه‌يی بر روی آب')).toEqual('خانه‌ای بر روی آب')
      expect(virastar.cleanup('خانه‌ئی بر روی آب')).toEqual('خانه‌ای بر روی آب')
      expect(virastar.cleanup('خانه‌یی بر روی آب')).toEqual('خانه‌ای بر روی آب')
    })

    it('extra: fixDiacritics():‌ cleans more than one diacritic characters', () => {
      expect(virastar.cleanup('لطفاًً')).toEqual('لطفاً')
    })

    it('extra: fixNumeralSymbols(): replaces english percent signs', () => {
      expect(virastar.cleanup('۹۶%')).toEqual('۹۶٪')
    })

    it('extra: fixNumeralSymbols(): replaces dots between numbers into decimal separator', () => {
      expect(virastar.cleanup('۱۲.۵۶')).toEqual('۱۲٫۵۶')
    })

    it('extra: fixNumeralSymbols(): replaces commas between numbers into thousands separator', () => {
      expect(virastar.cleanup('۱۲,۵۴۳')).toEqual('۱۲٬۵۴۳')
    })

    it('extra: cleanupKashidas(): converts kashida between numbers to ndash', () => {
      expect(virastar.cleanup('۱۱ـ۲۳')).toEqual('۱۱–۲۳')
    })

    it('extra: kashidasAsParenthetic(): replaces kashidas to ndash in parenthetic', () => {
      expect(
        virastar.cleanup('ـکه همواره به فتوحات پادشاهان خویش در هند می‌بالیمـ'),
      ).toEqual('–که همواره به فتوحات پادشاهان خویش در هند می‌بالیم–')
      expect(
        virastar.cleanup(
          'ما مردم افغانستان ـکه همواره به فتوحات پادشاهان خویش در هند می‌بالیمـ شاید حالا که دو دهه رنج تهاجم بیگانگان را چشیده‌ایم‌، بتوانیم درد و رنج مردم هند را در دوران لشکرکشی‌های اجدادمان دریابیم‌.',
        ),
      ).toEqual(
        'ما مردم افغانستان –که همواره به فتوحات پادشاهان خویش در هند می‌بالیم– شاید حالا که دو دهه رنج تهاجم بیگانگان را چشیده‌ایم، بتوانیم درد و رنج مردم هند را در دوران لشکرکشی‌های اجدادمان دریابیم.',
      )
    })

    it('extra: fixHamzehArabic(): converts arabic hamza', () => {
      expect(
        virastar.cleanup('آن دسته از علایم که مشخص‌کنندة انتهای جمله', {
          fix_hamzeh_arabic: true,
        }),
      ).toEqual('آن دسته از علایم که مشخص‌کنندهٔ انتهای جمله')
      expect(
        virastar.cleanup('آن دسته از علایم که مشخص‌کنندة انتهای جمله', {
          fix_hamzeh_arabic: true,
          fix_hamzeh: false,
        }),
      ).toEqual('آن دسته از علایم که مشخص‌کننده‌ی انتهای جمله')
    })

    it('extra: fixThreeDots(): removes space between dots/replaces three dots with ellipsis character', () => {
      expect(virastar.cleanup('...')).toEqual('…')
      expect(virastar.cleanup('......')).toEqual('…')
      expect(virastar.cleanup('. . . .   ...   ..... . . . .')).toEqual('…')
      expect(virastar.cleanup('خداحافظ ... به به')).toEqual('خداحافظ… به به')
    })

    it('extra: normalizeDates(): reorders date parts with slash as delimiter', () => {
      expect(virastar.cleanup('23/10/1355')).toEqual('۱۳۵۵/۱۰/۲۳')
      expect(virastar.cleanup('3/1/1355')).toEqual('۱۳۵۵/۱/۳')
    })

    it('extra: removeDiacritics(): removes all diacritic characters', () => {
      expect(
        virastar.cleanup(
          'اذا عَمَّتِ الْبُلْدانَ الْفِتَنُ فَعَلَیکمْ بِقُمْ وَحَوالیها وَنَواحیها فَانَ الْبَلاءَ مَدْفُوعٌ عَنْها',
          { remove_diacritics: true },
        ),
      ).toEqual(
        'اذا عمت البلدان الفتن فعلیکم بقم وحوالیها ونواحیها فان البلاء مدفوع عنها',
      )
    })
  })

  describe('cleanupBeginAndEnd', () => {
    it('should remove leading and trailing whitespace and newlines', () => {
      const input = '  \n\t۱۲۳۴۵۶۷۸۹۰  \n\t'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_begin_and_end: true,
      })

      expect(result).toBe(expected)
    })

    it('should only remove leading whitespace and newlines when inside the text', () => {
      const input = '  \n\t۱۲۳  ۴۵ ۶۷۸۹۰  \n\t'
      const expected = '۱۲۳  ۴۵ ۶۷۸۹۰'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_begin_and_end: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove all kinds of directionality marks', () => {
      const input = '\u200f۱۲۳۴۵۶۷۸۹۰\u200f'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_begin_and_end: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove zwnj', () => {
      const input = '‌۱۲۳۴۵۶۷۸۹۰‌'
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_begin_and_end: true,
      })

      expect(result).toBe(expected)
    })

    it('should remove nbsp', () => {
      const input = '۱۲۳۴۵۶۷۸۹۰ '
      const expected = '۱۲۳۴۵۶۷۸۹۰'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_begin_and_end: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupExtraMarks', () => {
    it('should remove extra marks from the text', () => {
      const input = 'سلام؟؟؟! چطورید؟؟!'
      const expected = 'سلام؟! چطورید؟!'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_extra_marks: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace multiple exclamation marks with a single one', () => {
      const input = 'وای! خدایا!!'
      const expected = 'وای! خدایا!'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_extra_marks: true,
      })

      expect(result).toBe(expected)
    })

    it('should replace multiple question marks with a single one', () => {
      const input = '؟؟؟چرا'
      const expected = '؟چرا'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_extra_marks: true,
      })

      expect(result).toBe(expected)
    })

    it('should reorder consecutive marks', () => {
      const input = 'چطوری!؟'
      const expected = 'چطوری؟!'

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_extra_marks: true,
      })

      expect(result).toBe(expected)
    })
  })

  describe('cleanupKashidas', () => {
    it('should replace kashidas between numbers with ndash', () => {
      const input = '۱۲۳۴۵۶۷۸۹۰ــــــ۱۲۳۴۵۶۷۸۹۰';
      const expected = '۱۲۳۴۵۶۷۸۹۰–۱۲۳۴۵۶۷۸۹۰';

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_kashidas: true,
      })

      expect(result).toBe(expected);
    });

    it('should remove all kashidas between non-whitespace characters', () => {
      const input = 'تـحـت مـجـازیـت هـوا';
      const expected = 'تحت مجازیت هوا';

      const result = virastar.cleanup(input, {
        ...optionsDisabled,
        cleanup_kashidas: true,
      })

      expect(result).toBe(expected);
    });
  });
})
