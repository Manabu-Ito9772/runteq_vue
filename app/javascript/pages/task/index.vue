<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <header class="mb-auto">
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1">{{ title }}</span>
      </nav>
    </header>
    <div class="row">
      <div class="col-12 col-lg-4">
        <div id="todo-list" class="bg-light rounded shadow m-3 p-3">
          <div class="h4">
            TODO
          </div>
          <div id="task-1" class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center">
            <span>スーパーに買い物に行く</span>
          </div>
          <div id="task-4" class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center">
            <span>子供の迎えに行く</span>
          </div>
          <div id="task-8" class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center">
            <span>新聞を解約する</span>
          </div>
          <div id="task-9" class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center">
            <span>ゴミ出しをする</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link to="/">
        <button type="button" class="btn btn-dark mt-5">戻る</button>
      </router-link>
    </div>
    <footer class="mt-auto text-center">
      <small>Copyright &copy; 2020. RUNTEQ</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data() {
    return {
      title: 'タスク管理アプリ'
    }
  }
}
</script>

<style scoped>
</style>
