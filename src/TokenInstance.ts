import {Group} from './Group';
import {Position, TokenInstanceObject} from './interfaces/Token';

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
