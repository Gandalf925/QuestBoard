<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      authToken:
        'd458106029fb0bfc416b7255fa906022c6613178bbcfbbf3c32f15397127ace5',
    }
  },
  mounted() {
    this.$store.dispatch('login', this.authToken)
  },
}
</script>

<style></style>
