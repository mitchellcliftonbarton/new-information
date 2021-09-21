import content from '@/content/content.js'

export const state = () => ({
  isMobile: false,
  text: content.text,
  about: content.about,
  email: content.email,
  seo: content.seo,
  general: content.general,
  device: 'desktop'
})

export const mutations = {
  setIsMobile: (state, bool) => {
    state.isMobile = bool
  },
  setDevice: (state, str) => {
    state.device = str
  }
}

export const actions = {
  setIsMobile ({commit}, bool) {
    commit('setIsMobile', bool)
  },
  setDevice ({commit}, str) {
    commit('setDevice', str)
  }
}