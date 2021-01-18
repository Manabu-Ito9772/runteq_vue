<template>
  <div class="col-12 col-lg-4">
    <div :id="id" class="bg-light rounded shadow m-3 p-3">
      <slot name="header"></slot>
      <div v-for="task in tasks"
           :key="task.id"
           :id="'task-' + task.id"
           @click="handleShowTaskDetailModal(task)"
           class="bg-white border shadow-sm rounded my-2 p-4">
        <TaskItem :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem'

export default {
  components: { TaskItem },
  name: 'TaskList',
  props: [ 'tasks', 'id' ],
  methods: {
    handleShowTaskDetailModal(task) {
      this.$emit('show-detail-modal', task)
    }
  }
}
</script>

<style scoped>
</style>
