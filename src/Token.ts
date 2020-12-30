import {Group} from './Group';
import {Position} from './interfaces/Position';
import {TokenObject} from './interfaces/TokenInstanceObject';

export class Token {
  constructor(
    public name: string,
    public value: string,
    public group: Group,
    public position: Position
  ) {}

  toObject(): TokenObject {
    return {
      name: this.name,
      value: this.value,
      group: this.group,
      position: this.position,
    };
  }
}
