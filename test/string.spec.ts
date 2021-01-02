import assert from 'assert';
import {Lexer} from '../src/index';
import {
  blank,
  identifier,
  keywords,
  monolineComment,
  monolineString,
  multiLineComment,
  operators,
  separators,
} from './lib/Rules';

describe('String Unit Test', () => {
  it('simple string', () => {
    const str = `
var x = "this include double quote \\".";
`;

    const rules = [
      multiLineComment,
      monolineComment,
      monolineString,
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
      },
      {
        name: 'identifier',
        lexeme: 'x',
        group: 'identifier',
        position: {line: 2, col: 5},
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {line: 2, col: 7},
      },
      {
        name: 'monoline string',
        lexeme: '"this include double quote \\"."',
        group: '',
        position: {line: 2, col: 9},
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separator',
        position: {line: 2, col: 40},
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
