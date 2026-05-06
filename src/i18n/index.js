// Vue
import Vue from "vue";
import VueI18n from "vue-i18n";

// Data
import languages from "@/i18n/languages.json";
import en from "@/lang/en";
import { app } from "@/main";

Vue.use(VueI18n);

export function createI18n(lang = null) {
  const fallbackLocale = "en";
  const globalLanguages = { en };

  const hasDocument = typeof document !== "undefined";
  const loadedLanguages = ["en"];

  let locale = fallbackLocale;
  if (lang !== null && lang !== "en") {
    locale = lang;
    loadLanguageAsync(lang);
  } else if (hasDocument) {
    locale = document.documentElement.lang;
  }

  const i18n = new VueI18n({
    fallbackLocale,
    locale,
    messages: { en },
    silentFallbackWarn: true
  });

  function setI18nLanguage(lang) {
    i18n.locale = lang;
    return lang;
  }

  // eslint-disable-next-line no-unused-vars
  function loadLanguageAsync(lang) {
    if (!loadedLanguages.includes(lang)) {
      const { locale } =
        languages.find(l => lang === l.alternate || lang === l.locale) || {};

      if (!locale) return Promise.reject(new Error("Language not found"));

      return import(
        /* webpackChunkName: "lang-[request]" */
        `@/lang/${locale}`
      )
        .then(msgs => {
          loadedLanguages.push(lang);
          globalLanguages[lang] = msgs.default;
          app.$i18n.setLocaleMessage(lang, globalLanguages[lang]);
          app.$i18n.locale = lang;
          return Promise.resolve(setI18nLanguage(lang));
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
    app.$i18n.locale = lang;
    return Promise.resolve(setI18nLanguage(lang));
  }

  return {
    i18n,
    loadLanguageAsync
  };
}
