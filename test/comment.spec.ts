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
        group: 'keywords',
        position: {line: 2, col: 1},
        attribute: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'x',
        group: 'identifiers',
        position: {line: 2, col: 5},
        attribute: 'x',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operators',
        position: {line: 2, col: 7},
        attribute: '=',
      },
      {
        name: 'identifier',
        lexeme: '3',
        group: 'identifiers',
        position: {line: 2, col: 9},
        attribute: '3',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 2, col: 10},
        attribute: ';',
      },
      {
        name: 'monoline comment',
        lexeme: '// ok super\n',
        group: 'comments',
        position: {line: 2, col: 12},
        attribute: '// ok super',
      },
      {
        name: 'monoline comment',
        lexeme: '// yes, good. // yes again\n',
        group: 'comments',
        position: {line: 3, col: 1},
        attribute: '// yes, good. // yes again',
      },
      {
        name: 'monoline comment',
        lexeme: '// yes again again\n',
        group: 'comments',
        position: {line: 4, col: 1},
        attribute: '// yes again again',
      },
      {
        name: 'multiline comment',
        lexeme: '/* ok */',
        group: 'comments',
        position: {line: 5, col: 1},
        attribute: '/* ok */',
      },
      {
        name: 'multiline comment',
        lexeme: '/* this is\na multi line comment with var x = 56 */',
        group: 'comments',
        position: {line: 6, col: 1},
        attribute: '/* this is\na multi line comment with var x = 56 */',
      },
      {
        name: 'var',
        lexeme: 'var',
        group: 'keywords',
        position: {line: 8, col: 1},
        attribute: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'y',
        group: 'identifiers',
        position: {line: 8, col: 5},
        attribute: 'y',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operators',
        position: {line: 8, col: 7},
        attribute: '=',
      },
      {
        name: 'multiline comment',
        lexeme: '/* in the middle of an instruction */',
        group: 'comments',
        position: {line: 8, col: 9},
        attribute: '/* in the middle of an instruction */',
      },
      {
        name: 'identifier',
        lexeme: '52',
        group: 'identifiers',
        position: {line: 8, col: 47},
        attribute: '52',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 8, col: 49},
        attribute: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
