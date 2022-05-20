<script setup>
	import { inject } from 'vue'
	import { useMutation, useQueryClient } from 'vue-query'
	import { apiPost } from '../../utils/apiService'
	import Icon from '../Icons/Icon.vue'

	const props = defineProps({
		blogId: { type: Number, required: true }
	})

	const queryClient = useQueryClient()
	const { user, addLike, removeLike } = inject('user')

	const { mutate } = useMutation(() => apiPost(`/blogs/${props.blogId}/likes`), {
		onError: error => {
			console.log(error)
		},
		onSuccess: async data => {
			//if data status is 200, a like is added
			if (data && data.status === 200 && data.data) {
				console.log('adding like')
				addLike(data.data)
			//if data.status is 204 a like is deleted
			} else if (data && data.status === 204) {
				console.log('removng like')
				removeLike(props.blogId)
			}
			await queryClient.invalidateQueries('/blogs', props.blogId)
		}
	})
</script>

<template>
	<button
		@click="() => mutate()"
		class="g-unstyled-button g-flex-centered like"
		:disabled="!user"
	>
		<Icon
			:icon="'like-up'"
			:size="25"
		/>
	</button>
</template>

<style scoped>
	.like {
		color: var(--color-primary);
		padding: 5px;
		height: min-content;
	}

</style>