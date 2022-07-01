<script setup>
	import { inject } from 'vue'
	import { useRouter } from 'vue-router'
	import { reset } from '@formkit/core'
	import { signInSchema } from '../assets/formSchemas'
	import { apiPost } from '../utils/apiService'
	import { setStorage } from '../utils/localStorage'
	import Link from '../components/Links/Link.vue'

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
		<div class="sign-form-wrapper">
		  <FormKit type="form" id='loginForm' @submit="handleSubmit">
		    <FormKitSchema :schema="signInSchema" />
		  </FormKit>
		  <br />
		  <Link
		  	:linkType="'route'"
		  	:linkStyle="'text'"
		  	:url="'/signup'"
		  >
		  	<p class="g-text-centered">Don't have an account? Register!</p>
		  </Link>
		</div>
	</div>  
</template>