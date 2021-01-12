<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">タスク管理アプリ</a>
    </nav>
    <p class="h4">{{ message }}</p><br>
    <p>生活や仕事に関するタスクを見える化して抜け漏れを防ぎましょう。</p><br>
    <div class="text-center my-3">
      <button type=button class="btn btn-dark">はじめる</button>
    </div>
    <footer class='footer-bottom text-center h6'>
      <p>Copyright © 2019. RUNTEQ</p>
    </footer>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "タスクを管理しよう！"
    }
  }
}
</script>

<style scoped>
p {
  text-align: center;
}
</style>
