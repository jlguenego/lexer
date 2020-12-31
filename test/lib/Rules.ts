import {Group, Rule} from '../../src';

export const multiLineComment = new Rule({
  name: 'multiline comment',
  pattern: /[/][*].*?[*][/]/,
  preprocess: true,
});

export const monolineComment = new Rule({
  name: 'monoline comment',
  pattern: /[/][/].*?\n/,
  preprocess: true,
});

export const multilineString = new Rule({
  name: 'multiline string',
  // this regexp contains a negative lookbehind
  pattern: /`.*?(?<!\\)`/,
  preprocess: true,
});

export const monolineString = new Rule({
  name: 'monoline string',
  // this regexp contains a negative lookbehind
  pattern: /"[^\n]*?(?<!\\)"/,
  preprocess: true,
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
