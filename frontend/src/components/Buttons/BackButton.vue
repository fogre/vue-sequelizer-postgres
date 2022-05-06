<script setup>
	import { useRouter } from 'vue-router'
	import IconButton from './IconButton.vue'

	const router = useRouter()
</script>

<template>
	<IconButton
		:icon="'arrow-left'"
		:iconSize="24"
		:iconColor="'white'"
		:textAfter="'back'"
		@handleClick="router.back"
		:style="{ marginBottom: '-30px' }"
	/>
</template>