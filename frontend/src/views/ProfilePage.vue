<script setup>
	import { inject, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { useQuery } from 'vue-query';
  import { apiDelete, apiGetWithCredentials} from '../utils/apiService'
  import { clearStorage } from '../utils/localStorage'
  import ViewCard from '../components/Cards/ViewCard.vue'
  import ReadingList from '../components/Lists/ReadingList.vue'

  const router = useRouter()
  const { user, setUser, handleLogout } = inject('user')
  const { isLoading, isError, error, data } = useQuery(
  	['profile'], () => apiGetWithCredentials('/users/profile')
  )

  watch([isError, error], () => {
  	if (isError) {
  		handleLogout(error.value)
  	}
  })
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Profile</h1>
			<ViewCard>
				<p v-if="isLoading">Loading...</p>
				<p v-else-if="isError">{{ error.message }}</p>
				<div v-else>
					<h2 class="secondary-color g-text-uppercase g-margin-bottom">
						{{ data.data.username }}
					</h2>
					<div class="readinglist-wrapper">
						<h3 class="secondary-color g-text-centered">Reading list</h3>
						<ReadingList
							:readinglist="data.data.readings"
						/>
					</div>
				</div>
			</ViewCard>	
		</div>
	</div>
</template>


<style scoped>
	.readinglist-wrapper {
		margin: var(--margin-space) 0;
	}
</style>