import {State} from '../interfaces/State';
import {applyRuleOnSourceElement} from '../tools/apply-rule';
import {SourceElement} from '../SourceElement';
import {Rule} from '../Rule';

/**
 * lexer preprocess phase - rules are all applied according a cursor going
 * from the beginning to the end of the source code.
 *
 * Warning: slow method.
 * To be used for rules that cannot be well applied in the lexer main phase.
 *
 * @param {State} initialState
 * @param {Rule[]} rules
 * @returns {State}
 */
export const preprocessorPhase = (
  initialState: State,
  rules: Rule[]
): State => {
  let previousState: State = [];
  let state = initialState;
  while (state !== previousState) {
    previousState = state;
    state = getNextState(previousState, rules);
  }
  return state;
};

const getPrefixLength = (r: State): number => {
  return r[0] instanceof SourceElement ? r[0].text.length : 0;
};

export const getNextState = (state: State, rules: Rule[]) => {
  const sourceElt = state[state.length - 1];

  // if no more source code to preprocess then end the preprocess phase
  // by returning the same state.
  if (!(sourceElt instanceof SourceElement)) {
    return state;
  }

  const suffixState = rules
    .map(rule => applyRuleOnSourceElement(sourceElt, rule, false))
    .reduce(
      (acc, r) => {
        // find the minimum size of the prefix
        return getPrefixLength(r) < getPrefixLength(acc) ? r : acc;
      },
      [sourceElt] as State
    );

  // if no rule where applied, return identical state (to end of preprocess phase).
  if (suffixState[0] === sourceElt) {
    return state;
  }

  // replace the last source element with the suffixState content.
  return [...state.slice(0, -1), ...suffixState];
};
