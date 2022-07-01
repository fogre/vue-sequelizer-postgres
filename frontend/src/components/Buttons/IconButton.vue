<script setup>
	import Icon from '../Icons/Icon.vue'

	const props = defineProps({
		icon: { type: String, required: true },
		iconSize: Number,
		iconColor: String,
		iconBackground: String,
		buttonStyle: String,
		textBefore: String,
		textAfter: String
	})

	defineEmits(['handleClick'])
</script>

<template>
	<button
		@click="$emit('handleClick')"
		class="g-unstyled-button g-flex-centered"
		:class="props.buttonStyle"
	>
		{{ props.textBefore }}
		<Icon
			:icon="props.icon"
			:size="props.iconSize"
			:color="props.iconColor"
			:background="props.iconBackground"
			:style="{ margin: '0 2px' }"
		/>
		{{ props.textAfter }}
	</button>
</template>

<style scoped>
	button {
		padding: 6px;
		color: v-bind(props.iconColor);
		font-weight: 700;

		&:hover {
			color: var(--color-primary);
		}
	}

	.bordered {
		margin-bottom: 16px;
		padding: 6px 10px;
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-small);

		&:hover {
			color: var(--color-primary);
			outline: 1px solid var(--color-primary);
		}
	}

	.secondary {
		border-color: var(--color-secondary);

		&:hover {
			color: var(--color-secondary);
			outline-color: var(--color-secondary);
		}
	}
</style>