<template>
  <header>
    <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-between">
      <span class="navbar-brand mb-0 h1">タスク管理アプリ</span>
      <ul class="navbar-nav">
        <template v-if="!authUser">
          <li class="nav-item active">
            <router-link
              :to="{ name: 'RegisterIndex' }"
              class="nav-link"
            >
              ユーザー登録
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link
              :to="{ name: 'LoginIndex' }"
              class="nav-link"
            >
              ログイン
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item active avatar-image-wrapper">
            <img
              :src="authUser.avatar_url"
              class="rounded avatar-image"
            >
          </li>
          <li class="nav-item active">
            <router-link
              :to="{ name: 'ProfileIndex' }"
              class="nav-link"
            >
              プロフィール
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link
              to="#"
              class="nav-link"
              @click.native="handleLogout"
            >
              ログアウト
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "TheHeader",
  computed: {
    ...mapGetters("users", ["authUser"])
  },
  methods: {
    ...mapActions("users", ["logoutUser"]),
    async handleLogout() {
      try {
        await this.logoutUser()
        this.$router.push({name: 'TopIndex'})
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.avatar-image-wrapper {
  line-height: 40px;
}
.avatar-image {
  width: 20px;
}
</style>
