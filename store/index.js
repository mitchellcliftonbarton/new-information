import content from '@/content/index'

export const state = () => ({
  isMobile: false,
  projects: content.projects,
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