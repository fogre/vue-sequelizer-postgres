<script setup>
  import TopList from '../components/Lists/TopList.vue'
  import HomeInfo from '../components/HomeInfo/HomeInfo.vue'
</script>

<template>
  <div class="g-flex-centered">
    <div>
      <div class="g-max-width-wrapper">
        <h1>BlogList</h1>
        <div class="top-lists g-flex-centered">
          <div>
            <h2 class="g-text-centered">Top Blogs</h2>
            <TopList
              :cacheName="'blogs'"
              :resource="'/blogs'"
              :fields="['title', 'user', 'likecount']"
              :fieldsAs="['title', 'user', 'likes']"
              :gridColumns="`1fr 0.6fr 0.4fr`"
            />
          </div>
          <div>
            <h2 class="g-text-centered">Top Users</h2>
            <TopList
              :cacheName="`users`"
              :resource="`/users`"
              :fields="['username', 'blogcount', 'likecount', 'averagelikes']"
              :fieldsAs="['user', 'blogs', 'likes', 'avg']"
              :gridColumns="`1fr 0.4fr 0.4fr 0.4fr`"
            />
          </div>
          <div>
            <h2 class="g-text-centered">Top Authors</h2>
            <TopList
              :cacheName="`authors`"
              :resource="`/authors`"
              :fields="['author', 'blogs', 'likecount']"
              :fieldsAs="['author', 'blogs', 'likes']"
              :gridColumns="`1fr 0.5fr 0.5fr`"
            />
          </div>
        </div>
      </div>
      <HomeInfo />
    </div>
  </div>
</template>

<style scoped>
  .top-lists {
    gap: 40px;
    padding: var(--padding-main) 0;
    flex-wrap:  wrap;
  }
</style>