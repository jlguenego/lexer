import assert from 'assert';
import {Lexer} from '../src/index';
import {
  blank,
  identifier,
  keywords,
  monolineComment,
  multiLineComment,
  operators,
  separators,
} from './lib/Rules';

describe('Error Unit Test', () => {
  it('should go on error', () => {
    const str = `
/* small comment */
var x = 3; 
    /* this comment does not end...
`;

    const rules = [
      multiLineComment,
      monolineComment,
      blank,
      ...keywords,
      ...operators,
      ...separators,
      identifier,
    ];
    try {
      new Lexer(rules).tokenize(str);
      assert.fail('should not reach this.');
    } catch (e) {
      assert.deepStrictEqual(
        e.message,
        "Syntax Error (Lexer): '/*' at line 4 and col 5"
      );
    }
  });
});
