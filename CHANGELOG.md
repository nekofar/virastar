# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2023-03-22

### <!-- 01 -->Features

- Rename `cleanup` to `process` on `Virastar`

### <!-- 04 -->Refactor

- Create `PreserverFactory` and `ProcessorFactory`
- Improve cli tool codes and add some comments

### <!-- 05 -->Documentation

- Add installation and usage instructions to the project's readme

### <!-- 08 -->Miscellaneous Tasks

- Remove `private` option from root package file
- Change `access` and `changelog` on `changesets` config

## [0.2.0] - 2023-03-22

### <!-- 01 -->Features

- Add basic functionality for cli tool
- Add new preserver for markdown code blocks in code
- Initialize `changeset` in the project

### <!-- 03 -->Testing

- Skip some known issues to deal with them later
- Move virastar tests to the `test` folder
- Create new instance of virstar before tests
- Move tests back to the `src` folder and add new tests
- Add more tests for preservers and processors
- Improve jest configuration files

### <!-- 04 -->Refactor

- Replace some of unicode characters by ascii replacements
- Cleanup and improve the `constructor`
- Replace `newRegExp` method by `RegExp`
- Rename and reorder class fields
- Rename and reorder class methods
- Simplify `fixBracesSpacing` codes
- Split line lines to multiple lines
- Add missing types for class fields
- Rename `charsDiacritic` and `charsPersian`
- Extract methods to classes to improve maintainability
- Simplify regular expressions among codes
- Extract `wordTokenizer` from `cleanup` method
- Reduce `cleanup` method complexity
- Extract preservers from virastar
- Change option names from snake case to camel case
- Solve some errors reported bby linter
- Improve `BasePreserver` and add missing comments
- Reformat code and add comprehensive documentation
- Improve and reformat code based on new strictness
- Reformat and improve package files

### <!-- 08 -->Miscellaneous Tasks

- Move virastar source files to the `core` package
- Turn repository to a monorepo using `pnpm`
- Create new `cli` package for command line tool
- Update typescript configs for monorepo
- Replace `core` package file by `root` one
- Update `eslint` configs for monorepo
- Update `jest` configs for monorepo
- Install `ts-node` as dev-dependency
- Install `yargs` as dependency
- Install `@nekofar/virastar` as dependency
- Install `@tsconfig/recommended` as dev-dependency
- Solve some issues on eslint configs on packages
- Update `cli` package configuration
- Update `core` package configuration
- Update workspace typescript configs
- Change `prettier` log level to error
- Install `@tsconfig/node-lts-strictest-esm` as dev-dependency
- Change tsconfig base from recommended to strictest
- Install `pnpm` as dev-dependency
- Install `@tsconfig/node-lts-strictest` as dev-dependency
- Update workspace configurations
- Change tsconfig base from strictest esm to strictest
- Cleanup workspace file from useless parts
- Install `concurrently` as dev-dependency
- Install `@changesets/cli` as dev-dependency

## [0.1.1] - 2023-03-15

### <!-- 05 -->Documentation

- Add package description to the readme

### <!-- 07 -->Continuous Integrations

- Setup `dependabot` to take care of dependency updates
- Add a new `pnpm` workflow to update lock file

### <!-- 08 -->Miscellaneous Tasks

- Add `.npmignore` file to exclude unnecessary files from package publish
- Enable running pre and post scripts through `.npmrc`
- Add `rimraf` as a dev-dependency
- Add `clean` to run before `build`
- Add `test` to run after `clean`
- Add `lint` to run before `test`
- Add `format` to run before `lint`
- Add `git-cliff` config file for generating changelogs

## [0.1.0] - 2023-03-15

### <!-- 03 -->Testing

- Add new tests for `cleanupBeginAndEnd`
- Add new tests for `cleanupExtraMarks`
- Add new tests for `cleanupKashidas`
- Add new tests for `cleanupLineBreaks`
- Add new tests for `cleanupRLM`
- Add new tests for `cleanupSpacing`
- Add new tests for `cleanupZWNJ`
- Add new tests for `decodeHTMLEntities`
- Add new tests for `fixArabicNumbers`
- Add new tests for `fixDashes`
- Add new tests for `cleanup`
- Add new tests for `fixDiacritics`
- Add new tests for `fixEnglishNumbers`
- Add new tests for `fixEnglishQuotesPairs`
- Add new tests for `fixEnglishQuotes`
- Add new tests for `fixHamzeh`
- Add new tests for `fixMiscNonPersianChars`
- Add new tests for `fixMiscSpacing`
- Add new tests for `fixNumeralSymbols`
- Add new tests for `fixPrefixSpacing`
- Add new tests for `fixPersianGlyphs`
- Add new tests for `fixPunctuations`
- Add new tests for `fixQuestionMark`
- Add new tests for `fixBracesSpacingInside`
- Add new tests for `fixPunctuationSpacing`
- Add new tests for `fixSuffixMisc`
- Add new tests for `fixSuffixSpacingHamzeh`
- Add new tests for `fixThreeDots`
- Add new tests for `kashidasAsParenthetic`
- Add new tests for `markdownNormalizeBraces`
- Add new tests for `markdownNormalizeLists`
- Add new tests for `normalizeDates`
- Add new tests for `normalizeEllipsis`
- Add new tests for `normalizeEOL`
- Add new tests for `preserve_braces`
- Add new tests for `preserve_brackets`
- Add new tests for `preserve_comments`
- Add new tests for `preserve_entities`
- Add new tests for `preserve_frontmatter`
- Add new tests for `preserve_HTML`
- Add new tests for `preserve_nbsps`
- Add new tests for `preserve_URIs`
- Add new tests for `removeDiacritics`
- Add new tests for `skip_markdown_ordered_lists_numbers_conversion`
- Replace `toEqual` by `toBe` on old tests

### <!-- 04 -->Refactor

- Convert javascript code to typescript
- Improve `cleanupBeginAndEnd` method
- Improve `cleanupExtraMarks` method
- Improve `cleanupKashidas` method
- Improve `cleanupLineBreaks` method
- Improve `cleanupRLM` method
- Improve `cleanupSpacing` method
- Improve `cleanupZWNJ` method
- Improve `decodeHTMLEntities` method
- Improve `fixDashes` method
- Improve `fixDiacritics` method
- Improve `fixEnglishQuotesPairs` method
- Improve `fixEnglishQuotes` method
- Improve `fixHamzeh` method
- Improve `fixMiscNonPersianChars` method
- Improve `fixMiscSpacing` method
- Improve `fixNumeralSymbols` method
- Improve `fixPrefixSpacing` method
- Improve `fixPersianGlyphs` method
- Improve `fixPunctuations` method
- Improve `fixQuestionMark` method
- Improve `fixBracesSpacingInside` method
- Update visibility of methods
- Improve `fixPunctuationSpacing` method
- Improve `fixSuffixMisc` method
- Improve `fixSuffixSpacingHamzeh` method
- Improve `fixThreeDots` method
- Improve `kashidasAsParenthetic` method
- Improve `markdownNormalizeBraces` method
- Improve `markdownNormalizeLists` method
- Improve `normalizeDates` method
- Improve `normalizeEllipsis` method
- Improve `normalizeEOL` method
- Improve `removeDiacritics` method
- Improve `parseOptions` method
- Improve `charReplace` method
- Improve `persianDigits` and `persianGlyphs`

### <!-- 08 -->Miscellaneous Tasks

- Initialize project and add initial configuration
- Setup jest and update configurations
- Setup jest and update configurations
- Rename package to `@nekofar/virastar`
- Update package `description`

<!-- generated by git-cliff -->
