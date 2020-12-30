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
        value: 'var',
        group: 'keyword',
        position: {line: 2, col: 1},
      },
      {
        name: 'identifier',
        value: 'x',
        group: 'identifier',
        position: {line: 2, col: 5},
      },
      {
        name: 'equal',
        value: '=',
        group: 'operator',
        position: {line: 2, col: 7},
      },
      {
        name: 'identifier',
        value: '3',
        group: 'identifier',
        position: {line: 2, col: 9},
      },
      {
        name: 'semi-column',
        value: ';',
        group: 'separator',
        position: {line: 2, col: 10},
      },
      {
        name: 'monoline comment',
        value: '// ok super\n',
        group: '',
        position: {line: 2, col: 12},
      },
      {
        name: 'monoline comment',
        value: '// yes, good. // yes again\n',
        group: '',
        position: {line: 3, col: 1},
      },
      {
        name: 'monoline comment',
        value: '// yes again again\n',
        group: '',
        position: {line: 4, col: 1},
      },
      {
        name: 'multiline comment',
        value: '/* ok */',
        group: '',
        position: {line: 5, col: 1},
      },
      {
        name: 'multiline comment',
        value: '/* this is\na multi line comment with var x = 56 */',
        group: '',
        position: {line: 6, col: 1},
      },
      {
        name: 'var',
        value: 'var',
        group: 'keyword',
        position: {line: 8, col: 1},
      },
      {
        name: 'identifier',
        value: 'y',
        group: 'identifier',
        position: {line: 8, col: 5},
      },
      {
        name: 'equal',
        value: '=',
        group: 'operator',
        position: {line: 8, col: 7},
      },
      {
        name: 'multiline comment',
        value: '/* in the middle of an instruction */',
        group: '',
        position: {line: 8, col: 9},
      },
      {
        name: 'identifier',
        value: '52',
        group: 'identifier',
        position: {line: 8, col: 47},
      },
      {
        name: 'semi-column',
        value: ';',
        group: 'separator',
        position: {line: 8, col: 49},
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
