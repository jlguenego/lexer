import {TokenElement} from './interfaces/TokenElement';
import {applyTokenOnSourceElement} from './misc';
import {SourceElement} from './SourceElement';
import {Token} from './Token';
import {TokenInstance} from './TokenInstance';

export const preprocess = (
  initialState: TokenElement[],
  tokens: Token[]
): TokenElement[] => {
  let previousState: TokenElement[] = [];
  let state: TokenElement[] = initialState;
  while (state !== previousState) {
    previousState = state;
    state = getNextState(previousState, tokens);
  }

  return state;
};

const getLength = (r: TokenElement[]): number => {
  return r[0] instanceof TokenInstance ? 0 : r[0].text.length;
};

export const getNextState = (state: TokenElement[], tokens: Token[]) => {
  const sourceElt = state[state.length - 1];
  if (!(sourceElt instanceof SourceElement)) {
    return state;
  }

  const array = tokens
    .map(token => applyTokenOnSourceElement(sourceElt, token))
    .reduce(
      (acc, r) => {
        // min calc
        const rLength = getLength(r);
        const accLength = getLength(acc);
        return rLength < accLength ? r : acc;
      },
      [sourceElt] as TokenElement[]
    );
  if (array[0] === sourceElt) {
    return state;
  }
  return [...state.slice(0, -1), ...array];
};
