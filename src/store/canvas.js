// export const state = () => ({
//   data: {
//     scale: 1,
//     lineName: 'curve',
//     fromArrowType: '',
//     toArrowType: 'triangleSolid',
//     locked: 0
//   }
// })

// export const mutations = {
//   data(state, data) {
//     state.data = data
//   }
// }

const canvas = {
  state: {
    data: {
      scale: 1,
      lineName: 'curve',
      fromArrowType: '',
      toArrowType: 'triangleSolid',
      locked: 0
    }
  },

  mutations: {
    data(state, data) {
      state.data = data
    }
  }
}

export default canvas