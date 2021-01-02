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
        name: 'monoline string',
        lexeme: '"this include double quote \\"."',
        group: 'litterals',
        position: {line: 2, col: 9},
        attribute: 'this include double quote \\".',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 2, col: 40},
        attribute: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
