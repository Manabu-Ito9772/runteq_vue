<template>
  <div
    id="app"
    class="d-flex flex-column min-vh-100"
  >
    <TheHeader class="mb-auto" />
    <router-view />
    <TheFooter class="mt-auto" />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import TheFooter from './components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style scoped>
</style>
