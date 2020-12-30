import {Group, Lexer} from '../../src';

export const multiLineComment = Lexer.createToken({
  name: 'multiline comment',
  pattern: /[/][*].*?[*][/]/,
});

export const monolineComment = Lexer.createToken({
  name: 'monoline comment',
  pattern: /[/][/].*\n/,
});

export const multilineString = Lexer.createToken({
  name: 'monoline string',
  // this regexp contains a negative lookbehind
  pattern: /"[^\n]*?(?<!\\)"/,
});

export const monolineString = Lexer.createToken({
  name: 'monoline string',
  // this regexp contains a negative lookbehind
  pattern: /"[^\n]*?(?<!\\)"/,
});

export const blank = Lexer.createToken({
  name: 'blank',
  pattern: /\s+/,
  ignore: true,
});

export const keywords = Lexer.createKeywordTokens(['var']);

export const operators = Lexer.createOperatorTokens([
  {
    name: 'equal',
    pattern: '=',
  },
]);
export const separators = Lexer.createSeparatorTokens([
  {
    name: 'semi-column',
    pattern: ';',
  },
]);
export const identifier = Lexer.createToken({
  name: 'identifier',
  pattern: /\w+/,
  group: Group.IDENTIFIER,
});
