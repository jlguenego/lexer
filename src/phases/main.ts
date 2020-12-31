import {State} from '../interfaces/State';
import {Token, TokenSequence} from '../interfaces/Token';
import {applyRuleOnSourceElement} from '../tools/apply-rule';
import {Rule} from '../Rule';
import {SourceElement} from '../SourceElement';

export const mainPhase = (state: State, rules: Rule[]): TokenSequence => {
  let ruleIndex = 0;
  while (hasSource(state) && ruleIndex < rules.length) {
    const rule = rules[ruleIndex];
    state = applyRule(state, rule);
    ruleIndex++;
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

  for (let i = 0; i < state.length; i++) {
    const elt = state[i];
    if (!(elt instanceof SourceElement)) {
      result.push(elt);
      continue;
    }
    const parsedElts = applyRuleOnSourceElement(elt, rule);
    result.push(...parsedElts);
  }
  return result;
};
