import type { Language, i18nConfig } from "./i18nConfig";
import { TypeMask } from "./i18nConfig";
import type { Block } from "sanity";

export function isTypeMaskEnabled(value: TypeMask, flag: TypeMask): boolean {
  if (value === TypeMask.All) {
    return true;
  } else if (value === TypeMask.None) {
    return false;
  }
  return (value & flag) === flag;
}
export function toPlainText(blocks: Block[] = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== "block" || !block.children) {
          return "";
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join("");
      })
      // join the paragraphs leaving split by two linebreaks
      .join("\n\n")
  );
}
export function getFields(type: string, config: i18nConfig, o: any = null) {
  return config.languages.map((lang: Language) => ({
    title: lang.title,
    name: lang.id,
    type: type,
    ...(o && { of: o }),
    group: `${type}-${lang.id}`,
  }));
}
export function getPreview(config: i18nConfig) {
  return {
    select: {
      title: config.languages[0].id,
    },
    prepare(selection: { title: string; _type: string }) {
      const { _type, title } = selection;
      return {
        title,
        subtitle: _type,
      };
    },
  };
}
export function getGroups(config: i18nConfig) {
  return config.languages.map((lang: Language) => ({
    name: `${lang.id}`,
    title: lang.title,
    default: lang.isDefault,
  }));
}
