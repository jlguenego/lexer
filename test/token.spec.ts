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
        name: 'var',
        value: 'var',
        group: 'keyword',
        position: {col: 1, line: 3},
      },
      {
        name: 'identifier',
        value: 'y',
        group: 'identifier',
        position: {col: 5, line: 3},
      },
      {
        name: 'equal',
        value: '=',
        group: 'operator',
        position: {col: 7, line: 3},
      },
      {
        name: 'identifier',
        value: '52',
        group: 'identifier',
        position: {col: 9, line: 3},
      },
      {
        name: 'semi-column',
        value: ';',
        group: 'separator',
        position: {col: 11, line: 3},
      },
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
