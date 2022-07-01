<script setup>
	import BackButton from '../Buttons/BackButton.vue'

	const props = defineProps({
		isLoading: Boolean,
		isError: Boolean
	})
</script>

<template>
	<div class="wrapper">
		<BackButton />
		<div class="card-wrapper">
			<div class="content">
				<p v-if="props.isLoading" class="g-flex-centered">Loading...</p>
				<p v-else-if="props.isError">Oops, error happened!</p>
				<slot v-else/>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.wrapper {
		margin-top: 32px;
		width: 500px;
		max-width: 100%;
		margin: 0 auto;
	}

	.card-wrapper {
		margin-top: 2px;
		background-color: var(--background-color);
		padding: var(--padding-main);
		border-radius: var(--radius-large);
		border: var(--border-small);
		position: relative;
		isolation: isolate;
		min-height: 300px;
	}

	.content {
		max-width: 800px;
		margin: 0 auto;
	}
</style>