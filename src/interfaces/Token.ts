import {Group} from '../Group';
import {SourceElement} from '../SourceElement';
import {TokenInstance} from '../TokenInstance';

export interface Token {
  name: string;
  pattern: RegExp | string;
  ignore: boolean;
  group: Group;
}

export interface TokenSpec {
  name: string;
  pattern: RegExp | string;
  ignore?: boolean;
  group?: Group;
}

export type TokenElement = SourceElement | TokenInstance;

export interface TokenInstanceObject {
  name: string;
  value: string;
  group: Group;
  position: Position;
}

export interface Position {
  col: number;
  line: number;
}
