import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'input',
      component: require('@/components/Input').default
    },
    {
      path: '/tilesetInformation',
      name: 'tilesetInformation',
      component: require('@/components/TilesetInformation').default
    },
    {
      path: '/attributeHandling',
      name: 'attributeHandling',
      component: require('@/components/AttributeHandling').default
    },
    {
      path: '/tileLimits',
      name: 'tileLimits',
      component: require('@/components/TileLimits').default
    },
    {
      path: '/output',
      name: 'output',
      component: require('@/components/Output').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
