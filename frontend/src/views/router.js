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
      path: '/blogs',
      component: () => import('./BlogsPage.vue')
    },
    {
      path: '/blogs/add',
      component: () => import('./AddBlog.vue')
    },
    {
      path: '/blogs/:id',
      component: () => import('./SingleBlogPage.vue')
    },
    {
      path: '/users',
      component: () => import('./UsersPage.vue')
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