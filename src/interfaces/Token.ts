import {SourceElement} from '../SourceElement';
import {TokenInstance} from '../TokenInstance';

export interface Token {
  name: string;
  pattern: RegExp | string;
  ignore: boolean;
}

export interface TokenSpec {
  name: string;
  pattern: RegExp | string;
  ignore?: boolean;
}

export type TokenElement = SourceElement | TokenInstance;

export interface TokenInstanceObject {
  name: string;
  value: string;
}
