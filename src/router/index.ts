import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../pages/Home.vue';
import ScrollPage from '../pages/ScrollPage.vue';
import CanvasPage from '../pages/CanvasPage.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/scroll-page',
    name: 'ScrollPage',
    component: ScrollPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
