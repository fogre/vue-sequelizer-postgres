import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("./HomePage.vue")
    },
    {
      path: "/sign",
      component: () => import("./SignInPage.vue"),
    },
    {
      path: "/signup",
      component: () => import("./SignUpPage.vue"),
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
      path: '/users/:id',
      component: () => import('./SingleUserPage.vue')
    },
    {
      path: '/authors/:author',
      component: () => import('./AuthorPage.vue')
    },
    {
      path: '/tags/:id',
      component: () => import('./TagPage.vue')
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