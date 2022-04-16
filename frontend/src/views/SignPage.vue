<script setup>
	import { inject } from 'vue'
	import { useRouter } from 'vue-router'
	import { reset } from '@formkit/core'
	import { signInSchema } from '../assets/formSchemas'
	import { apiPost } from '../utils/apiService'
	import { setStorage } from '../utils/localStorage'

	const router = useRouter()
	const { setUser } = inject('user')

	const handleSubmit = async (data, node) => {
		try {
			const res = await apiPost('/login', {
				username: data.username,
				password: data.password
			})
			setStorage(res.data)
			setUser(res.data)
			reset('loginForm')
			router.push('/profile')
		} catch (e) {
			console.log(e.response.data)
			node.setErrors(e.response.data.error)
		}
	}
</script>

<template>
	<div class="g-flex-centered">
		<div class="wrapper">
		  <FormKit type="form" id='loginForm' @submit="handleSubmit">
		    <FormKitSchema :schema="signInSchema" />
		  </FormKit>
		</div>  
	</div>  
</template>

<style scoped>
	.wrapper {
		padding: 24px 30px;
		border:  var(--border-large);
		border-radius: var(--radius-large);
	}
</style>