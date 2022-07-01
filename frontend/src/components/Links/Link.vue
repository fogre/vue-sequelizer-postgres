<script setup>
	/*
		Renders either RouterLink or a depending on:
	  linkType:
	  	- should the link be a route or link to an external site.
	  	- possible values: 'route' and 'external'
	  linkStyle:
	  	- Link style class name
			- values: 'padded', 'text'
	  url: link url
	*/
	const props = defineProps({
		linkType: {
			type: String,
			required: true,
			validator: value => ['route', 'external'].includes(value)
		},
		linkStyle: {
			type: String,
			required: true,
			validator: value => ['padded', 'text'].includes(value)
		},
		url: { type: String, required: true }
	})
</script>

<template>
	<RouterLink
		v-if="props.linkType === 'route'"
		:to="props.url"
		:class="props.linkStyle"
	>
		<slot />
	</RouterLink>
	<a
		v-else-if="props.linkType === 'external'"
		:href="props.url"
		target="_blank"
		rel="noopener noreferrer"
		:class="props.linkStyle"
	>
		<slot />
	</a>
</template>

<style scoped>
	.padded {
		display: flex;
		align-items: center;
		gap: 3px;
	  padding: 6px 10px;
	  border: 2px solid var(--color-primary);
	  border-radius: var(--radius-small);
	  width: max-content;
	  color: var(--color-primary);

	  &:hover {
	    color: var(--color-primary);
	    outline: 1px solid var(--color-primary);
	  }
	}

	.text {
		color: var(--color-primary);

		&:hover {
			text-decoration: underline;
		}
	}
</style>