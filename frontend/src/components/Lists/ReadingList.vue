<script setup>
	import { ref, computed } from 'vue'
	import { useMutation, useQueryClient } from 'vue-query'
	import { apiPut } from '../../utils/apiService'
	import Link from '../Links/Link.vue'
	import ListLabels from './ListLabels.vue'
	import IconButton from '../Buttons/IconButton.vue'
	import TextButton from '../Buttons/TextButton.vue'

	const props = defineProps({
		readinglist: { type: Array, required: true }
	})

	const queryClient = useQueryClient()
	const sortedReadings = ref(
		[...props.readinglist].filter(b => b.readinglist.read === false)
	)
	const readBlogs = ref(false)
	const readingsGridTemplate = '1fr 0.3fr'

	const { mutate } = useMutation(reading => apiPut(`/readinglists/${reading.id}`, reading.body), {
		onError: error => {
			console.log(error)
		},
		onSuccess: async data => {
			await queryClient.invalidateQueries('profile')
			sortedReadings.value = props.readinglist.filter(b => b.readinglist.read === readBlogs.value)
		}
	})

	const handleChangeReadStatus = reading => {
		mutate({
			id: reading.id,
			body: { read: !reading.read }
		})
	}

	const sortList = index => {
		if (index === 0) {
			sortedReadings.value.reverse()
		} else if (index === 1) {
			sortedReadings.value = props.readinglist.filter(b => b.readinglist.read !== readBlogs.value)
			readBlogs.value = !readBlogs.value
		}
	}
</script>


<template>
	<div class="wrapper">
		<ListLabels
			:fields="['blog', 'read']"
			:gridColumns="readingsGridTemplate"
			@sortList="sortList"
		/>
		<ol class="list-ol">
			<div v-if="!sortedReadings.length" class="g-text-centered not-found-wrapper">
				<p>No <span v-if="!readBlogs"> unread</span><span v-else> read</span> blogs found</p>
				<TextButton
					:style="{ color: 'var(--color-primary)' }"
					@click="sortList(1)"
				>
					<p>Show <span v-if="!readBlogs"> read</span><span v-else> unread</span> blogs instead</p>
				</TextButton>
			</div>
			<li
				v-else 
				v-for="blog in sortedReadings"
				class="list-grid-field list-grid-columns list-li"
				:style="{ gridTemplateColumns: readingsGridTemplate }"
			>
				<div class="list-item g-flex-centered">
					<RouterLink
					  :to="`/blogs/${blog.id}`"
					  class="list-link"
					>
						{{ blog.title }}
					</RouterLink>	
				</div>
				<div class="list-item g-flex-centered">
					<IconButton
						:icon="readBlogs ? 'check-icon' : 'close'"
						:iconColor="readBlogs ? 'var(--color-success)' : 'inherit'"
						:textAfter="readBlogs ? 'yes' : 'no'"
						:style="{ border: '1px solid var(--color-secondary)', borderRadius: '7px' }"
						@click="handleChangeReadStatus(blog.readinglist)"
					>	
						{{ blog.readinglist.read }}
					</IconButton>	
				</div>
			</li>
		</ol>
	</div>
</template>

<style scoped>
	.wrapper {
		overflow-x: hidden;
		max-height: 250px;
		min-height: 150px;
		border-bottom: 1px solid var(--color-secondary);
		background-color: var(--background-color);
	}

	.not-found-wrapper {
		margin-top: var(--margin-space);
	}
</style>