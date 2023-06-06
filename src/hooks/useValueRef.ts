import {useRef} from 'react';

export function useValueRef<Value>(value: Value) {
	const valueRef = useRef(value);
	valueRef.current = value;

	return valueRef;
}
