<script setup>
	import { useRouter } from 'vue-router'
	import { reset } from '@formkit/core'
	import { useMutation } from 'vue-query'
	import { apiPost } from '../utils/apiService'
	import { addBlogSchema } from '../assets/formSchemas'
	import ViewCard from '../components/Cards/ViewCard.vue'

	const router = useRouter()
	const { mutateAsync } = useMutation(newBlog => apiPost('/blogs', newBlog))

	const handleSubmit = async (data, node) => {
		try {
			const newBlog = {
				title: data.title,
				url: data.url,
				author: data.author
			}

			if (data.tags && data.tags.length) {
				newBlog.tags = data.tags
			}
			const res = await mutateAsync(newBlog)
			router.push(`/blogs/${res.data.id}`)
		} catch (e) {
			console.log(e.response.data)
			node.setErrors(e.response.data.error)
		}	
	}
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Add a blog</h1>
			<ViewCard>
				<FormKit type="form" id="addBlogForm" @submit="handleSubmit">
		   	 <FormKitSchema :schema="addBlogSchema" />
		  	</FormKit>
			</ViewCard>
		</div>
	</div>
</template>