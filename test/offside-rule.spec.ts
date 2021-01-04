import assert from 'assert';
import {Lexer} from '../src/index';
import {blank, identifier, indent} from './lib/Rules';

describe('Indent Unit Test', () => {
  it('test indent', () => {
    const str = `
toto
    titi tete
    tata
      tutu
tyty
`;

    const rules = [indent, blank, identifier];
    const tokenSequence = new Lexer(rules).tokenize(str);
    const expectedTokenSequence = [
      {
        name: 'identifier',
        lexeme: 'toto',
        group: 'identifiers',
        position: {line: 2, col: 1},
        attribute: 'toto',
      },
      {
        name: 'indent',
        attribute: undefined,
        group: 'separators',
        lexeme: '',
        position: {line: 2, col: 5},
      },
      {
        name: 'indent',
        attribute: undefined,
        group: 'separators',
        lexeme: '',
        position: {line: 2, col: 5},
      },
      {
        name: 'identifier',
        lexeme: 'titi',
        group: 'identifiers',
        position: {line: 3, col: 5},
        attribute: 'titi',
      },
      {
        name: 'identifier',
        lexeme: 'tete',
        group: 'identifiers',
        position: {line: 3, col: 10},
        attribute: 'tete',
      },
      {
        name: 'identifier',
        lexeme: 'tata',
        group: 'identifiers',
        position: {line: 4, col: 5},
        attribute: 'tata',
      },
      {
        name: 'indent',
        attribute: undefined,
        group: 'separators',
        lexeme: '',
        position: {line: 4, col: 9},
      },
      {
        name: 'identifier',
        lexeme: 'tutu',
        group: 'identifiers',
        position: {line: 5, col: 7},
        attribute: 'tutu',
      },
      {
        name: 'dedent',
        attribute: undefined,
        group: 'separators',
        lexeme: '',
        position: {line: 5, col: 11},
      },
      {
        name: 'dedent',
        attribute: undefined,
        group: 'separators',
        lexeme: '',
        position: {line: 5, col: 11},
      },
      {
        name: 'dedent',
        attribute: undefined,
        group: 'separators',
        lexeme: '',
        position: {line: 5, col: 11},
      },
      {
        name: 'identifier',
        lexeme: 'tyty',
        group: 'identifiers',
        position: {line: 6, col: 1},
        attribute: 'tyty',
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
