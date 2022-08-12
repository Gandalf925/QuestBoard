<template>
  <div>
    <v-btn @click="getProfile">Push</v-btn>
  </div>
</template>

<script>
// firebase Functionsの内部で稼働するHandCashからの情報取得処理を書かねばならない。
export default {
  data() {
    return {
      // HandCashから取得予定
      handle: '',
      displayName: '',
      email: '',
      paymail: '',
      avatarUrl: '',
      selfDescription: '',
      authToken: '',
    }
  },
  methods: {},
}
</script>

<style></style>
