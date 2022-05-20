<script setup>
	import { inject, ref, computed, watch } from 'vue'

	import { useUserLikes } from '../../composables/useUserLikes'
	import Link from '../Links/Link.vue'
	import TextButton from '../Buttons/TextButton.vue'

	const props = defineProps({
		blogId: { type: Number, required: true },
		likedBy: { type: [Array], required: true } 
	})

	const { userId, userHasLiked } = useUserLikes(props.blogId, props.likedBy)
	const showOthers = ref(false)
	const likesLength = computed(() => props.likedBy.length - 1)

	const handleShowOthers = () => showOthers.value = true
</script>

<template>
	<div class="wrapper">
		<div v-if="!props.likedBy || !props.likedBy.length">
			<p>No likes yet, be the first to like!</p>
		</div>
		<div v-else class="flex-wrapper">
			<p>Liked by</p>
			<Link
				v-if="userHasLiked"
				:linkType="'route'"
				:linkStyle="'text'"
				:url="'/profile'"
			>
				You
			</Link>
			<Link
				v-else
				:linkType="'route'"
				:linkStyle="'text'"
				:url="`/users/${props.likedBy[0].id}`"
			>
				{{ props.likedBy[0].username }}
			</Link>
			<TextButton
				v-if="likesLength > 0 && !showOthers"
				@handleClick="handleShowOthers"
				class="flex-wrapper"
			>
				and {{ likesLength }}
				<p v-if="likesLength > 1">others</p>
				<p v-else>other</p>
			</TextButton>
			<div v-else-if="likesLength > 0 && showOthers" class="flex-wrapper">
				<p>and</p>
				<div v-for="liker in likedBy">
					<Link
						v-if="
							!userHasLiked && liker.id !== props.likedBy[0].id ||
							userHasLiked && liker.id !== userId
						"
						:linkType="'route'"
						:linkStyle="'text'"
						:url="`/users/${liker.id}`"
					>
							{{ liker.username }}
					</Link>
				</div>	
			</div>
		</div>
	</div>
</template>

<style scoped>
	.wrapper {
		font-size: var(--font-small);
	}

	.flex-wrapper {
		color: var(--color-primary);
		display: flex;
		gap: 0.5ch;
	}
</style>