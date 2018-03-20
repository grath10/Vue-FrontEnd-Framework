import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

let browserLang = navigator.language // determine the browser's language except IE
if (!browserLang) { // determine the language of IE
  browserLang = navigator.browserLanguage
}
const lang = browserLang.split('-')[0] || 'zh'

const i18n = new VueI18n({
  locale: Cookies.get('language') || lang, // set locale
  messages // set locale messages
})

export default i18n
