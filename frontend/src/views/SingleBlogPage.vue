<script setup>
	import { useRouter } from 'vue-router'
	import { useQuery } from 'vue-query'
	import { apiGet } from '../utils/apiService'

	import BackButton from '../components/Buttons/BackButton.vue'
	import Icon from '../components/Icons/Icon.vue'
	import Link from '../components/Links/Link.vue'
	import LikeButton from '../components/Buttons/LikeButton.vue'
	import ViewCard from '../components/Cards/ViewCard.vue'

	const router = useRouter()

	const { isLoading, isError, error, data } = useQuery(
		['/blogs', router.currentRoute.value.params.id],
		() => apiGet(router.currentRoute.value.path)
	)
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Blogs</h1>
			<BackButton />
			<ViewCard>
				<p v-if="isLoading" class="g-flex-centered">Loading...</p>
				<p v-else-if="isError">Oops, error happened!</p>
				<div v-else class="content">
					<h2>{{ data.data.title }}</h2>
					<div class="field">
						<LikeButton
							:likes="data.data.likecount"
							:blogId="data.data.id"
						/>
					</div>
					<div class="field">
						<p>Link:</p>
						<Link
							:linkType="'external'"
							:linkStyle="'text'"
							:url="data.data.url"
						>
							{{ data.data.url }}
						</Link>
					</div>
					<div class="field">
						<p>Author:</p>
						<Link
							v-if="data.data.author"
							:linkType="'route'"
							:linkStyle="'text'"
							:url="`/authors/${data.data.author}`"
						>
							{{ data.data.author }}
						</Link>
						<p v-else>?</p>
					</div>
					<div class="field">
						<p>Added by:</p>
						<Link
							:linkType="'route'"
							:linkStyle="'text'"
							:url="`/users/${data.data.user.id}`"
						>
							{{ data.data.user.username }}
						</Link>
					</div>
					<p v-for="tag in data.data.tags">
						{{ tag.name }}
					</p>
					<Link
						:linkType="'external'"
						:linkStyle="'padded'"
						:url="data.data.url"
					>
						view blog
						<Icon
							:icon="'external-link'"
							:size="20"
						/>
					</Link>
				</div>
			</ViewCard>
		</div>
	</div>
</template>

<style scoped>
	.content {
		& h2 {
			color: var(--color-secondary);
		}
	}

	.field {
		display: flex;
		gap: 6px;
		font-weight: 700;
		margin-bottom: 5px;
	}
</style>