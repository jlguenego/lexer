import {Group} from './Group';

export interface RuleSpec {
  /**
   * Every rule must have a name. The name will be reported in the token
   *
   * @type {string}
   * @memberof RuleSpec
   */
  name: string;

  /**
   * Regular expression specification.
   * Note that the regexp flags are ignored.
   * There will be always replaced with the regexp 's' flag.
   *
   * @type {(RegExp | string)}
   * @memberof RuleSpec
   */
  pattern: RegExp | string;

  /**
   * When tokenizing, the token generated by this rule will be removed.
   * Example of use: blank token, comment token.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof RuleSpec
   */
  ignore?: boolean;

  /**
   * Rule Group, reported to the token.
   * Allow the user to categorize the token (see the Group enumeration)
   *
   * @default Group.NONE
   * @type {Group}
   * @memberof RuleSpec
   */
  group?: Group;

  /**
   * For performance reason, some rules must be applied in a first phase, called preprocessing.
   * During the tokenization preprocessing, only the rules with preprocess flag are applied.
   * During the tokenization, only the rules without the preprocess flag are applied.
   *
   * Preprocessing is a little bit slower phase but makes possible rules like string or comment
   * to be parsed properly, without priority of a rule on another one.
   * The priority is instead based on the application rule index in the source code.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof RuleSpec
   */
  preprocess?: boolean;

  /**
   * Generate the token attributes from the lexeme
   * Note: the lexeme is the original source code fragment corresponding to the token.
   *
   * @param {string} lexeme
   * @returns {string}
   * @memberof RuleSpec
   */
  generateTokenAttributes?(lexeme: string): unknown;
}

/**
 * Rules are applied on the source code, during tokenization, in order to produces token instances.
 * A Language definition is determined by a sequence of rules.
 *
 * @export
 * @class Rule
 */
export class Rule {
  static createKeywords(array: string[]): Rule[] {
    // longest keyword must be applied first, so we sort the array.
    return [...array]
      .sort((a, b) => b.length - a.length)
      .map(
        str =>
          new Rule({
            name: str,
            pattern: new RegExp(str),
            group: Group.KEYWORD,
          })
      );
  }

  static createGroup(group: Group, array: RuleSpec[]): Rule[] {
    return array.map(spec => new Rule({group, ...spec}));
  }

  name = '';
  pattern: RegExp | string = '';
  ignore = false;
  group = Group.NONE;
  preprocess = false;
  generateTokenAttributes = (lexeme: string) => lexeme;

  constructor(spec: RuleSpec) {
    Object.assign(this, spec);
  }
}
