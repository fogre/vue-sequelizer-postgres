<script setup>
	const props = defineProps({
		id: { type: Number, required: true },
		tagName: { type: String, required: true }
	})
</script>

<template>
	<RouterLink
		:to="`/tags/${props.id}`"
		class="paddedTagLink"
	>
		{{ props.tagName }}
	</RouterLink>
</template>

<style scoped>
	.paddedTagLink {
		padding: 6px;
		background-color: var(--color-secondary);
		font-weight: 700;
		color: white;
		border-radius: 4px;
		font-size: 14px;
		min-width: 4ch;
		text-align: center;

		&:hover {
			text-decoration: underline;
		}
	}
</style>