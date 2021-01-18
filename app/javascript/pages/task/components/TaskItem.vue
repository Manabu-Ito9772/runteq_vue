<template>
  <div :id="'task-' + task.id">
    <span>{{ task.title }}</span>
  </div>  
</template>

<script>
export default {
  name: 'TaskItem',
  props: [ 'task' ],
}
</script>

<style scoped>
</style>
