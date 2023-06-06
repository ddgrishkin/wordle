import React, {useCallback, useEffect} from 'react';
import {Key} from 'lib/event/types';
import {FieldView} from 'components/FieldView';
import {useValueRef} from 'hooks/useValueRef';
import {KeyboardView} from 'components/KeyboardView';
import {useGameManager} from 'hooks/useGameManager';
import {GAME_ATTEMPTS, GAME_WORD_LENGTH} from 'lib/game/constants';
import {GameErrorType} from 'lib/game/types';
import {GameAction} from 'lib/game/types';
import styles from './index.css';

type Props = {
	word: string;
	onValidate?(word: string): Promise<void>;
};

export function GameView({word, onValidate}: Props) {
	const gameState = useGameManager(word);
	const gameStateRef = useValueRef(gameState);

	const handleEnter = useCallback(async () => {
		const {activeWord, reject, enter, verify} = gameStateRef.current;
		verify(GameAction.ENTER, async (error) => {
			if (error) {
				if (error.type === GameErrorType.WORD_LENGTH) {
					reject();
				}
			} else {
				try {
					if (onValidate) {
						await onValidate(activeWord);
					}

					enter();
				} catch (error) {
					reject();
				}
			}
		});
	}, []);

	const handleKey = useCallback(async (key: Key) => {
		switch (key) {
			case Key.ENTER: return handleEnter();
			case Key.BACKSPACE: return gameStateRef.current.pop();
			default: gameStateRef.current.push(key);
		}
	}, []);

	useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (!event.metaKey) {
				handleKey(event.key as Key);
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.field}>
				<FieldView
					rows={gameState.rows}
					attempts={GAME_ATTEMPTS}
					wordSize={GAME_WORD_LENGTH}
				/>
			</div>
			<KeyboardView
				onKeyDown={handleKey}
				charState={gameState.charState}
			/>
		</div>
	);
}
