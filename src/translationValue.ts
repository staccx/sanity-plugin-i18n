import type { i18nConfig } from "./i18nConfig";
import { TypeMask } from "./i18nConfig";
import type { Rule } from "sanity";
import { isTypeMaskEnabled } from "./utils";

export function getTranslationValueSchema(config: i18nConfig): any {
  const stringTypeEnabled = isTypeMaskEnabled(config.typeMask, TypeMask.String);
  const textTypeEnabled = isTypeMaskEnabled(config.typeMask, TypeMask.Text);
  const richTextTypeEnabled = isTypeMaskEnabled(
    config.typeMask,
    TypeMask.RichText
  );
  return {
    title: "Value",
    name: "translationValue",
    type: "array",
    of: [
      ...(stringTypeEnabled ? [{ type: "localeString" }] : []),
      ...(textTypeEnabled ? [{ type: "localeText" }] : []),
      ...(richTextTypeEnabled ? [{ type: "localeRichText" }] : []),
    ],
    validation: (rule: Rule) => rule.required(),
  };
}
