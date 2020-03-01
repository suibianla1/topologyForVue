import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
// import topoEditor from './topo-editor';

Vue.use(Vuex)

// /*
//  * If not building with SSR mode, you can
//  * directly export the Store instantiation
//  */

import canvas from './canvas'
import event from './event'
import notice from './notice'


const Store = new Vuex.Store({
  modules: {
    // example,
    // topoEditor,
    canvas,
    event,
    notice
  }
})

export default Store