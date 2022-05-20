<script setup>
	import { useRouter } from 'vue-router'
	import { useQuery } from 'vue-query'
	import { apiGet } from '../utils/apiService'

	import BlogLikers from '../components/Other/BlogLikers.vue'
	import Icon from '../components/Icons/Icon.vue'
	import Link from '../components/Links/Link.vue'
	import TagLink from '../components/Links/TagLink.vue'
	import LikeButton from '../components/Buttons/LikeButton.vue'
	import DetailsCard from '../components/Cards/DetailsCard.vue'

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
			<DetailsCard>
				<p v-if="isLoading" class="g-flex-centered">Loading...</p>
				<p v-else-if="isError">Oops, error happened!</p>
				<div v-else class="content">
					<h2>{{ data.data.title }}</h2>
					<BlogLikers
						:blogId="data.data.id"
						:likedBy="data.data.liked_by"
					/>
					<div class="fields-wrapper">
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
					</div>
					<div class="tags-wrapper">
						<TagLink
							v-for="tag in data.data.tags"
							:id="tag.id"
							:tagName="tag.name"
						/>
					</div>
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
					<LikeButton
						:blogId="data.data.id"
						class="like-button"
					/>
				</div>
			</DetailsCard>
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

		& p {
			font-weight: 400;
		}
	}

	.fields-wrapper {
		margin: 24px 0;
	}

	.tags-wrapper {
		display: flex;
		gap: 16px;
		margin-bottom: 32px;
	}

	.like-button {
		position: absolute;
		right: 10px;
		top: 5px;
	}
</style>