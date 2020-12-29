import assert from 'assert';
import {Group} from '../src/Group';
import {Lexer} from '../src/index';

describe('First Unit Test', () => {
  it('should test', () => {
    const str = `
var x = 3;
var y = 52;
`;
    const blank = Lexer.createToken({
      name: 'blank',
      pattern: /\s+/,
      ignore: true,
    });
    const keywords = Lexer.createKeywordTokens(['var']);
    const operators = Lexer.createOperatorTokens([
      {
        name: 'equal',
        pattern: '=',
      },
    ]);
    const separators = Lexer.createSeparatorTokens([
      {
        name: 'semi-column',
        pattern: ';',
      },
    ]);
    const identifier = Lexer.createToken({
      name: 'identifier',
      pattern: /\w+/,
      group: Group.IDENTIFIER,
    });

    const tokens = [
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
