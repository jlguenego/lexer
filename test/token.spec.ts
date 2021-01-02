import assert from 'assert';
import {Lexer} from '../src/index';
import {blank, identifier, keywords, operators, separators} from './lib/Rules';

describe('First Unit Test', () => {
  it('simple token', () => {
    const str = `
var x = 3;
var y = 52;
`;

    const rules = [blank, ...keywords, ...operators, ...separators, identifier];
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
        name: 'var',
        lexeme: 'var',
        group: 'keywords',
        position: {line: 3, col: 1},
        attribute: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'y',
        group: 'identifiers',
        position: {line: 3, col: 5},
        attribute: 'y',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operators',
        position: {line: 3, col: 7},
        attribute: '=',
      },
      {
        name: 'identifier',
        lexeme: '52',
        group: 'identifiers',
        position: {line: 3, col: 9},
        attribute: '52',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separators',
        position: {line: 3, col: 11},
        attribute: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
