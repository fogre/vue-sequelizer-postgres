<script setup>
  import { inject } from 'vue'

  const { user } = inject('user')
  const { theme, changeTheme } = inject('theme')
</script>

<template>
  <header>
    <nav class="nav">
      <div class="nav-block">
        <RouterLink to="/" class="nav-link">
          home
        </RouterLink>
        <RouterLink to="/blogs" class="nav-link">
          blogs
        </RouterLink>
        <RouterLink to="/users" class="nav-link">
          users
        </RouterLink>  
      </div>
      <div class="nav-block">
        <button @click="changeTheme">{{ theme }}</button>
        <RouterLink v-if="user" to="/profile" class="nav-link left">
          my profile
        </RouterLink>
        <RouterLink v-else to="/sign" class="nav-link left">
          sign in / up
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  header {
    position: absolute;
    left: 0;
    top: 0;
    width:  100%;
    z-index: var(--z-idx-nav);
  }

  nav {
    padding: 0 var(--padding-main);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: inherit;
    color: white;
    height: var(--nav-header-height);
  }

  .nav-block {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    color: inherit;
    text-decoration: none;
    font-weight: 700;

    &.left {
      color: var(--color-primary);
      border-bottom: 2px solid white;
      padding: 2px 2px;
    }

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
</style>