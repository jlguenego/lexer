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
        position: {col: 1, line: 2},
      },
      {
        name: 'identifier',
        lexeme: 'x',
        group: 'identifier',
        position: {col: 5, line: 2},
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {col: 7, line: 2},
      },
      {
        name: 'identifier',
        lexeme: '3',
        group: 'identifier',
        position: {col: 9, line: 2},
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separator',
        position: {col: 10, line: 2},
      },
      {
        name: 'var',
        lexeme: 'var',
        group: 'keyword',
        position: {col: 1, line: 3},
      },
      {
        name: 'identifier',
        lexeme: 'y',
        group: 'identifier',
        position: {col: 5, line: 3},
      },
      {
        name: 'equal',
        lexeme: '=',
        group: 'operator',
        position: {col: 7, line: 3},
      },
      {
        name: 'identifier',
        lexeme: '52',
        group: 'identifier',
        position: {col: 9, line: 3},
      },
      {
        name: 'semi-column',
        lexeme: ';',
        group: 'separator',
        position: {col: 11, line: 3},
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
