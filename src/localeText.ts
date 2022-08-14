import { getFields, getPreview } from "./utils";
import type { i18nConfig } from "./i18nConfig";

export function getLocaleTextSchema(config: i18nConfig): any {
  return {
    title: "Localized Text",
    name: "localeText",
    type: "object",
    fieldsets: [
      {
        title: "Translations",
        name: "translations",
        options: { collapsable: true },
      },
    ],
    fields: getFields("text", config),
    preview: getPreview(config),
  };
}
