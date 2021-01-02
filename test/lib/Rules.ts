import {Group, Rule} from '../../src';

export const multiLineComment = new Rule({
  name: 'multiline comment',
  pattern: /[/][*].*?[*][/]/,
  preprocess: true,
  group: Group.COMMENTS,
});

export const monolineComment = new Rule({
  name: 'monoline comment',
  pattern: /[/][/].*?\n/,
  preprocess: true,
  generateTokenAttribute(lexeme: string) {
    return lexeme.substring(0, lexeme.length - 1);
  },
  group: Group.COMMENTS,
});

export const multilineString = new Rule({
  name: 'multiline string',
  // this regexp contains a negative lookbehind
  pattern: /`.*?(?<!\\)`/,
  preprocess: true,
  generateTokenAttribute(lexeme: string) {
    return lexeme.substring(1, lexeme.length - 1);
  },
  // note that if the multiline string does not take interpolation like in JS/TS.
  group: Group.LITTERALS,
});

export const monolineString = new Rule({
  name: 'monoline string',
  // this regexp contains a negative lookbehind
  pattern: /"[^\n]*?(?<!\\)"/,
  preprocess: true,
  generateTokenAttribute(lexeme: string) {
    return lexeme.substring(1, lexeme.length - 1);
  },
  group: Group.LITTERALS,
});

export const blank = new Rule({
  name: 'blank',
  pattern: /\s+/,
  ignore: true,
});

export const keywords = Rule.createKeywords(['var', 'const']);

export const operators = Rule.createGroup(Group.OPERATORS, [
  {
    name: 'equal',
    pattern: '=',
  },
]);

export const separators = Rule.createGroup(Group.SEPARATORS, [
  {
    name: 'semi-column',
    pattern: ';',
  },
]);

export const identifier = new Rule({
  name: 'identifier',
  pattern: /\w+/,
  group: Group.IDENTIFIERS,
});
