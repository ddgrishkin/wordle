import {State} from 'lib/helpers/State';

export enum CharState {
	IDLE = 'idle',
	NEUTRAL = 'neutral',
	SUCCESS = 'success',
	WARNING = 'warning',
}

export class Char extends State<CharState> {
	value: string;

	constructor(char: string) {
		super(CharState.IDLE);
		this.value = char;
	}
}
