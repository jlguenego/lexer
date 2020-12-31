import {State} from '../interfaces/State';
import {SourceElement} from '../SourceElement';
import {Rule} from '../Rule';
import {positionAdd} from './position';

/**
 * Apply a rule on a source element.
 *
 * @param {SourceElement} elt
 * @param {Rule} rule
 * @param {boolean} [matchAll=true] if false, match the rule only once
 * @returns {State} An array of source fragment and token
 */
export const applyRuleOnSourceElement = (
  elt: SourceElement,
  rule: Rule,
  matchAll = true
): State => {
  // remove empty line from tokenize.
  if (elt.text.length === 0) {
    return [];
  }
  // building a new Regexp make the old flags completely ignored.
  const matched = elt.text.match(new RegExp(rule.pattern, 's'));
  if (!matched) {
    return [elt];
  }
  const result: State = [];
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
  if (!rule.ignore) {
    result.push({
      name: rule.name,
      value: matched[0],
      group: rule.group,
      position: posMatch,
    });
  }
  const remainingIndex = matched.index + matched[0].length;

  if (remainingIndex < elt.text.length) {
    const se = new SourceElement(elt.text.substr(remainingIndex), posSuffix);
    const array = matchAll ? applyRuleOnSourceElement(se, rule) : [se];
    result.push(...array);
  }

  return result;
};
