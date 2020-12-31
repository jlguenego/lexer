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
  const state: State = [];
  if (matched.index === undefined) {
    // this is to make pleasure to typescript.
    // But when we have a match we always have an index attribute.
    // In reality we will never enter in this case.
    throw new Error(
      'matched exists and index not present. Case not implemented.'
    );
  }
  const prefix = elt.text.substr(0, matched.index);
  const startPos = elt.position;
  const matchPos = positionAdd(startPos, prefix);
  const suffixPos = positionAdd(matchPos, matched[0]);
  if (matched.index > 0) {
    state.push(new SourceElement(prefix, startPos));
  }
  if (!rule.ignore) {
    // add the token in the state
    state.push({
      name: rule.name,
      value: matched[0],
      group: rule.group,
      position: matchPos,
    });
  }
  const suffixIndex = matched.index + matched[0].length;

  if (suffixIndex < elt.text.length) {
    const se = new SourceElement(elt.text.substr(suffixIndex), suffixPos);
    const array = matchAll ? applyRuleOnSourceElement(se, rule) : [se];
    state.push(...array);
  }

  return state;
};
