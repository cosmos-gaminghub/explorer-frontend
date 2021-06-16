import _find from 'lodash/find'

export const state = () => ({
  locales: [
    { value: 'zh', label: 'ZH', name: 'Chinese' },
    { value: 'en', label: 'EN', name: 'English' }
  ],
  locale: 'en'
})

export const mutations = {
  SET_LANG (state, locale) {
    const isLocale = _find(state.locales, { value: locale })
    if (isLocale) {
      state.locale = locale
    }
  }
}
