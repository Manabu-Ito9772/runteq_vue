<template>
  <div
    id="login-form"
    class="container w-50 text-center"
  >
    <div class="h3 mb-3">
      ログイン
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <div class="form-group text-left">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
        >
          <label for="email">メールアドレス</label>
          <input
            id="email"
            v-model="user.email"
            name="メールアドレス"
            type="email"
            placeholder="test@example.com"
            class="form-control"
          >
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group text-left">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:3"
        >
          <label for="password">パスワード</label>
          <input
            id="password"
            v-model="user.password"
            name="パスワード"
            type="password"
            placeholder="password"
            class="form-control"
          >
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="handleSubmit(login)"
      >
        ログイン
      </button>
    </ValidationObserver>
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
