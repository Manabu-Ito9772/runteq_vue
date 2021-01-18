<template>
  <span>{{ task.title }}</span>
</template>

<script>
export default {
  name: 'TaskItem',
  props: [ 'task' ],
}
</script>

<style scoped>
</style>
