import type {
  Block,
  MarkDefinition,
  StyleObjectField,
  ListObjectField,
} from "sanity";
/**
 * Define marks styles for localeRichText
 */
interface BlockOptions {
  marks?: MarkDefinition;
  styles?: StyleObjectField[];
  lists?: ListObjectField[];
}

export interface Language {
  id: string;
  title: string;
  isDefault?: boolean;
}

export enum TypeMask {
  None = 1 << 0,
  String = 1 << 1,
  Text = 1 << 2,
  RichText = 1 << 3,
  All = 1 << 4,
}

export interface i18nConfig {
  languages: Language[];
  blocks?: Block[] | any[];
  options?: BlockOptions;
  allowKeyChange?: boolean;
  isNamespaceEnabled?: boolean;
  typeMask: TypeMask;
  isDocumentTypeHidden?: boolean;
}
