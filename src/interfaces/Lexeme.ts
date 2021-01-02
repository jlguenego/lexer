import {Group} from '../Group';
import {Position} from './Position';

export type LexemeSequence = Lexeme[];

export interface Lexeme {
  name: string;
  value: string;
  group: Group;
  position: Position;
}
