<template>
  <transition name="fade">
    <div :id="'task-detail-modal-' + task.id">
      <div class="modal" @click.self="handleCloseModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ task.title }}</h5>
              <button type="button" class="close" @click="handleCloseModal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="task.description">
              <p>{{ task.description }}</p>
            </div>
            <div class="modal-footer">
              <button @click="handleCloseModal" type="button" class="btn btn-secondary">閉じる</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TaskDetailModal',
  props: {
    task: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: Text,
        required: true
      }
    }
  },
  methods :{
    handleCloseModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
/* 表示/非表示はvueで制御するので最初から表示状態にする */
 .modal {
  display: block;
}

/* vueのtransitionを使わないなら不要 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
