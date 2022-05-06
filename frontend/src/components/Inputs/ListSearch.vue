<script setup>
	import { ref, watch } from 'vue'
	import IconButton from '../Buttons/IconButton.vue'

	const emits = defineEmits(['handleSearch'])
	const searchValue = ref('')

	watch(() => searchValue.value, (newValue, oldValue) => {
		if (oldValue && !newValue) {
			emits('handleSearch', null)
		}
	})
</script>

<template>
	<form action="#" @submit.prevent="$emit('handleSearch', searchValue)">
		<input v-model="searchValue" type="search" />
		<button
			type="submit"
			class="search-button"
		>
			search
		</button>
	</form>
</template>

<style scoped>
	form {
		display: flex;
		width: 100%;
		height: 100%;
		border: 2px solid var(--color-secondary);
		border-radius: var(--radius-small);
		overflow-x: hidden;
		margin-bottom: 10px;

		&:focus-within, &:hover {
			outline: 3px solid var(--background-transparent-primary);
		}
	}

	input {
		padding: 8px 18px;
		width: 100%;
		border: none;
		outline: none
	}

	.search-button {
		border: none;
		cursor: pointer;
		padding: 0 18px;
		background-color: var(--background-transparent-primary);
		font-weight: 700;
	}
</style>