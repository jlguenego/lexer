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
        attributes: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'x',
        group: 'identifiers',
        position: {line: 2, col: 5},
        attributes: 'x',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operators',
        position: {line: 2, col: 7},
        attributes: '=',
      },
      {
        name: 'identifier',
        lexeme: '3',
        group: 'identifiers',
        position: {line: 2, col: 9},
        attributes: '3',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 2, col: 10},
        attributes: ';',
      },
      {
        name: 'monoline comment',
        lexeme: '// ok super\n',
        group: '',
        position: {line: 2, col: 12},
        attributes: '// ok super',
      },
      {
        name: 'monoline comment',
        lexeme: '// yes, good. // yes again\n',
        group: '',
        position: {line: 3, col: 1},
        attributes: '// yes, good. // yes again',
      },
      {
        name: 'monoline comment',
        lexeme: '// yes again again\n',
        group: '',
        position: {line: 4, col: 1},
        attributes: '// yes again again',
      },
      {
        name: 'multiline comment',
        lexeme: '/* ok */',
        group: '',
        position: {line: 5, col: 1},
        attributes: '/* ok */',
      },
      {
        name: 'multiline comment',
        lexeme: '/* this is\na multi line comment with var x = 56 */',
        group: '',
        position: {line: 6, col: 1},
        attributes: '/* this is\na multi line comment with var x = 56 */',
      },
      {
        name: 'var',
        lexeme: 'var',
        group: 'keywords',
        position: {line: 8, col: 1},
        attributes: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'y',
        group: 'identifiers',
        position: {line: 8, col: 5},
        attributes: 'y',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operators',
        position: {line: 8, col: 7},
        attributes: '=',
      },
      {
        name: 'multiline comment',
        lexeme: '/* in the middle of an instruction */',
        group: '',
        position: {line: 8, col: 9},
        attributes: '/* in the middle of an instruction */',
      },
      {
        name: 'identifier',
        lexeme: '52',
        group: 'identifiers',
        position: {line: 8, col: 47},
        attributes: '52',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 8, col: 49},
        attributes: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
