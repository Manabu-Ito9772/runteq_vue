<template>
  <div
    id="login-form"
    class="container w-50 text-center"
  >
    <div class="h3 mb-3">
      ログイン
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
    <button
      type="submit"
      class="btn btn-primary"
      @click="login"
    >
      ログイン
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions('users', [
      "loginUser",
    ]),
    async login() {
      try {
        await this.loginUser(this.user);
        this.$router.push({ name: 'TaskIndex' })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
</style>
