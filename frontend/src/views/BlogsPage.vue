<script setup>
	import { inject } from 'vue'
	import SearchList from '../components/Lists/SearchList.vue'

	import Icon from '../components/Icons/Icon.vue'
	import Link from '../components/Links/Link.vue'
	import ViewCard from '../components/Cards/ViewCard.vue'

	const { user } = inject('user')
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Blogs</h1>
			<ViewCard>
				<Link
					v-if="user"
					:linkType="'route'"
					:linkStyle="'padded'"
					:url="'/blogs/add'"
					:style="{ marginBottom: '16px' }"
				>
					add blog
					<Icon
						:icon="'plus'"
						:color="'var(--color-primary)'"
						:size="16"
					/>
				</Link>
				<SearchList
	        :cacheName="'blogs'"
	        :resource="'/blogs'"
	        :fields="['title', 'author', 'likecount', 'createdAt']"
	        :fieldsAs="['title', 'author', 'likes', 'date']"
	        :gridColumns="`1fr 0.8fr 0.4fr 0.4fr`"
	      />
	    </ViewCard>
		</div>
	</div>
</template>
