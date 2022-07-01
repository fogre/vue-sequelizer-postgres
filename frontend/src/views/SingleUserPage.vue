<script setup>
	import { useRouter } from 'vue-router'
	import { useQuery } from 'vue-query'
	import { apiGet } from '../utils/apiService'

	import Link from '../components/Links/Link.vue'
	import DetailsCard from '../components/Cards/DetailsCard.vue'

	const router = useRouter()

	const { isLoading, isError, error, data } = useQuery(
		['users', router.currentRoute.value.params.id],
		() => apiGet(router.currentRoute.value.path)
	)
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Users</h1>
			<DetailsCard
				:isLoading="isLoading"
				:isError="isError"
			>
				<h2 class="secondary-color">{{ data.data.username }}</h2>
				<p>{{ data.data.name }}</p>
				<div v-if="data.data.blogs" class="blogs-wrapper">
					<h3 class="secondary-color">Added blogs</h3>
					<p v-if="!data.data.blogs.length">
						User has not added blogs
					</p>
					<ul v-else v-for="blog in data.data.blogs" class="list-ol">
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
				</div>
			</DetailsCard>
		</div>
	</div>
</template>


<style scoped>
	.blogs-wrapper {
		margin-top: var(--margin-space);
	}
</style>