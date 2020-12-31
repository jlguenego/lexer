import {Group} from '../Group';
import {Position} from './Position';

export type TokenObjectSequence = Token[];

export interface Token {
  name: string;
  value: string;
  group: Group;
  position: Position;
}
