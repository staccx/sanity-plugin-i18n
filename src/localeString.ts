import { getFields, getPreview } from "./utils";
import type { i18nConfig } from "./i18nConfig";

export function getLocaleStringSchema(config: i18nConfig): any {
  return {
    title: "LocalizedString",
    name: "localeString",
    type: "object",
    fieldsets: [
      {
        title: "Translations",
        name: "translations",
        options: { collapsable: true },
      },
    ],
    fields: getFields("string", config),
    preview: getPreview(config),
  };
}
