import type { Rule } from "sanity";
import type { i18nConfig } from "./i18nConfig";
import { getGroups, toPlainText } from "./utils";

export function getTranslationSchemaType(config: i18nConfig) {
  const allowKeyChange = config?.allowKeyChange ?? false;
  const isNamespaceEnabled = config?.isNamespaceEnabled ?? false;

  const firstLang = config.languages[0].id;

  return {
    title: "Translation",
    name: "translation",
    type: "document",
    fields: [
      {
        title: "Name",
        name: "name",
        type: "string",
        validation: (rule: Rule) => rule.required(),
      },
      {
        title: "Key",
        name: "i18nKey",
        type: "slug",
        ...(allowKeyChange && {
          options: {
            source: "name",
            maxLength: 96,
            auto: true,
          },
        }),
        validation: (rule: Rule) => rule.required(),
        readOnly: !allowKeyChange,
      },
      {
        title: "Value",
        name: "value",
        type: "translationValue",
      },
      {
        title: "Namespace",
        name: "namespace",
        type: "string",
        hidden: !isNamespaceEnabled,
      },
    ],
    preview: {
      select: {
        value: `value`,
        name: "name",
      },
      prepare(selection: { value: any; name: string }) {
        const { value, name } = selection;

        if (value && Array.isArray(value)) {
          const firstItem = value[0];
          if (firstItem) {
            const item = firstItem[firstLang];
            if (Array.isArray(item)) {
              return {
                title: name,
                subtitle: toPlainText(item),
              };
            }
            return {
              title: item,
              subtitle: name,
            };
          }
        }
        return {
          title: name,
        };
      },
    },
  };
}
