<script setup>
	import { inject } from 'vue'
	import { useRouter } from 'vue-router'
	import { useQuery } from 'vue-query';
  import { apiDelete, apiGetUser } from '../utils/apiService'
  import { clearStorage } from '../utils/localStorage'

  const router = useRouter()
  const { user, setUser } = inject('user')
  const { isLoading, isError, data, error } = useQuery(
  	['users', user.value.id], () => apiGetUser(user.value.id)
  )

  const handleSignout = () => {
  	try {
  		apiDelete('/login')
  		clearStorage()
  		setUser(null)
  		router.push('/')
  	} catch (e) {
  		console.log(e)
  	}
  }
</script>

<template>
	<div>
		<h1>{{ user.username }}</h1>
		<p>{{ user.name }}</p>
		<p v-if="isLoading">Loading...</p>
		<p v-else-if="isError">{{ error.message }}</p>
		<ul v-else>
			<li>{{ data.data }}</li>
		</ul>
		<button @click="handleSignout">sign out</button>
	</div>
</template>