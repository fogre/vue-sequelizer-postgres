<script setup>
	import { inject } from 'vue'
	import { useRouter } from 'vue-router'
	import { reset } from '@formkit/core'
	import { signUpSchema } from '../assets/formSchemas'
	import { apiPost } from '../utils/apiService'
	import { setStorage } from '../utils/localStorage'
	import Link from '../components/Links/Link.vue'

	const router = useRouter()
	const { setUser } = inject('user')

	const handleSubmit = async (data, node) => {
		try {
			const res = await apiPost('/users', {
				username: data.username,
				name: data.name,
				password: data.passgroup.password
			})
			setStorage(res.data)
			setUser(res.data)
			reset('signupForm')
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
		  <FormKit type="form" id='signupForm' @submit="handleSubmit">
		    <FormKitSchema :schema="signUpSchema" />
		  </FormKit>
		  <br />
		  <Link
		  	:linkType="'route'"
		  	:linkStyle="'text'"
		  	:url="'/sign'"
		  >
		  	<p class="g-text-centered">Already have an account? Sign in.</p>
		  </Link>
		</div>  
	</div>  
</template>