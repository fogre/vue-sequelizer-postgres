<script setup>
	import { computed } from 'vue'
	import {
		ArrowNarrowLeftIcon,
		CheckIcon,
		ClipboardListIcon,
		ExternalLinkIcon,
		MenuIcon,
		MoonIcon,
		PlusIcon,
		LogoutIcon,
		SunIcon,
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
			case 'check-icon': return CheckIcon
			case 'close': return XIcon
			case 'external-link': return ExternalLinkIcon
			case 'like-up': return ThumbUpIcon
			case 'list': return ClipboardListIcon
			case 'log-out': return LogoutIcon
			case 'menu': return MenuIcon
			case 'plus': return PlusIcon
			case 'theme-dark': return MoonIcon
			case 'theme-light': return SunIcon
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