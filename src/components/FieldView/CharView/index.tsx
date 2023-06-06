import {Char, CharState} from 'lib/helpers/Char';
import cn from 'classnames';
import React, {useMemo} from 'react';
import styles from './index.css';

type Props = {
	char?: Char;
	delay?: number;
	onAnimationEnd?(): void;
};

const classNameByState: Record<CharState, string> = {
	[CharState.IDLE]: styles.idle,
	[CharState.NEUTRAL]: styles.neutral,
	[CharState.SUCCESS]: styles.success,
	[CharState.WARNING]: styles.warning,
};

export function CharView({char, delay, onAnimationEnd}: Props): React.ReactElement {
	const state = char?.getState();
	const style = useMemo<React.CSSProperties | undefined>(() => {
		if (state !== CharState.IDLE) {
			return {animationDelay: `${delay}ms`};
		}

		return undefined;
	}, [delay, state]);

	return (
		<div
			className={cn(styles.char, char && classNameByState[char.getState()])}
			onAnimationEnd={onAnimationEnd}
			style={style}
		>
			{char?.value}
		</div>
	);
};
