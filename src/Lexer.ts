import {Group} from './Group';
import {
  Position,
  Token,
  TokenElement,
  TokenInstanceObject,
  TokenSpec,
} from './interfaces/Token';
import {SourceElement} from './SourceElement';
import {TokenInstance} from './TokenInstance';

export class Lexer {
  static createToken(spec: TokenSpec) {
    const token: Token = {
      ignore: false,
      group: Group.NONE,
      ...spec,
    };
    return token;
  }

  static createKeywordTokens(array: string[]) {
    return array.map(str =>
      Lexer.createToken({
        name: str,
        pattern: new RegExp(str),
        group: Group.KEYWORD,
      })
    );
  }

  static createOperatorTokens(array: TokenSpec[]) {
    return array.map(spec =>
      Lexer.createToken({group: Group.OPERATOR, ...spec})
    );
  }
  static createSeparatorTokens(array: TokenSpec[]) {
    return array.map(spec =>
      Lexer.createToken({group: Group.SEPARATOR, ...spec})
    );
  }

  constructor(public tokens: Token[]) {}

  tokenize(source: string): TokenInstanceObject[] {
    const src = source.replace(/\r\n/g, '\n');
    const srcElt = new SourceElement(src, {line: 1, col: 1});
    const initialState: TokenElement[] = [srcElt];

    let state = initialState;
    let tokenIndex = 0;
    while (hasSource(state) && tokenIndex < this.tokens.length) {
      const token = this.tokens[tokenIndex];
      state = applyToken(state, token);
      tokenIndex++;
    }
    const finalState = checkAllIsTokenized(state);

    return finalState.map(ti => ti.getValue()) as TokenInstance[];
  }
}

const checkAllIsTokenized = (state: TokenElement[]): TokenInstance[] => {
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

const applyToken = (elts: TokenElement[], token: Token): TokenElement[] => {
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

const applyTokenOnSourceElement = (
  elt: SourceElement,
  token: Token
): TokenElement[] => {
  // remove empty line from tokenize.
  if (elt.text.length === 0) {
    return [];
  }
  const matched = elt.text.match(new RegExp(token.pattern, 's'));
  if (!matched) {
    return [elt];
  }
  const result: TokenElement[] = [];
  if (matched.index === undefined) {
    throw new Error(
      'matched exists and index not present. Case not implemented.'
    );
  }
  const prefix = elt.text.substr(0, matched.index);
  const posStart = elt.position;
  const posMatch = positionAdd(posStart, prefix);
  const posSuffix = positionAdd(posMatch, matched[0]);
  if (matched.index > 0) {
    result.push(new SourceElement(prefix, posStart));
  }
  if (!token.ignore) {
    result.push(
      new TokenInstance(token.name, matched[0], token.group, posMatch)
    );
  }
  const remainingIndex = matched.index + matched[0].length;
  if (remainingIndex < elt.text.length) {
    result.push(
      ...applyTokenOnSourceElement(
        new SourceElement(elt.text.substr(remainingIndex), posSuffix),
        token
      )
    );
  }
  return result;
};

const positionAdd = (pos: Position, str: string): Position => {
  const lines = str.split('\n');
  if (lines.length === 1) {
    return {line: pos.line, col: pos.col + str.length};
  }
  return {
    line: pos.line + lines.length - 1,
    col: lines[lines.length - 1].length + 1,
  };
};
