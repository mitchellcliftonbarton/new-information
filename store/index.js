import content from '@/content/index'

export const state = () => ({
  isMobile: false,
  projects: content.projects,
  device: 'desktop',
  currentProject: null,
  currentColorOverride: null,
  previousLinkActive: false,
  nextLinkActive: false,
})

export const mutations = {
  setIsMobile: (state, bool) => {
    state.isMobile = bool
  },
  setDevice: (state, str) => {
    state.device = str
  },
  setCurrentProject: (state, obj) => {
    state.currentProject = obj
  },
  setCurrentColorOverride: (state, str) => {
    state.currentColorOverride = str
  },
  setPreviousLinkActive: (state, bool) => {
    state.previousLinkActive = bool
  },
  setNextLinkActive: (state, bool) => {
    state.nextLinkActive = bool
  },
}

export const actions = {
  setIsMobile ({commit}, bool) {
    commit('setIsMobile', bool)
  },
  setDevice ({commit}, str) {
    commit('setDevice', str)
  },
  setCurrentProject({ commit }, obj) {
    commit('setCurrentProject', obj)
  },
  setCurrentColorOverride ({commit}, str) {
    commit('setCurrentColorOverride', str)
  },
  setPreviousLinkActive ({commit}, bool) {
    commit('setPreviousLinkActive', bool)
  },
  setNextLinkActive ({commit}, bool) {
    commit('setNextLinkActive', bool)
  },
}

export const getters = {
  currentColor: state => {
    return state.currentColorOverride ? state.currentColorOverride : state.currentProject ? state.currentProject.color : 'black'
  },
  previousProject: state => {
    if (state.currentProject) {
      const currentIndex = state.projects.findIndex(project => project.slug === state.currentProject.slug)

      if (currentIndex === 0) {
        return state.projects[state.projects.length - 1]
      } else {
        return state.projects[currentIndex - 1]
      }
    } else {
      return false
    }
  },
  nextProject: state => {
    if (state.currentProject) {
      const currentIndex = state.projects.findIndex(project => project.slug === state.currentProject.slug)

      if (currentIndex === state.projects.length - 1) {
        return state.projects[0]
      } else {
        return state.projects[currentIndex + 1]
      }
    } else {
      return false
    }
  }
}