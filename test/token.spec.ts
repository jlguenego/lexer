import assert from 'assert';
import {Group} from '../src/Group';
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
      {name: 'var', value: 'var', group: 'keyword'},
      {name: 'identifier', value: 'x', group: 'identifier'},
      {name: 'equal', value: '=', group: 'operator'},
      {name: 'identifier', value: '3', group: 'identifier'},
      {name: 'semi-column', value: ';', group: 'separator'},
    ];
    assert.deepStrictEqual(tokenSequence, expectedTokenSequence);
  });
});
