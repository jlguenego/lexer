import {Group} from './Group';
import {Position} from './interfaces/Position';
import {State} from './interfaces/State';
import {Token} from './interfaces/Token';

export type RuleExpandFn = (
  match: RegExpMatchArray,
  position: Position
) => State;

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
   * Generate the token attribute from the lexeme
   * Note: the lexeme is the original source code fragment corresponding to the token.
   *
   * @param {string} lexeme
   * @returns {string}
   * @memberof RuleSpec
   */
  generateTokenAttribute?(lexeme: string): unknown;

  /**
   * Allows a rule to transform a lexeme to a state (array of token or source element).
   *
   * @default to a state with the matching token
   *
   * @type {RuleExpandFn}
   * @memberof RuleSpec
   */
  expand?: RuleExpandFn;
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
    // longest keyword must be applied first, so we sort the array
    // (maximal munch algorithm, also called longest match)
    return [...array]
      .sort((a, b) => b.length - a.length)
      .map(
        str =>
          new Rule({
            name: str,
            pattern: new RegExp(str),
            group: Group.KEYWORDS,
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
  generateTokenAttribute = (lexeme: string) => lexeme;
  expand: RuleExpandFn = (match: RegExpMatchArray, position: Position) => {
    if (this.ignore) {
      return [];
    }
    return [
      {
        name: this.name,
        lexeme: match[0],
        group: this.group,
        position: position,
        attribute: this.generateTokenAttribute(match[0]),
      } as Token,
    ];
  };

  constructor(spec: RuleSpec) {
    Object.assign(this, spec);
  }
}
