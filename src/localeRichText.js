import blocks from "part:@staccx/i18n/blocks?"
import blockOptions from "part:@staccx/i18n/blockOptions?"
import languages from "part:@staccx/i18n/languages?"
import config from "part:@staccx/i18n/config?"

import { getFields, fieldsets } from "./supportedLanguages"

const data = [
  {
    type: "block",
    ...(blockOptions || {})
  },
    ...((config && !config.noImage) ? [{type: "image"}] : []),
    ...(blocks || [])
]

export default {
  title: "Localized Rich text",
  name: "localeRichText",
  type: "object",
  fieldsets,
  fields: getFields("array", data),
  preview: {
    select: {
      title: ((languages || [])[0].id || "nb")
    },

    prepare(selection) {
      const { _type, title } = selection
      return {
        title: title.length
          ? title[0].children
              .reduce((acc, current) => acc + current.text, "")
              .substring(0, 20)
          : "denne er tom",
        subtitle: _type
      }
    }
  }
}
