import {SourceElement} from '../SourceElement';
import {Lexeme} from './Lexeme';

export type StateElement = SourceElement | Lexeme;
export type State = StateElement[];
