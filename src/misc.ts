import {Position} from './interfaces/Position';
import {TokenElement} from './interfaces/State';
import {SourceElement} from './SourceElement';
import {Rule} from './Rule';
import {Token} from './Token';

export const positionAdd = (pos: Position, str: string): Position => {
  const lines = str.split('\n');
  if (lines.length === 1) {
    return {line: pos.line, col: pos.col + str.length};
  }
  return {
    line: pos.line + lines.length - 1,
    col: lines[lines.length - 1].length + 1,
  };
};

export const applyTokenOnSourceElement = (
  elt: SourceElement,
  token: Rule,
  global = true
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
    result.push(new Token(token.name, matched[0], token.group, posMatch));
  }
  const remainingIndex = matched.index + matched[0].length;

  if (remainingIndex < elt.text.length) {
    const se = new SourceElement(elt.text.substr(remainingIndex), posSuffix);
    const array = global ? applyTokenOnSourceElement(se, token) : [se];
    result.push(...array);
  }

  return result;
};
