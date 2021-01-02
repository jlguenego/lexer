/**
 * Rule Group
 *
 * Language are not all the same but they often have similar concepts:
 * - keywords
 * - operators
 * - separators (delimiter, {}, [], etc.), also called ponctuators
 * - identifiers
 * - litterals
 * - comments
 *
 * @export
 * @enum {number}
 */
export enum Group {
  NONE = '',
  KEYWORDS = 'keywords',
  SEPARATORS = 'separators',
  OPERATORS = 'operators',
  IDENTIFIERS = 'identifiers',
  LITTERALS = 'litterals',
  COMMENTS = 'comments',
}
