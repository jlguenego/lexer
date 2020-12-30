import {Group} from './Group';

export interface TokenSpec {
  name: string;
  pattern: RegExp | string;
  ignore?: boolean;
  group?: Group;
}

export class Token {
  static createKeywordTokens(array: string[]) {
    return array.map(
      str =>
        new Token({
          name: str,
          pattern: new RegExp(str),
          group: Group.KEYWORD,
        })
    );
  }

  static createGroupTokens(group: Group, array: TokenSpec[]) {
    return array.map(spec => new Token({group, ...spec}));
  }

  ignore: boolean;
  group: Group;
  pattern: RegExp | string;
  name: string;

  constructor(spec: TokenSpec) {
    this.name = spec.name;
    this.pattern = spec.pattern;
    this.ignore = spec.ignore || false;
    this.group = spec.group || Group.NONE;
  }
}
