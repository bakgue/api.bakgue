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
<<<<<<< Updated upstream
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
=======
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"linebreak-style": ["error", "unix"],
>>>>>>> Stashed changes
	},
};

module.exports = options;
