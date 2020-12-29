import {TokenInstanceObject} from './interfaces/Token';

export class TokenInstance {
  constructor(public name: string, public value: string) {}

  getValue(): TokenInstanceObject {
    return {
      name: this.name,
      value: this.value,
    };
  }
}
