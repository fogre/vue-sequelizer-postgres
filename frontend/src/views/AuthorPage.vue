<script setup>
	import { useRouter } from 'vue-router'
	import { useQuery } from 'vue-query'
	import { apiGet } from '../utils/apiService'

	import Link from '../components/Links/Link.vue'
	import DetailsCard from '../components/Cards/DetailsCard.vue'

	const router = useRouter()

	const { isLoading, isError, error, data } = useQuery(
		['authors', router.currentRoute.value.params.author],
		() => apiGet(router.currentRoute.value.path)
	)
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Author</h1>
			<DetailsCard
				:isLoading="isLoading"
				:isError="isError"
			>
				<h2 class="secondary-color">{{ router.currentRoute.value.params.author }}</h2>
				<h3
					class="secondary-color"
					:style="{ marginTop: '24px'}"
				>
					Blogs
				</h3>
				<p v-if="!data.data.length">
					Author has no blogs
				</p>
				<ul v-else v-for="blog in data.data" class="list-ol">
					<li class="list-li">
						<Link
							:linkType="'route'"
							:linkStyle="'text'"
							:url="`/blogs/${blog.id}`"
						>
							{{ blog.title }}
						</Link>
					</li>
				</ul>
			</DetailsCard>
		</div>
	</div>
</template>