import {Group} from './Group';

export interface TokenSpec {
  name: string;
  pattern: RegExp | string;
  ignore?: boolean;
  group?: Group;
  preprocess?: boolean;
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

  name = '';
  pattern: RegExp | string = '';
  ignore = false;
  group = Group.NONE;
  preprocess = false;

  constructor(spec: TokenSpec) {
    Object.assign(this, spec);
  }
}
