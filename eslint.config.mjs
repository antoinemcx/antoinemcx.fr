// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from "@antfu/eslint-config";

export default withNuxt(
  antfu({
    rules: {
      "ts/no-redeclare": "off",
      "eslint-comments/no-unlimited-disable": "off",
      "style/brace-style": ["error", "1tbs"],
    },
    stylistic: {
      semi: true,
      quotes: "double",
    },
  })
);
