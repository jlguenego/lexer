import {Group} from '../Group';
import {Position} from './Position';

export interface TokenInstanceObject {
  name: string;
  value: string;
  group: Group;
  position: Position;
}
