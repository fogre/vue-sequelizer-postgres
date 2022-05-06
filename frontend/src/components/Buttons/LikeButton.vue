<script setup>
	import { inject, computed } from 'vue'
	import { useMutation } from 'vue-query'
	import Icon from '../Icons/Icon.vue'

	const props = defineProps({
		likes: { type: Number, required: true },
		blogId: { type: Number, required: true }
	})

	const { user } = inject('user')

	const handleClick = () => {
		console.log('asd')
	}

	const likeIcon = computed(() => {
		const u = user.value.liked_blogs.find(b => b.id === props.blogId)
		console.log(u)
		if (u) {
			return 'like-down'
		}
		return 'like-up'
	})
</script>


<template>
	<button
		@click="handleClick"
		class="g-unstyled-button g-flex-centered"
		:disabled="!user"
	>
		<p>{{ props.likes }}</p>
		<Icon
			:icon="likeIcon"
			:size="20"
		/>
	</button>
</template>