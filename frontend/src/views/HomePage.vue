<script setup>
  import List from '../components/Lists/List.vue'
  import HomeInfo from '../components/HomeInfo/HomeInfo.vue'
</script>

<template>
  <div class="g-flex-centered">
    <div>
      <div class="top-lists-wrapper">
        <h1 class="heading">BlogList</h1>
        <div class="top-lists g-flex-centered">
          <div>
            <h2 class="g-text-centered">Top Blogs</h2>
            <List
              :cacheName="'blogs'"
              :resource="'/blogs'"
              :fields="['title', 'user', 'likes']"
              :gridColumns="`1fr 0.6fr 0.4fr`"
              :listType="'blog'"
            />
          </div>
          <div>
            <h2 class="g-text-centered">Top Users</h2>
            <List
              :cacheName="`users`"
              :resource="`/users`"
              :fields="['username', 'blogCount', 'blogLikes', 'averageLikes']"
              :fieldsAs="['user', 'blogs', 'likes', 'avg']"
              :gridColumns="`1fr 0.4fr 0.4fr 0.4fr`"
              :listType="'user'"
            />
          </div>
        </div>
      </div>
      <HomeInfo />
    </div>
  </div>
</template>

<style scoped>
  .heading {
    color: white;
    text-align: center;
    font-size: calc(1.5rem + 3vw);
  }

  .top-lists-wrapper {
    margin: 0 auto;
    min-height: calc(100vh - var(--nav-header-height));
    width: 100%;
    max-width: var(--content-max-width);
  }

  .top-lists {
    gap: 40px;
    padding: var(--padding-main) 0;
    flex-wrap:  wrap;
  }
</style>