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
        name: 'monoline string',
        lexeme: '"this include double quote \\"."',
        group: '',
        position: {line: 2, col: 9},
        attributes: 'this include double quote \\".',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 2, col: 40},
        attributes: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
