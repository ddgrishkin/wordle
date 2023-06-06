const BASE_ENTRY = {
  index: './src/app.tsx',
};

module.exports = function getEntry() {
	if (process.env.NODE_ENV === 'production') {
		return BASE_ENTRY;
	}

	return {
		...BASE_ENTRY,
		dev: './src/index.tsx',
	};
}
