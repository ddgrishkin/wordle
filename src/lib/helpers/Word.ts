export class Word {
	size: number;
	value: string;
	chars: string[];

	constructor(value: string) {
		this.value = value;
		this.size = value.length;
		this.chars = value.split('');
	}

	/**
	 * 
	 * @param source 
	 * @returns 
	 */
	isEqual(source: string): boolean {
		return source === this.value;
	}
}
