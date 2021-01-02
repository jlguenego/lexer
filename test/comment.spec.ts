import assert from 'assert';
import {Lexer} from '../src/index';
import {
  blank,
  identifier,
  keywords,
  monolineComment,
  multiLineComment,
  operators,
  separators,
} from './lib/Rules';

describe('Comment Unit Test', () => {
  it('simple comment', () => {
    const str = `
var x = 3; // ok super
// yes, good. // yes again
// yes again again
/* ok */
/* this is
a multi line comment with var x = 56 */
var y = /* in the middle of an instruction */ 52;
`;

    const rules = [
      multiLineComment,
      monolineComment,
      blank,
      ...keywords,
      ...operators,
      ...separators,
      identifier,
    ];
    const tokenSequence = new Lexer(rules).tokenize(str);
    const expectedTokenSequence = [
      {
        name: 'var',
        lexeme: 'var',
        group: 'keyword',
        position: {line: 2, col: 1},
        value: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'x',
        group: 'identifier',
        position: {line: 2, col: 5},
        value: 'x',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {line: 2, col: 7},
        value: '=',
      },
      {
        name: 'identifier',
        lexeme: '3',
        group: 'identifier',
        position: {line: 2, col: 9},
        value: '3',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separator',
        position: {line: 2, col: 10},
        value: ';',
      },
      {
        name: 'monoline comment',
        lexeme: '// ok super\n',
        group: '',
        position: {line: 2, col: 12},
        value: '// ok super',
      },
      {
        name: 'monoline comment',
        lexeme: '// yes, good. // yes again\n',
        group: '',
        position: {line: 3, col: 1},
        value: '// yes, good. // yes again',
      },
      {
        name: 'monoline comment',
        lexeme: '// yes again again\n',
        group: '',
        position: {line: 4, col: 1},
        value: '// yes again again',
      },
      {
        name: 'multiline comment',
        lexeme: '/* ok */',
        group: '',
        position: {line: 5, col: 1},
        value: '/* ok */',
      },
      {
        name: 'multiline comment',
        lexeme: '/* this is\na multi line comment with var x = 56 */',
        group: '',
        position: {line: 6, col: 1},
        value: '/* this is\na multi line comment with var x = 56 */',
      },
      {
        name: 'var',
        lexeme: 'var',
        group: 'keyword',
        position: {line: 8, col: 1},
        value: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'y',
        group: 'identifier',
        position: {line: 8, col: 5},
        value: 'y',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {line: 8, col: 7},
        value: '=',
      },
      {
        name: 'multiline comment',
        lexeme: '/* in the middle of an instruction */',
        group: '',
        position: {line: 8, col: 9},
        value: '/* in the middle of an instruction */',
      },
      {
        name: 'identifier',
        lexeme: '52',
        group: 'identifier',
        position: {line: 8, col: 47},
        value: '52',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separator',
        position: {line: 8, col: 49},
        value: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
