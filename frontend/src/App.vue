<script setup>
  import { provide, ref } from "vue"
  import { getStorage } from './utils/localStorage'
  import { THEMES } from './utils/constants'
  import MainHeader from "./components/Header/MainHeader.vue"

  const user = ref(getStorage())
  const theme = ref('light')

  console.log(user.value)
  const setUser = userInfo => {
    user.value = userInfo
  }

  const changeTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = newTheme
  }

  provide('user', {
    user,
    setUser
  })

  provide('theme', {
    theme,
    changeTheme
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
  <p>this is footer</p>
  <div class="app-background" />
</template>

<style>
  @import './assets/animations.css';
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

</style>