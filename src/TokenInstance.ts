import {Group} from './Group';
import {TokenInstanceObject} from './interfaces/Token';

export class TokenInstance {
  constructor(public name: string, public value: string, public group: Group) {}

  getValue(): TokenInstanceObject {
    return {
      name: this.name,
      value: this.value,
      group: this.group,
    };
  }
}
