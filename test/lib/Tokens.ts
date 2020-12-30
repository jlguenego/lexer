import {Group, Token} from '../../src';

export const multiLineComment = new Token({
  name: 'multiline comment',
  pattern: /[/][*].*?[*][/]/,
});

export const monolineComment = new Token({
  name: 'monoline comment',
  pattern: /[/][/].*\n/,
});

export const multilineString = new Token({
  name: 'monoline string',
  // this regexp contains a negative lookbehind
  pattern: /"[^\n]*?(?<!\\)"/,
});

export const monolineString = new Token({
  name: 'monoline string',
  // this regexp contains a negative lookbehind
  pattern: /"[^\n]*?(?<!\\)"/,
});

export const blank = new Token({
  name: 'blank',
  pattern: /\s+/,
  ignore: true,
});

export const keywords = Token.createKeywordTokens(['var']);

export const operators = Token.createGroupTokens(Group.OPERATOR, [
  {
    name: 'equal',
    pattern: '=',
  },
]);

export const separators = Token.createGroupTokens(Group.SEPARATOR, [
  {
    name: 'semi-column',
    pattern: ';',
  },
]);

export const identifier = new Token({
  name: 'identifier',
  pattern: /\w+/,
  group: Group.IDENTIFIER,
});
