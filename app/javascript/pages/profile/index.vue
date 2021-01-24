<template>
  <div
    id="profile-form"
    class="container w-50 text-center"
  >
    <div class="h3 mb-3">
      プロフィール
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <div class="form-group text-left">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        >
          <label for="name">ユーザー名</label>
          <input
            id="name"
            v-model="name"
            name="ユーザー名"
            type="text"
            class="form-control"
          >
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group text-left">
        <!-- <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        > -->
        <label
          for="avatar"
          class="d-block mb-4"
        >プロフィール画像</label>
        <div class="nav-item active avatar-image-wrapper">
          <img
            :src="avatar"
            class="rounded avatar-image mb-4"
            style="width: 200px"
          >
        </div>
        <input
          id="avatar"
          name="ユーザー名"
          type="file"
          accept="image/png,image/jpeg"
          class="form-control-file"
          @change="setAvatar"
        >
        <!-- <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider> -->
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="handleSubmit(update)"
      >
        更新
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileIndex',
  data() {
    return {
      id: null,
      name: '',
      uploadAvatar: null,
      avatar: null,
      a: null
    }
  },
  computed: {
    ...mapGetters('users', ['authUser'])
  },
  created() {
    this.setUser();
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    setUser() {
      this.id = this.authUser.id
      this.name = this.authUser.name
      this.avatar = this.authUser.avatar_url
    },
    setAvatar(e) {
      e.preventDefault();
      let files = e.target.files;
      this.uploadAvatar = files[0];
    },
    update() {
      let formData = new FormData();
      formData.append('avatar', this.uploadAvatar);
      formData.append('name', this.name);
      let config = {
        headers: {
         'content-type': 'multipart/form-data'
        }
      };
      this.$axios.patch(`users/${this.id}`, formData, config)
        .then(res => {
          this.uploadAvatar = null;
        })
        .catch(err => {
          console.log(err)
        })
        .then(res => {
          this.updateUser();
        })
        .catch(err => {
          console.log(err)
        })
        .then(res => {
          this.$router.push('/tasks');
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>
</style>
