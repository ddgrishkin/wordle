import {State} from './State';
import {Char} from './Char';

export type RowOptions = {
	state?: RowState;
}

export enum RowState {
	IDLE = 'idle',
	ERROR = 'error',
	SUCCESS = 'success',
}

export class Row extends State<RowState> {
	public size: number;
	readonly chars: Char[];

	constructor(initialState: Char[] = [], {state = RowState.IDLE}: RowOptions = {}) {
		super(state);

		this.chars = initialState;
		this.size = initialState.length;
	}

	private verify<R>(callback: () => R | Error) {
		if (this.getState() === RowState.SUCCESS) {
			return new Error('Row is in success state');
		}

		return callback();
	}

	/**
	 * 
	 * @returns 
	 */
	getWord(): string {
		return this.chars.map((char) => char.value).join('');
	}

	/**
	 * 
	 * @param char 
	 */
	push(char: Char): void | Error {
		return this.verify(() => {
			this.chars.push(char);
			this.size = this.chars.length;
			this.setState(RowState.IDLE);
		});
	}

	/**
	 * 
	 */
	pop(): void | Error {
		return this.verify(() => {
			this.chars.pop();
			this.size = this.chars.length;
			this.setState(RowState.IDLE);
		});
	}

	/**
	 * 
	 * @param predicate 
	 */
	forEach(predicate: (char: Char, index: number) => unknown) {
		this.chars.map((char, index) => {
			return predicate(char, index);
		});
	}
}
