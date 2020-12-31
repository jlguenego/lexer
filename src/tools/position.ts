import {Position} from '../interfaces/Position';

export /**
 * Create a new position object that is the addition of the given position
 * with the multiline given string
 *
 * @param {Position} pos
 * @param {string} str
 * @returns {Position}
 */
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
