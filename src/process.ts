import {State} from './interfaces/State';
import {Token, TokenSequence} from './interfaces/TokenInstanceObject';
import {applyRuleOnSourceElement} from './misc';
import {Rule} from './Rule';
import {SourceElement} from './SourceElement';

export const tokenize = (state: State, rules: Rule[]): TokenSequence => {
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

const applyRule = (elts: State, rule: Rule): State => {
  const result: State = [];

  for (let i = 0; i < elts.length; i++) {
    const elt = elts[i];
    if (!(elt instanceof SourceElement)) {
      result.push(elt);
      continue;
    }
    const parsedElts = applyRuleOnSourceElement(elt, rule);
    result.push(...parsedElts);
  }
  return result;
};
