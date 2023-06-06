import {CharState} from './index';

const CHAR_STATE_WEIGHT: Record<CharState, number> = {
	[CharState.IDLE]: 0,
	[CharState.NEUTRAL]: 1,
	[CharState.WARNING]: 2,
	[CharState.SUCCESS]: 3,
}

export function getMaxCharState(a: CharState, b: CharState) {
	const aWeight = CHAR_STATE_WEIGHT[a];
	const bWeight = CHAR_STATE_WEIGHT[b];

	return aWeight >= bWeight ? a : b;
}
