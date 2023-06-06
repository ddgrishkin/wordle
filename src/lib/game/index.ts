import {Word} from 'lib/helpers/Word';
import {State} from 'lib/helpers/State';
import {Row, RowState} from 'lib/helpers/Row';
import {Char, CharState} from 'lib/helpers/Char';
import {GameState, GameAction, GameErrorType} from './types';
import {getMaxCharState} from 'lib/helpers/Char/utils';
import {GameError} from './error';
import {
	GAME_CHAR_REGEXP,
	GAME_WORD_LENGTH,
	GAME_ATTEMPTS,
} from './constants';

export class Game extends State<GameState> {
	rows: Row[];

	word: Word;

	activeRow: Row;

	charState: Record<string, CharState>;

	constructor(word: string) {
		super(GameState.IDLE);

		this.word = new Word(word);
		this.charState = {};
		this.activeRow = new Row();
		this.rows = [this.activeRow];
	}

	/**
	 * 
	 */
	verify<R>(action: GameAction, callback: (error: GameError | void) => R) {
		if (this.getState() !== GameState.IDLE) {
			return callback(new GameError(
				GameErrorType.OVER,
				'Game is finished',
			));
		}

		if (action === GameAction.ENTER) {
			if (this.activeRow.getWord().length !== GAME_WORD_LENGTH) {
				return callback(new GameError(
					GameErrorType.WORD_LENGTH,
					'Word length is incorrect',
				));
			}
		}

		if (action === GameAction.PUSH) {
			if (this.activeRow.getWord().length >= GAME_WORD_LENGTH) {
				return callback(new GameError(
					GameErrorType.WORD_FULL,
					'Word is fullfilled',
				));
			}
		}

		return callback();
	}

	/**
	 * 
	 */
	reject() {
		this.activeRow.setState(RowState.ERROR);
	}

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	push(value: string): void | Error {
		return this.verify(GameAction.PUSH, (error) => {
			if (!error) {
				if (GAME_CHAR_REGEXP.test(value)) {
					return this.activeRow.push(new Char(value));
				}
			}
		});
	}

	/**
	 * 
	 */
	pop(): Error | void {
		return this.verify(GameAction.POP, () => {
			return this.activeRow.pop();
		});
	}

	/**
	 * 
	 */
	enter(): Error | void {
		return this.verify(GameAction.ENTER, (error) => {
			if (error) {
				return;
			}

			this.activeRow.setState(RowState.SUCCESS);
			this.activeRow.forEach((char, index) => {
				let charState = CharState.NEUTRAL;

				if (this.word.value.includes(char.value)) {
					if (this.word.value[index] === char.value) {
						charState = CharState.SUCCESS;
					} else {
						charState = CharState.WARNING;
					}
				}

				char.setState(charState);
			});

			// update char state
			this.charState = this.rows.reduce<Record<string, CharState>>((nextCharState, row) => {
				row.forEach((char) => {
					nextCharState[char.value] = getMaxCharState(
						nextCharState[char.value] || CharState.IDLE,
						char.getState(),
					);
				});

				return nextCharState;
			}, {});

			// handle game state
			if (this.word.isEqual(this.activeRow.getWord())) {
				this.setState(GameState.WIN);
			} if (this.rows.length >= GAME_ATTEMPTS) {
				this.setState(GameState.OVER);
			} else {
				const newRow = new Row();
				this.activeRow = newRow;
				this.rows.push(newRow);
			}
		});
	}
}
