import {State} from './interfaces/State';
import {applyTokenOnSourceElement} from './misc';
import {SourceElement} from './SourceElement';
import {Rule} from './Rule';
import {Token} from './Token';

export const preprocess = (initialState: State, tokens: Rule[]): State => {
  let previousState: State = [];
  let state: State = initialState;
  while (state !== previousState) {
    previousState = state;
    state = getNextState(previousState, tokens);
  }

  return state;
};

const getLength = (r: State): number => {
  return r[0] instanceof Token ? 0 : r[0].text.length;
};

export const getNextState = (state: State, tokens: Rule[]) => {
  const sourceElt = state[state.length - 1];
  if (!(sourceElt instanceof SourceElement)) {
    return state;
  }

  const array = tokens
    .map(token => applyTokenOnSourceElement(sourceElt, token, false))
    .reduce(
      (acc, r) => {
        // min calc
        const rLength = getLength(r);
        const accLength = getLength(acc);
        return rLength < accLength ? r : acc;
      },
      [sourceElt] as State
    );
  if (array[0] === sourceElt) {
    return state;
  }
  return [...state.slice(0, -1), ...array];
};
