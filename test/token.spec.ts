import assert from 'assert';
import {Lexer} from '../src/index';

describe('First Unit Test', () => {
  it('should test', () => {
    const str = 'var x = 3;';
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
      {name: 'var', value: 'var'},
      {name: 'identifier', value: 'x'},
      {name: 'equal', value: '='},
      {name: 'identifier', value: '3'},
      {name: 'semi-column', value: ';'},
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
