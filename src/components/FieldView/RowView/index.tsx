import React, {useEffect, useRef} from 'react';
import {Row, RowState} from 'lib/helpers/Row';
import cn from 'classnames';
import styles from './index.css';
import {CharView} from '../CharView/index';

type Props = {
	row?: Row;
	size: number;
};

const CHAR_ANIMATION_DELAY_STEP = 250;
const CLASS_BY_STATE: Record<RowState, string> = {
	'idle': styles.idle,
	'error': styles.error,
	'success': styles.success,
};

export function RowView({size, row}: Props): React.ReactElement {
	const rowRef = useRef<HTMLDivElement>(null);
	const chars = new Array(size).fill(undefined).map((_, index) => (row?.chars[index]));

	useEffect(() => {
		if (rowRef.current) {
			const errorClassName = CLASS_BY_STATE[RowState.ERROR];
			if (rowRef.current.classList.contains(errorClassName)) {
				rowRef.current.classList.toggle(errorClassName);
				rowRef.current.offsetHeight;
				rowRef.current.classList.toggle(errorClassName);
			}
		}
	});

	return (
		<div ref={rowRef} className={cn(styles.row, row && CLASS_BY_STATE[row.getState()])}>
			{chars.map((char, x) => (
				<div className={styles.cell} key={x}>
					<div className={styles.inner}>
						<div className={styles.value}>
							<CharView char={char} delay={CHAR_ANIMATION_DELAY_STEP * x} />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
