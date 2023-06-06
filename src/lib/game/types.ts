import {Row} from 'lib/helpers/Row';
import {CharState} from 'lib/helpers/Char';

export type GameValue = {
	activeRow: Row,
	rows: Row[],
	state: GameState,
	charState: Record<string, CharState>;
};

export enum GameState {
	WIN = 'win',
	OVER = 'over',
	IDLE = 'idle',
};

export enum GameAction {
	POP = 'pop',
	PUSH = 'push',
	ENTER = 'enter',
};

export enum GameErrorType {
	WIN = 'win',
	OVER = 'over',
	WORD_FULL = 'wordFull',
	WORD_LENGTH = 'wordLength',
}
