<template>
  <div class="d-flex flex-column min-vh-100">
    <the-header/>
    <router-view/>
    <the-footer/>
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
