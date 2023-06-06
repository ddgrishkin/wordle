import React from 'react';
import {Row} from 'lib/helpers/Row';
import {RowView} from './RowView';
import styles from './index.css';

type Props = {
  rows: Row[];
  attempts: number;
  wordSize: number;
};

export function FieldView({rows = [], wordSize, attempts}: Props) {
  return (
    <div className={styles.container}>
      {new Array(attempts).fill(null).map((_, y) => (
        <RowView
          key={y}
          row={rows[y]}
          size={wordSize}
        />
      ))}
    </div>
  );
}
