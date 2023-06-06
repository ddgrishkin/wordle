export class State<Value> {
	private _state: Value;

	constructor(initialState: Value) {
		this._state = initialState;
	}

	setState(nextState: Value) {
		this._state = nextState;
	}

	getState(): Value {
		return this._state;
	}
}
