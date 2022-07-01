<script setup>
	import { ref, watch, watchEffect, inject } from 'vue'
	import { useRouter } from 'vue-router'
	import { useQuery, useMutation } from 'vue-query'
	import { apiGet, apiPost } from '../utils/apiService'
	import { addBlogSchema } from '../assets/formSchemas'
	import AddTagModal from '../components/Modals/AddTagModal.vue'
	import DetailsCard from '../components/Cards/DetailsCard.vue'
	import TextButton from '../components/Buttons/TextButton.vue'

	const router = useRouter()
	const { handleLogout } = inject('user')
	const openModal = ref(false)
	const tagsFilter = ref('')
	const selectedTags = ref([])
	const unselectedTags = ref([])
	
	const { mutateAsync } = useMutation(newBlog => apiPost('/blogs', newBlog))
	const { isLoading, isError, data } = useQuery('tags', () => apiGet('/tags'))

	/*
		set unselectedTags value when tag data is fetched
		and change it's value if tagFilter changes.
		Also filters the unselectedTags from selectedTags
	*/
	watch([tagsFilter, isLoading, isError, data], ([newFilter, newLoading, newError, newData]) => {
		if (newFilter && !newLoading && !newError) {
			unselectedTags.value = [...newData.data].filter(t => 
				t.name.toLowerCase().includes(newFilter.toLowerCase()) &&
				!selectedTags.value.find(st => st.id === t.id)
			)
		} else if (!newLoading && !newError) {
			unselectedTags.value = newData.data.filter(t =>
				!selectedTags.value.find(st => st.id === t.id)
			).slice(0,12)
		}
	})

	const addToSelectedTags = tag => {
		const filtered = [...selectedTags.value].filter(t => t.id !== tag.id)
		if (filtered.length < selectedTags.value.length) {
			selectedTags.value = filtered
			unselectedTags.value.push(tag)
			return
		}
		selectedTags.value.push(tag)
		unselectedTags.value = [...unselectedTags.value].filter(t => t.id !== tag.id)
	}

	const changeModalState = () => openModal.value = !openModal.value

	const addNewTagToList = newTag => {
		selectedTags.value.push(newTag)
		openModal.value = false
		tagsFilter.value = ''
	}

	const handleSubmit = async (data, node) => {
		try {
			const newBlog = {
				title: data.title,
				url: data.url,
				author: data.author
			}

			if (selectedTags.value && selectedTags.value.length) {
				newBlog.tags = [...selectedTags.value]
			}
			const res = await mutateAsync(newBlog)
			router.push(`/blogs/${res.data.blog.id}`)
		} catch (e) {
			console.log(e.response.data)
			node.setErrors(e.response.data.error)
			handleLogout(e)
		}
	}
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Add a blog</h1>
			<DetailsCard>
				<FormKit type="form" id="addBlogForm" @submit="handleSubmit">
		   	  <FormKitSchema :schema="addBlogSchema" />
		   	  <label class="form-label">Tags</label>
		   	  <div class="tags-wrapper">
  		  		<input
  		  			type="search"
			  			class="tags-filter-input"
			  			placeholder="Find tags"
			  			v-model="tagsFilter"
				  	/>
				  	<div>
				  		<p v-if="isLoading || isError">Loading...</p>
				  		<div v-else class="tags-selection-wrapper">
					  		<button
					  			v-for="stag in selectedTags"
					  			class="g-unstyled-button tag-select-button selected"
					  			@click="addToSelectedTags(stag)"
					  			type="button"
					  		>
					  			{{ stag.name }}
					  		</button>
					  		<button
					  			v-for="tag in unselectedTags"
					  			class="g-unstyled-button tag-select-button"
					  			@click="addToSelectedTags(tag)"
					  			type="button"
					  		>
					  			{{ tag.name }}
					  		</button>
					  	</div>
					  	<div v-if="!unselectedTags.length" class="new-tag-wrapper">
					  		<TextButton
					  			type="button"
					  			@click="changeModalState"
					  		>
					  			<p>No tags found.<span class="primary-color"> Add a new tag?</span></p>
					  		</TextButton>
					  	</div>
			  		</div>
		  		</div>
		  	</FormKit>
			</DetailsCard>
		</div>
		<AddTagModal
			:open="openModal"
			@close="changeModalState"
			@addTag="addNewTagToList"
		/>
	</div>
</template>

<style scoped>
	.tags-wrapper {
		border-radius: 6px;
	  padding: 10px 10px;
	  border: 2px solid var(--color-secondary);
	  margin-bottom: var(--margin-space);
	  min-height: 180px;
	  position: relative;
	  background-color: white;
	  color: black;

	  &:focus, &:hover {
    	box-shadow: 0px 0px 5px 0px var(--color-secondary);
  	}
	}

	.tags-filter-input {
		outline: none;
		border: none;
		border-bottom: 1px solid var(--color-secondary);
		width:  100%;
		display: block;
		margin-bottom: 16px;
	}

	.tags-selection-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.tag-select-button {
		font-size: var(--font-tiny);
		font-weight: 700;
		background-color: var(--color-secondary);
		padding: 5px 7px;
		min-width: 5ch;
		text-align: center;
		border-radius: 4px;
		color: white;
	}

	.selected {
		background-color: green;
	}

	.new-tag-wrapper {
		margin-top: 16px;
		text-align: center;
	}
</style>