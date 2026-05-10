import antfu from "@antfu/eslint-config";

export default antfu({
  rules: {
    "ts/no-redeclare": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "style/brace-style": ["error", "1tbs"],
    "test/prefer-lowercase-title": "off",
  },
  stylistic: {
    semi: true,
    quotes: "double",
  },
}, {
  files: ["**/*.md"],
  rules: {
    "style/no-trailing-spaces": "off",
    "markdown/no-multiple-h1": "off",
  },
});
