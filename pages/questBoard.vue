<template>
  <div>
    <Header />
    MAIN
    <v-btn @click="login()">HandCash login</v-btn>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    login() {
      const redirectionLoginUrl = this.$handCash.getRedirectionUrl()
      console.log(redirectionLoginUrl)
    },
  },
}
</script>

<style></style>
