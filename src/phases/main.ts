import {State} from '../interfaces/State';
import {Token, TokenSequence} from '../interfaces/Token';
import {applyRuleOnSourceElement} from '../tools/apply-rule';
import {Rule} from '../Rule';
import {SourceElement} from '../SourceElement';

/**
 * Lexer main phase: rules are applied in order of the rules sequence given in input.
 * This is fast and compliant with most of the rules.
 *
 * But some rules (string, comment) cannot be well processed when nested.
 * Theses rules must be applied in the preprocess phase.
 *
 * @param {State} state
 * @param {Rule[]} rules
 * @returns {TokenSequence}
 */
export const mainPhase = (state: State, rules: Rule[]): TokenSequence => {
  for (const rule of rules) {
    if (!hasSource(state)) {
      break;
    }
    state = applyRule(state, rule);
  }
  return convertToTokenSequence(state);
};

const hasSource = (state: State) =>
  state.find(elt => elt instanceof SourceElement) !== undefined;

export const convertToTokenSequence = (state: State): Token[] => {
  return state.map(te => {
    if (te instanceof SourceElement) {
      throw new Error(
        `Syntax Error (Lexer): '${te.text}' at line ${te.position.line} and col ${te.position.col}`
      );
    }
    return te;
  });
};

const applyRule = (state: State, rule: Rule): State => {
  const result: State = [];
  for (const elt of state) {
    if (!(elt instanceof SourceElement)) {
      result.push(elt);
      continue;
    }
    result.push(...applyRuleOnSourceElement(elt, rule));
  }
  return result;
};
