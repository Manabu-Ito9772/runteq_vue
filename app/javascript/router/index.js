import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // 2. historyモード
  // routes.rbの設定が必要です。

  // [URLの例]
  // http://localhost:3000/
  // http://localhost:3000/article/5
  // http://localhost:3000/article/33
  base: process.env.BASE_URL,

  // ルーターの設定
  routes: [
    {
      path: '/',
      name: 'Top',
      component: () => import('../pages/top/index.vue')
    },
    {
      path: '/tasks',
      name: 'Task',
      component: () => import('../pages/task/index.vue')
    },
  ]

})
