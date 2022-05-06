<script setup>
	import SearchList from '../components/Lists/SearchList.vue'
	import ViewCard from '../components/Cards/ViewCard.vue'
</script>

<template>
	<div class="g-flex-centered">
		<div class="g-max-width-wrapper">
			<h1>Users</h1>
			<ViewCard>
				<SearchList
	        :cacheName="'users'"
	        :resource="'/users'"
	        :fields="['username', 'blogcount', 'likecount', 'averagelikes']"
	        :fieldsAs="['user', 'blogs', 'likes', 'avg']"
	        :gridColumns="`1fr 0.4fr 0.4fr 0.4fr`"
	      />
	    </ViewCard>  
		</div>
	</div>
</template>
