import {State} from '../interfaces/State';
import {applyRuleOnSourceElement} from '../tools/apply-rule';
import {SourceElement} from '../SourceElement';
import {Rule} from '../Rule';

export const preprocessorPhase = (
  initialState: State,
  rules: Rule[]
): State => {
  let previousState: State = [];
  let state: State = initialState;
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
  if (suffixState[0] === sourceElt) {
    return state;
  }
  // replace the last source element with the suffixState content.
  return [...state.slice(0, -1), ...suffixState];
};
