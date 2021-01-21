<template>
  <div
    id="register-form"
    class="container w-50 text-center"
  >
    <div class="h3 mb-3">
      ユーザー登録
    </div>
    <div class="form-group text-left">
      <label for="name">ユーザー名</label>
      <input
        id="name"
        v-model="user.name"
        name="ユーザー名"
        type="text"
        placeholder="username"
        class="form-control"
      >
    </div>
    <div class="form-group text-left">
      <label for="email">メールアドレス</label>
      <input
        id="email"
        v-model="user.email"
        name="メールアドレス"
        type="email"
        placeholder="test@example.com"
        class="form-control"
      >
    </div>
    <div class="form-group text-left">
      <label for="password">パスワード</label>
      <input
        id="password"
        v-model="user.password"
        name="パスワード"
        type="password"
        placeholder="password"
        class="form-control"
      >
    </div>
    <div class="form-group text-left">
      <label for="password_confirmation">パスワード（確認</label>
      <input
        id="password_confirmation"
        v-model="user.password_confirmation"
        name="パスワード（確認）"
        type="password"
        placeholder="password"
        class="form-control"
      >
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      @click="register"
    >
      登録
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RegisterIndex',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    register() {
      this.$axios.post('users', this.user)
        .then(res => {
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
