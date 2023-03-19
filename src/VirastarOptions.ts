export interface VirastarOptions {
  cleanup_begin_and_end?: boolean;
  cleanup_extra_marks?: boolean;
  cleanup_kashidas?: boolean;
  cleanup_line_breaks?: boolean;
  cleanup_rlm?: boolean;
  cleanup_spacing?: boolean;
  cleanup_zwnj?: boolean;
  decode_htmlentities?: boolean;
  fix_arabic_numbers?: boolean;
  fix_dashes?: boolean;
  fix_diacritics?: boolean;
  fix_english_numbers?: boolean;
  fix_english_quotes_pairs?: boolean;
  fix_english_quotes?: boolean;
  fix_hamzeh?: boolean;
  fix_hamzeh_arabic?: boolean;
  fix_misc_non_persian_chars?: boolean;
  fix_misc_spacing?: boolean;
  fix_numeral_symbols?: boolean;
  fix_prefix_spacing?: boolean;
  fix_persian_glyphs?: boolean;
  fix_punctuations?: boolean;
  fix_question_mark?: boolean;
  fix_spacing_for_braces_and_quotes?: boolean;
  fix_spacing_for_punctuations?: boolean;
  fix_suffix_misc?: boolean;
  fix_suffix_spacing?: boolean;
  fix_three_dots?: boolean;
  kashidas_as_parenthetic?: boolean;
  markdown_normalize_braces?: boolean;
  markdown_normalize_lists?: boolean;
  normalize_dates?: boolean;
  normalize_ellipsis?: boolean;
  normalize_eol?: boolean;
  preserve_braces?: boolean;
  preserve_brackets?: boolean;
  preserve_comments?: boolean;
  preserve_entities?: boolean;
  preserve_frontmatter?: boolean;
  preserve_HTML?: boolean;
  preserve_nbsps?: boolean;
  preserve_URIs?: boolean;
  remove_diacritics?: boolean;
  skip_markdown_ordered_lists_numbers_conversion?: boolean;
}