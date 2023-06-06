import {useCallback, useEffect, useMemo, useState} from 'react';
import {GameAction, GameState} from 'lib/game/types';
import {GameError} from 'lib/game/error';
import {CharState} from 'lib/helpers/Char';
import {Row} from 'lib/helpers/Row';
import {Game} from 'lib/game';

type State = {
	rows: Row[];
	state: GameState;
	activeWord: string;
	charState: Record<string, CharState>;
}

type UseGameManagerState = State & {
	game: Game;
	pop(): void;
	enter(): void;
	reject(): void;
	push(char: string): void;
	verify<R>(action: GameAction, callback: (error: GameError | void) => R): R;
};

export function useGameManager(word: string): UseGameManagerState {
	const game = useMemo(() => new Game(word), [word]);
	const getGameState = useCallback(() => {
		return {
			activeWord: game.activeRow.getWord(),
			charState: {...game.charState},
			rows: [...game.rows],
			state: game.getState(),
		};
	}, [game]);

	const [state, setState] = useState<State>(getGameState);
	const actions = useMemo(() => {
		const generic = <T, R = void>(callback: (...args: T[]) => R) => {
			return (...args: T[]) => {
				const returnState = callback(...args);
				setState(getGameState());
				return returnState;
			};
		};

		return {
			pop: generic<void>(game.pop.bind(game)),
			push: generic<string>(game.push.bind(game)),
			enter: generic<void>(game.enter.bind(game)),
			reject: generic<void>(game.reject.bind(game)),
			verify: <R>(action: GameAction, callback: (error: GameError | void) => R) => {
				return game.verify(action, callback);
			},
		};
	}, [getGameState, game]);

	useEffect(() => {
		setState(getGameState());
	}, [word]);

	return {
		...state,
		...actions,
		game,
	};
}
