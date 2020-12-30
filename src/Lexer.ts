import {TokenElement} from './interfaces/TokenElement';
import {TokenObject} from './interfaces/TokenInstanceObject';
import {applyTokenOnSourceElement} from './misc';
import {preprocess} from './preprocessor';
import {SourceElement} from './SourceElement';
import {Rule} from './Rule';
import {Token} from './Token';

export class Lexer {
  tokens: Rule[];
  preprocessToken: Rule[];
  constructor(tokens: Rule[]) {
    this.tokens = tokens.filter(t => t.preprocess === false);
    this.preprocessToken = tokens.filter(t => t.preprocess === true);
  }

  tokenize(source: string): TokenObject[] {
    const src = source.replace(/\r\n/g, '\n');
    const srcElt = new SourceElement(src, {line: 1, col: 1});
    const initialState: TokenElement[] = [srcElt];

    let state = preprocess(initialState, this.preprocessToken);
    let tokenIndex = 0;
    while (hasSource(state) && tokenIndex < this.tokens.length) {
      const token = this.tokens[tokenIndex];
      state = applyToken(state, token);
      tokenIndex++;
    }
    const finalState = checkAllIsTokenized(state);

    return finalState.map(ti => ti.toObject()) as Token[];
  }
}

const checkAllIsTokenized = (state: TokenElement[]): Token[] => {
  return state.map(te => {
    if (te instanceof SourceElement) {
      throw new Error(
        `Did not tokenize everything: '${te.text}' at line ${te.position.line} and col ${te.position.col}`
      );
    }
    return te;
  });
};

const hasSource = (state: TokenElement[]) =>
  state.find(elt => elt instanceof SourceElement) !== undefined;

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
