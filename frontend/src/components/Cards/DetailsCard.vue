<script setup>
	import BackButton from '../Buttons/BackButton.vue'
</script>

<template>
	<div class="wrapper">
		<BackButton />
		<div class="card-wrapper">
			<div class="content">
				<slot />
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
		position: relative;
		isolation: isolate;
	}

	.content {
		max-width: 800px;
		margin: 0 auto;
	}
</style>