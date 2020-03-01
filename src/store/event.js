// export const state = () => ({
//   event: {
//     name: '',
//     data: null
//   }
// })

// export const mutations = {
//   emit(state, event) {
//     state.event = event
//   }
// }

const event = {
  state: {
    event: {
      name: '',
      data: null
    }
  },

  mutations: {
    emit: (state, event) => {
      state.event = event
    }
  }
}

export default event