import config from "part:@staccx/i18n/config?"

const allowKeyChange = config ? config.allowKeyChange || false : process.env.NODE_ENV !== "development"
const showNamespaces = config ? config.showNamespaces || false : false
console.log(allowKeyChange)
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
      ...(allowKeyChange && {options: {
        source: "name",
        maxLength: 96,
        auto: true
      }}),
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
  ]
}
