<script setup>
	import { inject } from 'vue'
	import { useMutation } from 'vue-query'
	import { apiPost } from '../../utils/apiService'
	import { addTagSchema } from '../../assets/formSchemas/addTagSchema'
	import IconButton from '../Buttons/IconButton.vue'

	const props = defineProps({
		open: { type: Boolean, required: true }
	})

	const { handleLogout } = inject('user')
	const emits = defineEmits(['close', 'addTag'])

	const { mutateAsync } = useMutation(newTag => apiPost('/tags', newTag))

	const handleSubmit = async (data, node) => {
		try {
			const res = await mutateAsync({ name: data.name })
			emits('addTag', res.data)
		} catch (e) {
			console.log(e)
			handleLogout(e)
			node.setErrors(e.response.data.error)
		}
	}
</script>

<template>
	<div>
		<div v-if="props.open" class="modal-wrapper">
			<div class="card-wrapper">
				<h2 class="secondary-color" :style="{ marginBottom: '16px'}">Add a new tag</h2>
				<FormKit type="form" id="addTagForm" @submit="handleSubmit">
					<FormKitSchema :schema="addTagSchema" />
				</FormKit>
				<div class="close-button-wrapper">
					<IconButton
						:textBefore="'close'"
						:icon="'close'"
						:iconSize="24"
						@click="$emit('close')"
					/>
				</div>
			</div>
		</div>
	</div>	
</template>

<style scoped>
	.modal-wrapper {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background-color: hsla(0deg, 100%, 100%, 60%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: var(--z-idx-modal);
	}

	.card-wrapper {
		margin-top: 2px;
		background-color: var(--background-color);
		padding: var(--padding-main);
		border-radius: var(--radius-large);
		border: var(--border-small);
		position: relative;
		width: 400px;
		max-width: 100%;
		position: relative;
	}

	.close-button-wrapper {
		position: absolute;
		top: 0;
		right: 0;
	}

</style>