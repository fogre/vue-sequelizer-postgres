<script setup>
	import { computed } from 'vue'
	import {
		ArrowNarrowLeftIcon,
		ExternalLinkIcon,
		PlusIcon,
		ThumbUpIcon,
		XIcon
	} from '@heroicons/vue/solid'

	const props = defineProps({
		icon: { type: String, required: true },
		size: Number,
		color: String,
		background: String
	})

	const iconToRender = computed(() => {
		switch(props.icon) {
			case 'arrow-left': return ArrowNarrowLeftIcon
			case 'external-link': return ExternalLinkIcon
			case 'like-up': return ThumbUpIcon
			case 'plus': return PlusIcon
			case 'close': return XIcon
			default: throw new Error(`Icon ${props.icon} not imported`)
		}
	})
</script>

<template>
	<component
		:is="iconToRender"
		:style="{
			width: props.size ? `${props.size}px` : '16px',
			color: props.color ? props.color : 'inherit',
			backgroundColor: props.background ? props.background : 'inherit'
		}"
	/>
</template>