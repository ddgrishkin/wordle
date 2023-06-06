import {GameErrorType} from './types';

export class GameError {
	readonly message: string;
	readonly type: GameErrorType;

	constructor(type: GameErrorType, message: string) {
		this.type = type;
		this.message = message;
	}
}
