<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      authToken: '',
    }
  },
  mounted() {
    this.authToken = this.$route.query.authToken
    this.$store.dispatch('login', this.authToken)
    this.$router.push('/questBoard')
  },
}
</script>

<style></style>

<!-- authToken:
// 'd458106029fb0bfc416b7255fa906022c6613178bbcfbbf3c32f15397127ace5', // Gandalf925
// 'd80a6c861672d2a57d7d5044e75f3aae03f9100d21b842da94eddfd5560f491a', // GandalfTest -->
