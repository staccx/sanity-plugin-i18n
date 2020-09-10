import languages from "part:@staccx/i18n/languages?"
import config from "part:@staccx/i18n/config?"

const supportedLanguages = languages || [
  {id: "nb", title: "Norwegian", isDefault: true}
]
const allowKeyChange = config ? config.allowKeyChange || false : process.env.NODE_ENV !== "development"
const showNamespaces = config ? config.showNamespaces || false : false

const weights = supportedLanguages.map(lang => ({
  weight: 1, path: `value[].${lang.id}.children[].text`
}))
const firstLang = supportedLanguages[0].id

const extractTextFromBlocks = (blocks = []) =>
  blocks
    .filter(val => val._type === "block")
    .map(block =>
      block.children
        .filter(child => child._type === "span")
        .map(span => span.text)
        .join("")
    )
    .join("")

export default {
  title: "Translations",
  name: "translations",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      title: "Key",
      name: "i18nKey",
      type: "slug",
      ...(allowKeyChange && {
        options: {
          source: "name",
          maxLength: 96,
          auto: true
        }
      }),
      validation: Rule => Rule.required(),
      readOnly: !allowKeyChange
    },
    {
      title: "Value",
      name: "value",
      type: "translationValue"
    },
    {
      title: "Namespace",
      name: "namespace",
      type: "string",
      hidden: !showNamespaces
    }
  ],
  preview: {
    select: {
      value: `value`,
      name: "name"
    },
    prepare(selection) {
      const {value, name} = selection

      if (value && Array.isArray(value)) {
        const firstItem = value[0]
        if (firstItem) {
          const item = firstItem[firstLang]

          if (Array.isArray(item)) {
            return {
              title: name,
              subtitle: extractTextFromBlocks(item)
            }
          }

          return {
            title: item,
            subtitle: name
          }
        }
      }

      return {
        title: name
      }

    }
  }
}
