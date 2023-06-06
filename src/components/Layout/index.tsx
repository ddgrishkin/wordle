import React from 'react';
import styles from './index.css';

type Props = {
	children: React.ReactNode;
}

export function Layout({children}: Props): React.ReactElement {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
};
