<script setup>
  import { ref } from 'vue'
  import NavContent from './NavContent.vue'
  import IconButton from '../Buttons/IconButton.vue'

  const mobileNavOpen = ref(false)

  const handleMobileNav = () => {
    mobileNavOpen.value = !mobileNavOpen.value
  }
</script>

<template>
  <header>
    <nav>
      <div class="nav-desktop">
        <NavContent />
      </div>
      <div class="nav-mobile">
        <div class="nav-mobile-button-wrapper">
          <IconButton
            @handleClick="handleMobileNav()"
            :icon=" mobileNavOpen ? 'close' : 'menu'"
            :iconSize="24"
            :style="{
              color: mobileNavOpen ? 'black' : 'white'
            }"
          />
        </div>
        <Transition :name="'fade'">
          <div v-if="mobileNavOpen">
            <div class="nav-mobile-content">
              <NavContent
                @closeNav="handleMobileNav()"
              />
            </div>
            <button
              class="g-unstyled-button close-nav-button"
              @click="handleMobileNav()"
            />
          </div>
        </Transition>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  header {
    color: black;
    position: absolute;
    left: 0;
    top: 0;
    width:  100%;
    z-index: var(--z-idx-nav);
  }

  .nav-desktop {
    padding: 0 var(--padding-main);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: inherit;
    color: white;
    height: var(--nav-header-height);

    @media(max-width: 600px) {
      display: none;
    }
  }

  .nav-mobile {
    @media(min-width: 600px) {
      display: none;
    }
  }

  .nav-mobile-button-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
  }

  .nav-mobile-content {
    width: 100%;
    align-items: center;
    display: flex;
    gap: 16px;
    flex-direction: column;
    padding: 50px 0 16px;
    background-color: white;
  }

  .close-nav-button {
    width: 100%;
    height: 100vh;
    background: transparent;
  }
</style>