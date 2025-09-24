import antfu from "@antfu/eslint-config";

export default antfu({
  rules: {
    "ts/no-redeclare": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "style/brace-style": ["error", "1tbs"],
  },
  stylistic: {
    semi: true,
    quotes: "double",
  },
}, {
  files: ["**/*.md"],
  rules: {
    "style/no-trailing-spaces": "off",
  },
});
