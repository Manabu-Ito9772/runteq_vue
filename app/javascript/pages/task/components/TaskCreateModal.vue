<template>
  <transition name="fade">
    <div id="task-create-modal">
      <div class="modal" @click.self="handleCloseModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <form>
                <div class="from-group mb-3">
                  <label for="title">タイトル</label>
                  <input type="text" class="form-control" id="title" name="タイトル" v-model="task.title" required>
                </div>
                <div class="from-group mb-3">
                  <label for="description">説明文</label>
                  <textarea class="form-control" id="description" name="説明文" rows="5" v-model="task.description"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-success" @click="createTask">追加</button>
                  <button type="button" class="btn btn-secondary" @click="handleCloseModal">閉じる</button>
                </div>
              </form>
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
  name: 'TaskCreateModal',
  data() {
    return {
      task: {
        title: '',
        description: ''
      }
    }
  },
  methods :{
    handleCloseModal() {
      this.$emit('close-modal')
    },
    createTask() {
      if(this.task.title){
        this.$emit('create-task', this.task)
      }
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
