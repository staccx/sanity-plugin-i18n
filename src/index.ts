import { createPlugin } from "sanity";
import type { i18nConfig, Language } from "./i18nConfig";
import { TypeMask } from "./i18nConfig";
import { isTypeMaskEnabled } from "./utils";
import { getTranslationValueSchema } from "./translationValue";
import { getLocaleStringSchema } from "./localeString";
import { getLocaleTextSchema } from "./localeText";
import { getLocalizedRichTextSchema } from "./localeRichText";
import { getTranslationSchemaType } from "./translations";

const defaultConfig: i18nConfig = {
  typeMask: TypeMask.String | TypeMask.Text | TypeMask.RichText,
  languages: [{ id: "nb", title: "Norwegian", isDefault: true }],
  allowKeyChange: true,
  isNamespaceEnabled: true,
};

export const i18nPlugin = createPlugin<i18nConfig>((config) => {
  const configWithDefaults = Object.assign({}, defaultConfig, config);

  const stringTypeEnabled = isTypeMaskEnabled(
    configWithDefaults.typeMask,
    TypeMask.String
  );
  const textTypeEnabled = isTypeMaskEnabled(
    configWithDefaults.typeMask,
    TypeMask.Text
  );
  const richTextTypeEnabled = isTypeMaskEnabled(
    configWithDefaults.typeMask,
    TypeMask.RichText
  );

  const objects = [
    getTranslationValueSchema(configWithDefaults),
    ...(stringTypeEnabled ? [getLocaleStringSchema(configWithDefaults)] : []),
    ...(textTypeEnabled ? [getLocaleTextSchema(configWithDefaults)] : []),
    ...(richTextTypeEnabled
      ? [getLocalizedRichTextSchema(configWithDefaults)]
      : []),
  ];
  return {
    name: "stacc-sanity-plugin-i18n",
    schema: {
      types: [...objects, getTranslationSchemaType(configWithDefaults)],
    },
  };
});

export { TypeMask, Language };
