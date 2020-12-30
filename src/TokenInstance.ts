import {Group} from './Group';
import {Position} from './interfaces/Position';
import {TokenInstanceObject} from './interfaces/TokenInstanceObject';

export class TokenInstance {
  constructor(
    public name: string,
    public value: string,
    public group: Group,
    public position: Position
  ) {}

  getValue(): TokenInstanceObject {
    return {
      name: this.name,
      value: this.value,
      group: this.group,
      position: this.position,
    };
  }
}
