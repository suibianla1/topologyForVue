
const routes = [
  // {
  //   path: '/fullscreen', name: 'TopoFullscreen',component: () => import('../pages/topo/Fullscreen.vue')
  // },
  // {
  //   path: '/draggablePage', name: 'draggablePage', component: () => import('../pages/draggable.vue')
  // },
  {
    path: '/', 
    name: 'topologyPage', component: () => import('../pages/topology.vue'), 

    children:  [
      {
        path: '/',
        name: 'home',
        component: () => import('../pages/topo/index')
      },
      {
        path: 'workspace',
        name: 'workspace',
        component: () => import('../pages/topo/workspace')
      }
    ]
  }
]


// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('../pages/Error404.vue')
//   })
// }

export default routes
