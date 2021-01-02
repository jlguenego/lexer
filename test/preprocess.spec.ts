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
        group: '',
        position: {line: 2, col: 1},
        attributes: '/* this is\nvar a = `\nhey\n`\n*/',
      },
      {
        name: 'var',
        lexeme: 'var',
        group: 'keyword',
        position: {line: 7, col: 1},
        attributes: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'a',
        group: 'identifier',
        position: {line: 7, col: 5},
        attributes: 'a',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {line: 7, col: 7},
        attributes: '=',
      },
      {
        name: 'multiline string',
        lexeme: '`\n/* hello */\n`',
        group: '',
        position: {line: 7, col: 9},
        attributes: '\n/* hello */\n',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
