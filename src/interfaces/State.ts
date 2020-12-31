import {SourceElement} from '../SourceElement';
import {Token} from './TokenInstanceObject';

export type StateElement = SourceElement | Token;
export type State = StateElement[];
