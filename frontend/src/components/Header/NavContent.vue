<script setup>
  import { inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { apiDelete} from '../../utils/apiService'
  import { clearStorage } from '../../utils/localStorage'
  import IconButton from '../Buttons/IconButton.vue'

  const emit = defineEmits(['closeNav'])

  const { user, setUser } = inject('user')
  const { theme, changeTheme } = inject('theme')
  const router = useRouter()

  const handleSignout = () => {
    try {
      apiDelete('/login')
      clearStorage()
      setUser(null)
      emit('closeNav')
      router.push('/')
    } catch (e) {
      console.log(e)
    }
  }
</script>

<template>
	<div class="nav-block">
    <RouterLink @click="$emit('closeNav')" to="/" class="nav-link">
      home
    </RouterLink>
    <RouterLink @click="$emit('closeNav')" to="/blogs" class="nav-link">
      blogs
    </RouterLink>
    <RouterLink @click="$emit('closeNav')" to="/users" class="nav-link">
      users
    </RouterLink>  
  </div>
  <div class="nav-block">
    <IconButton
      :iconSize="20"
      :icon="theme === 'light' ? 'theme-dark' : 'theme-light'"
      @click="changeTheme"
    />
    <RouterLink
      v-if="user"
      @click="$emit('closeNav')"
      to="/profile"
      class="nav-link left"
    >
      my profile
    </RouterLink>
    <RouterLink
      v-else
      @click="$emit('closeNav')"
      to="/sign"
      class="nav-link left"
    >
      sign in / up
    </RouterLink>
    <IconButton
      v-if="user"
      :icon="'log-out'"
      :textBefore="'sign out'"
      @click="handleSignout"
      :style="{ paddingBottom: '9px' }"
    />
  </div>
</template>

<style scoped>
	.nav-block {
    display: flex;
    align-items: center;
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