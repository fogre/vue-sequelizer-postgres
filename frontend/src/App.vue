<script setup>
  import { provide, ref, watch } from "vue"
  import { useRouter } from 'vue-router'
  import { clearStorage, getStorage, setStorage } from './utils/localStorage'
  import { THEMES } from './utils/constants'
  import MainHeader from "./components/Header/MainHeader.vue"
  import Notification from './components/Modals/Notification.vue'

  const router = useRouter()
  const user = ref(getStorage())
  const theme = ref('dark')
  //notification { type, message }
  const notification = ref({
    type: 'success',
    message: 'Contacting backend, this might take a while'
  })

  watch(() => user.value, newVal => {
    if (newVal) {
      setStorage(newVal)
    }
  })

  const setUser = userInfo => {
    user.value = userInfo
  }

  const handleLogout = error => {
    if (error.response.status === 401) {
      clearStorage()
      setUser(null)
      router.push('/sign')
      setNotification('error','Please log in')
    }
  }

  //instead of refetching user, keep track of likes locally
  const addLike = like => {
    let newLikes = []
    if (user.value.liked_blogs && user.value.liked_blogs.length) {
      newLikes = [...user.value.liked_blogs]
    }
    newLikes.push({ id: like.blogId })
    user.value = {
      ...user.value,
      liked_blogs: newLikes
    }
  }

  const removeLike = blogId => {
    const newLikes = [...user.value.liked_blogs].filter(l => l.id !== blogId)
    user.value = {
      ...user.value,
      liked_blogs: newLikes
    }
  }

  const changeTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = newTheme
  }

  const setNotification = (type, message) => {
    notification.value = {
      type: type,
      message: message
    }
  }

  const handleError = error => {
    console.log(error.message)
    if (error.response.status === 401) {
      return handleLogout(error)
    }
    setNotification('error', error.message)
  }

  provide('user', {
    user,
    setUser,
    addLike,
    removeLike,
    handleLogout
  })

  provide('theme', {
    theme,
    changeTheme
  })

  provide('notification', {
    handleError,
    setNotification
  })
</script>

<template #app>
  <div class="app">
    <MainHeader />
    <div class="app-view-wrapper">
      <RouterView v-slot="{ Component, route }">
        <Transition
          :name="route.meta.transition || 'fade'"
          :mode="route.meta.mode || 'out-in'"
        >
          <component :is="Component" class="app-view" />
        </Transition>
      </RouterView>
    </div>
  </div>
  <div class="app-background" />
  <Notification :notif="notification" />
</template>

<style>
  @import './assets/animations.css';
  @import './assets/formStyles.css';
  @import './assets/listGlobalStyles.css';

  .app {
    width:  100%;
    min-height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    isolation: isolate;
    
    color: v-bind(THEMES[theme].textColorMain);
    --background-color: v-bind(THEMES[theme].backgroundColor);
    --background-transparent-primary: v-bind(THEMES[theme].backgroundTransparentPrimary);
    --background-transparent-secondary: v-bind(THEMES[theme].backgroundTransparentSecondary);
    --color-primary: v-bind(THEMES[theme].primary);
    --color-secondary: v-bind(THEMES[theme].secondary);
    --color-danger: v-bind(THEMES[theme].danger);
    --color-success: v-bind(THEMES[theme].success);
    --text-color-main: v-bind(THEMES[theme].textColorMain);
  }

  .app-view-wrapper {
    width:  100%;
    height: 100%;
    z-index:  var(--z-idx-view);
  }

  .app-view {
    padding-top:  var(--nav-header-height);
    min-height: 100%;
  }

  .app-background {
    z-index: var(--z-idx-background);
    background-image: v-bind(THEMES[theme].backgroundGradient);
    position: fixed;
    left: 0;
    top: 0;
    width:  100%;
    height: 100%;
  }

  .secondary-color {
    color: var(--color-secondary);
  }

  .primary-color {
    color:  var(--color-primary);
  }
</style>