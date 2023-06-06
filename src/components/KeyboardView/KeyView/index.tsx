import {CharState} from 'lib/helpers/Char';
import {Key} from 'lib/event/types';
import cn from 'classnames';
import React from 'react';
import styles from './index.css';

type Props = {
	value: Key;
	state?: CharState;
};

const classNameByCharState = {
	[CharState.NEUTRAL]: styles.neutral,
	[CharState.SUCCESS]: styles.success,
	[CharState.WARNING]: styles.warning,
};

function getElementByKey(key: Key) {
	switch (key) {
		case Key.ENTER:
			return (
				<svg width="1em" height="1em" viewBox="0 0 24 24">
					<path fill="currentColor" d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z" />
				</svg>
			);
		case Key.BACKSPACE:
			return (
				<svg width="1em" height="1em" viewBox="0 0 24 24">
					<path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
				</svg>
			);
		default:
			return key;
	}
}

export function KeyView({value, state}: Props): React.ReactElement {
	return (
		<div className={cn(styles.container, state && classNameByCharState[state])} data-key={value}>
			{getElementByKey(value)}
		</div>
	);
};
