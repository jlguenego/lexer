import assert from 'assert';
import {Lexer} from '../src/index';
import {
  blank,
  identifier,
  keywords,
  monolineComment,
  multiLineComment,
  multilineString,
  operators,
  separators,
} from './lib/Rules';

describe('Preprocess Unit Test', () => {
  it('should preprocess', () => {
    const str = `
/* this is
var a = \`
hey
\`
*/
var a = \`
/* hello */
\`
`;

    const rules = [
      multiLineComment,
      monolineComment,
      multilineString,
      blank,
      ...keywords,
      ...operators,
      ...separators,
      identifier,
    ];
    const tokenSequence = new Lexer(rules).tokenize(str);
    const expectedTokenSequence = [
      {
        name: 'multiline comment',
        lexeme: '/* this is\nvar a = `\nhey\n`\n*/',
        group: 'comments',
        position: {line: 2, col: 1},
        attribute: '/* this is\nvar a = `\nhey\n`\n*/',
      },
      {
        name: 'var',
        lexeme: 'var',
        group: 'keywords',
        position: {line: 7, col: 1},
        attribute: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'a',
        group: 'identifiers',
        position: {line: 7, col: 5},
        attribute: 'a',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operators',
        position: {line: 7, col: 7},
        attribute: '=',
      },
      {
        name: 'multiline string',
        lexeme: '`\n/* hello */\n`',
        group: 'litterals',
        position: {line: 7, col: 9},
        attribute: '\n/* hello */\n',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
