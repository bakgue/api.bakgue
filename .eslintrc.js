const options = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"linebreak-style": ["error", "unix"],
	},
};

module.exports = options;
