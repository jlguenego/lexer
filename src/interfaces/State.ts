import {SourceElement} from '../SourceElement';
import {Token} from './Token';

export type StateElement = SourceElement | Token;
export type State = StateElement[];
