<script setup>
	import { computed, inject, watchEffect } from 'vue'
	import IconButton from '../Buttons/IconButton.vue'

	const props = defineProps({
		notif: { type: [Object, undefined], required: true }
	})

	const { setNotification } = inject('notification')

	const notifColor = computed(() => {
		switch(props.notif.type) {
			case 'error': return 'var(--color-error)'
			case 'success': return 'var(--color-success)'
			default: 'transparent'
		}
	})

	watchEffect(() => {
		if (props.notif && props.notif.message) {
			setTimeout(() => {
				setNotification('empty', null)
			}, 10000)
		}
	})
</script>

<template>
	<Teleport v-if="props.notif && props.notif.message" to="body">
		<div class="wrapper">
			<div
				class="notif-wrapper"
				:style="{ backgroundColor: notifColor }"
			>
				<IconButton
					:icon="'close'"
					:textBefore="props.notif.message"
					@handleClick="setNotification('empty', null)"	
				/>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
	.wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.notif-wrapper {
		border-radius: var(--radius-small);
		max-width: 350px;
		padding: 6px;
		margin: 0 0 16px 16px;
	}
</style>