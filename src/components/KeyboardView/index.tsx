import {Key} from 'lib/event/types';
import {CharState} from 'lib/helpers/Char';
import React, {useCallback} from 'react';
import styles from './index.css';
import {KeyView} from './KeyView';

type Props = {
	onKeyDown?(key: Key): void;
	charState?: Record<string, CharState>;
}

const KEY_ROWS = [
	[Key.Q, Key.W, Key.E, Key.R, Key.T, Key.Y, Key.U, Key.I, Key.O, Key.P],
	[Key.A, Key.S, Key.D, Key.F, Key.G, Key.H, Key.J, Key.K, Key.L],
	[Key.ENTER, Key.Z, Key.X, Key.C, Key.V, Key.B, Key.N, Key.M, Key.BACKSPACE],
];

export function KeyboardView({charState = {}, onKeyDown}: Props): React.ReactElement {
	const handleClick = useCallback(({target}: React.MouseEvent<HTMLDivElement>) => {
		if (onKeyDown) {
			if (target instanceof HTMLElement) {
				if (typeof target.dataset.key === 'string') {
					onKeyDown(target.dataset.key as Key);
				}
			}
		}
	}, [onKeyDown]);

	return (
		<div className={styles.container} onClick={handleClick}>
			{KEY_ROWS.map((keys, index) => (
				<div className={styles.row} key={index}>
					{keys.map((key) => (
						<KeyView
							state={charState[key]}
							value={key}
							key={key}
						/>
					))}
				</div>
			))}
		</div>
	);
};
