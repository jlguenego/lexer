import {State} from '../interfaces/State';
import {SourceElement} from '../SourceElement';
import {Rule} from '../Rule';
import {positionAdd} from './position';
import {Token} from '../interfaces/Token';

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
  // building a new Regexp makes the old flags completely ignored.
  const matched = elt.text.match(new RegExp(rule.pattern, 's'));
  if (!matched) {
    return [elt];
  }
  return applyMatchOnSourceElement(elt, rule, matched, matchAll);
};

/**
 * Generate a state = [prefixSourceElt?, token, suffixSourceElt?].
 * prefix and suffix are omitted if their text is empty.
 *
 * If matchAll then use recursivity to apply the rule everywhere it is possible in the source element.
 * The output state = [se1, token, se2, token, se3, token, se4, ...]
 *
 * @param {SourceElement} elt
 * @param {Rule} rule
 * @param {RegExpMatchArray} matched
 * @param {boolean} matchAll
 * @returns {State}
 */
const applyMatchOnSourceElement = (
  elt: SourceElement,
  rule: Rule,
  matched: RegExpMatchArray,
  matchAll: boolean
): State => {
  /* istanbul ignore if */
  if (matched.index === undefined) {
    // Typescript unfortunately has typings approximation
    throw new Error(
      'When matched exists, index is always present. You should not see this.'
    );
  }

  const prefixText = elt.text.substr(0, matched.index);
  const suffixText = elt.text.substr(matched.index + matched[0].length);

  const startPos = elt.position;
  const matchPos = positionAdd(startPos, prefixText);
  const suffixPos = positionAdd(matchPos, matched[0]);

  const state: State = [];

  if (prefixText.length > 0) {
    state.push(new SourceElement(prefixText, startPos));
  }

  if (!rule.ignore) {
    state.push({
      name: rule.name,
      lexeme: matched[0],
      group: rule.group,
      position: matchPos,
      attribute: rule.generateTokenAttribute(matched[0]),
    } as Token);
  }

  if (suffixText.length > 0) {
    const se = new SourceElement(suffixText, suffixPos);
    const array = matchAll ? applyRuleOnSourceElement(se, rule) : [se];
    state.push(...array);
  }

  return state;
};
