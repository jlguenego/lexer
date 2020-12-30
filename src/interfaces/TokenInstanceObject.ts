import {Group} from '../Group';
import {Position} from './Position';

export interface TokenObject {
  name: string;
  value: string;
  group: Group;
  position: Position;
}
