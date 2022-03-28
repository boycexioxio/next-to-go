import { createI18n } from 'vue-i18n'

import en from './en'
import zh from './zh'

const i18n = createI18n({
  locale: 'en', // 语言标识
  messages: { zh, en },
})

export default i18n
