import {Group} from './Group';
import {
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
    const sourceElt = new SourceElement(source);
    const initialState: TokenElement[] = [sourceElt];
    let state = initialState;
    let tokenIndex = 0;
    while (hasSource(state) && tokenIndex < this.tokens.length) {
      const token = this.tokens[tokenIndex];
      state = applyToken(state, token);
      tokenIndex++;
    }

    return (state as TokenInstance[]).map(ti =>
      ti.getValue()
    ) as TokenInstance[];
  }
}

const hasSource = (state: TokenElement[]) =>
  state.find(elt => elt instanceof SourceElement) !== undefined;

const applyToken = (elts: TokenElement[], token: Token): TokenElement[] => {
  const result: TokenElement[] = [];
  for (let i = 0; i < elts.length; i++) {
    const parsedElts = applyTokenOnTokenElement(elts[i], token);
    result.push(...parsedElts);
  }
  return result;
};

const applyTokenOnTokenElement = (
  elt: TokenElement,
  token: Token
): TokenElement[] => {
  if (!(elt instanceof SourceElement)) {
    return [elt];
  }
  const matched = elt.text.match(new RegExp(token.pattern));
  if (!matched) {
    return [elt];
  }
  const result: TokenElement[] = [];
  if (matched.index === undefined) {
    throw new Error(
      'matched exists and index not present. Case not implemented.'
    );
  }
  if (matched.index > 0) {
    result.push(new SourceElement(elt.text.substr(0, matched.index)));
  }
  if (!token.ignore) {
    result.push(new TokenInstance(token.name, matched[0], token.group));
  }
  const remainingIndex = matched.index + matched[0].length;
  if (remainingIndex < elt.text.length) {
    result.push(
      ...applyTokenOnTokenElement(
        new SourceElement(elt.text.substr(remainingIndex)),
        token
      )
    );
  }
  return result;
};
