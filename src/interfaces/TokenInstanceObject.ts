import {Group} from '../Group';
import {Position} from './Position';

export type TokenSequence = Token[];

export interface Token {
  name: string;
  value: string;
  group: Group;
  position: Position;
}
