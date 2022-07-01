<template>
	<div class="wrapper">
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<style scoped>
	.wrapper {
		position: relative;
		margin-top: 32px;
		background-color: var(--background-color);
		padding: var(--padding-main) 16px;
		border-radius: var(--radius-large);
	}

	.content {
		max-width: 800px;
		margin: 0 auto;
	}
</style>