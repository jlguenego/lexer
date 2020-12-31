import {TokenSequence} from './interfaces/Token';
import {preprocessorPhase} from './phases/preprocessor';
import {SourceElement} from './SourceElement';
import {Rule} from './Rule';
import {mainPhase} from './phases/main';

export class Lexer {
  rules: Rule[];
  preprocessRules: Rule[];
  constructor(rules: Rule[]) {
    this.rules = rules.filter(t => t.preprocess === false);
    this.preprocessRules = rules.filter(t => t.preprocess === true);
  }

  tokenize(source: string): TokenSequence {
    const src = convertToUnixFormat(source);

    const state = preprocessorPhase(
      [new SourceElement(src, {line: 1, col: 1})],
      this.preprocessRules
    );

    return mainPhase(state, this.rules);
  }
}

const convertToUnixFormat = (s: string) => s.replace(/\r\n/g, '\n');
