/**
 * Rule Group
 *
 * Language are not all the same but they often have similar concepts:
 * - keyword
 * - operator
 * - separator (delimiter, {}, [], etc.)
 * - identifier
 *
 * @export
 * @enum {number}
 */
export enum Group {
  NONE = '',
  KEYWORD = 'keyword',
  OPERATOR = 'operator',
  SEPARATOR = 'separator',
  IDENTIFIER = 'identifier',
}
