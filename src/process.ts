import {TokenElement} from './interfaces/TokenElement';
import {TokenObjectSequence} from './interfaces/TokenInstanceObject';
import {applyTokenOnSourceElement} from './misc';
import {Rule} from './Rule';
import {SourceElement} from './SourceElement';
import {Token} from './Token';

export const tokenize = (
  state: TokenElement[],
  rules: Rule[]
): TokenObjectSequence => {
  let tokenIndex = 0;
  while (hasSource(state) && tokenIndex < rules.length) {
    const token = rules[tokenIndex];
    state = applyToken(state, token);
    tokenIndex++;
  }
  const finalState = convertToTokenSequence(state);

  return finalState.map(ti => ti.toObject());
};

const hasSource = (state: TokenElement[]) =>
  state.find(elt => elt instanceof SourceElement) !== undefined;

export const convertToTokenSequence = (state: TokenElement[]): Token[] => {
  return state.map(te => {
    if (te instanceof SourceElement) {
      throw new Error(
        `Did not tokenize everything: '${te.text}' at line ${te.position.line} and col ${te.position.col}`
      );
    }
    return te;
  });
};

const applyToken = (elts: TokenElement[], token: Rule): TokenElement[] => {
  const result: TokenElement[] = [];

  for (let i = 0; i < elts.length; i++) {
    const elt = elts[i];
    if (!(elt instanceof SourceElement)) {
      result.push(elt);
      continue;
    }
    const parsedElts = applyTokenOnSourceElement(elt, token);
    result.push(...parsedElts);
  }
  return result;
};
