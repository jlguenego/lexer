import {TokenObjectSequence} from './interfaces/TokenInstanceObject';
import {preprocess} from './preprocessor';
import {SourceElement} from './SourceElement';
import {Rule} from './Rule';
import {tokenize} from './process';

export class Lexer {
  rules: Rule[];
  preprocessRules: Rule[];
  constructor(tokens: Rule[]) {
    this.rules = tokens.filter(t => t.preprocess === false);
    this.preprocessRules = tokens.filter(t => t.preprocess === true);
  }

  tokenize(source: string): TokenObjectSequence {
    // convert string to UNIX format.
    const src = source.replace(/\r\n/g, '\n');

    // preprocess phase : rule are all applied according
    // a cursor going from the beginning to the end of the source code.
    // slow. To be used for rules that cannot be well applied in the process phase.
    const state = preprocess(
      [new SourceElement(src, {line: 1, col: 1})],
      this.preprocessRules
    );

    // tokenize main phase: rules are applied in order of the rules sequence given in input.
    // this is fast and compliant with most of the rules.
    return tokenize(state, this.rules);
  }
}
