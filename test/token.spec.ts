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
        name: 'var',
        lexeme: 'var',
        group: 'keyword',
        position: {line: 3, col: 1},
        value: 'var',
      },
      {
        name: 'identifier',
        lexeme: 'y',
        group: 'identifier',
        position: {line: 3, col: 5},
        value: 'y',
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {line: 3, col: 7},
        value: '=',
      },
      {
        name: 'identifier',
        lexeme: '52',
        group: 'identifier',
        position: {line: 3, col: 9},
        value: '52',
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separator',
        position: {line: 3, col: 11},
        value: ';',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
