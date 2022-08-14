import { fieldsets, getFields, toPlainText } from "./utils";
import type { i18nConfig } from "./i18nConfig";

export function getLocalizedRichTextSchema(config: i18nConfig): any {
  const data = [
    {
      type: "block",
      ...(config?.options || {}),
    },
    ...(config?.blocks || []),
  ];
  return {
    title: "Localized Rich text",
    name: "localeRichText",
    type: "object",
    fieldsets,
    fields: getFields("array", config, data),
    preview: {
      select: {
        title: (config?.languages || [])[0].id || "nb",
      },
      prepare(selection: { title: any[]; _type: string }) {
        const { _type, title } = selection;

        const plainText = toPlainText(title);
        return {
          title: plainText ?? "n/a",
          subtitle: _type,
        };
      },
    },
  };
}
