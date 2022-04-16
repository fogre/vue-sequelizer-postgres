import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("./HomePage.vue")
    },
    {
      path: "/sign",
      component: () => import("./SignPage.vue"),
    },
    {
      path: '/profile',
      component: () => import('./ProfilePage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("./404.vue")
    }
  ],
  history: createWebHistory()
})

export default router