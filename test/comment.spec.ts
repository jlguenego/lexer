import assert from 'assert';
import {Lexer} from '../src/index';
import {blank, identifier, keywords, operators, separators} from './lib/Tokens';

describe('Comment Unit Test', () => {
  it('simple comment', () => {
    const str = `
var x = 3; // ok super
// yes, good. // yes again
// yes again again
/* ok */
var y = /* in the middle of an instruction */ 52;
`;

    const monolineComment = Lexer.createToken({
      name: 'monoline comment',
      pattern: /[/][/].*$/,
    });
    const monolineComment2 = Lexer.createToken({
      name: 'monoline comment 2',
      pattern: /[/][*].*[*][/]/,
    });

    const tokens = [
      monolineComment,
      monolineComment2,
      blank,
      ...keywords,
      ...operators,
      ...separators,
      identifier,
    ];
    const tokenSequence = new Lexer(tokens).tokenize(str);
    const expectedTokenSequence = [
      {
        name: 'var',
        value: 'var',
        group: 'keyword',
        position: {col: 1, line: 2},
      },
      {
        name: 'identifier',
        value: 'x',
        group: 'identifier',
        position: {col: 5, line: 2},
      },
      {
        name: 'equal',
        value: '=',
        group: 'operator',
        position: {col: 7, line: 2},
      },
      {
        name: 'identifier',
        value: '3',
        group: 'identifier',
        position: {col: 9, line: 2},
      },
      {
        name: 'semi-column',
        value: ';',
        group: 'separator',
        position: {col: 10, line: 2},
      },
      {
        name: 'monoline comment',
        value: '// ok super',
        group: '',
        position: {col: 12, line: 2},
      },
      {
        name: 'monoline comment',
        value: '// yes, good. // yes again',
        group: '',
        position: {col: 1, line: 3},
      },
      {
        name: 'monoline comment',
        value: '// yes again again',
        group: '',
        position: {col: 1, line: 4},
      },
      {
        name: 'monoline comment 2',
        value: '/* ok */',
        group: '',
        position: {col: 1, line: 5},
      },
      {
        name: 'var',
        value: 'var',
        group: 'keyword',
        position: {col: 1, line: 6},
      },
      {
        name: 'identifier',
        value: 'y',
        group: 'identifier',
        position: {col: 5, line: 6},
      },
      {
        name: 'equal',
        value: '=',
        group: 'operator',
        position: {col: 7, line: 6},
      },
      {
        name: 'monoline comment 2',
        value: '/* in the middle of an instruction */',
        group: '',
        position: {col: 9, line: 6},
      },
      {
        name: 'identifier',
        value: '52',
        group: 'identifier',
        position: {col: 47, line: 6},
      },
      {
        name: 'semi-column',
        value: ';',
        group: 'separator',
        position: {col: 49, line: 6},
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
