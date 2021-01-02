import assert from 'assert';
import {Lexer} from '../src/index';
import {identifier, multilineString} from './lib/Rules';

describe('Basic Unit Test', () => {
  it('test empty source code', () => {
    const str = '';
    const rules = [identifier];
    const tokenSequence = new Lexer(rules).tokenize(str);
    assert.deepStrictEqual(tokenSequence, []);
  });
  it('only preprocess', () => {
    const str = '`titi`';
    const rules = [multilineString];
    const tokenSequence = new Lexer(rules).tokenize(str);
    assert.deepStrictEqual(tokenSequence, [
      {
        name: 'multiline string',
        lexeme: '`titi`',
        group: '',
        position: {line: 1, col: 1},
        attributes: 'titi',
      },
    ]);
  });
});
