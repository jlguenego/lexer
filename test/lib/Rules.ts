import {Group, Rule} from '../../src';
import {Position} from '../../src/interfaces/Position';
import {Token} from '../../src/interfaces/Token';
import {positionAdd} from '../../src/tools/position';

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

export const varX = new Rule({
  name: 'varx',
  pattern: /(var)(\s+)(\w+)/,
  preprocess: false,
  expand: (match: RegExpMatchArray, position: Position) => {
    return [
      {
        name: match[1],
        group: Group.KEYWORDS,
        attribute: 'var',
        lexeme: 'var',
        position: position,
      },
      {
        name: 'variableIdentifier',
        group: Group.IDENTIFIERS,
        attribute: match[3],
        lexeme: match[3],
        position: positionAdd(position, match[1] + match[2]),
      },
    ];
  },
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

export const indent = new Rule({
  name: 'indent',
  pattern: /\n( *)/,
  group: Group.SEPARATORS,
  expand: (
    match: RegExpMatchArray,
    position: Position,
    ctxt: {level?: number}
  ) => {
    ctxt.level = ctxt.level ?? 0;
    const spaceNbr = match[1].length;
    const nextLevel = spaceNbr / 2;
    const diff = nextLevel - ctxt.level;
    ctxt.level = nextLevel;
    if (diff > 0) {
      const indentTk: Token = {
        name: 'indent',
        attribute: undefined,
        group: Group.SEPARATORS,
        lexeme: '',
        position: position,
      };
      return new Array(diff).fill(indentTk);
    }
    if (diff < 0) {
      const dedentTk: Token = {
        name: 'dedent',
        attribute: undefined,
        group: Group.SEPARATORS,
        lexeme: '',
        position: position,
      };
      return new Array(-diff).fill(dedentTk);
    }

    // diff === 0
    return [];
  },
});
