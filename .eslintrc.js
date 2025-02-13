module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "semi": "error",
    "quotes": [
      "error",
      "single",
      {	
        "avoidEscape": true,
        "allowTemplateLiterals": true,
      }
    ],
    "indent": ["error", "tab"],
    "function-paren-newline": ["error", { "minItems": 2 }],
    "function-call-argument-newline": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "brace-style": ["error", "1tbs"],
    "block-spacing": ["error", "always"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "multiline-ternary": ["error", "always"],
	  "@typescript-eslint/no-empty-object-type": [
		"error",
		{ allowInterfaces: 'always' }
	  ],
	  "no-trailing-spaces": "error",
  },
};
