<script setup>
	const emits = defineEmits(['handleClick'])
</script>

<template>
	<button
		@click="$emit('handleClick')"
		class="g-unstyled-button"
	>
		<slot />
	</button>
</template>

<style scoped>
	button {

		&:hover {
			text-decoration: underline;
		}
	}
</style>