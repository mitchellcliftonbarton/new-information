import content from '@/content/content.js'

export const state = () => ({
  isMobile: false,
  text: content.text,
  about: content.about,
})

export const mutations = {
  setIsMobile: (state, bool) => {
    state.isMobile = bool
  }
}

export const actions = {
  setIsMobile ({commit}, bool) {
    commit('setIsMobile', bool)
  }
}