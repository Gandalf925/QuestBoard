<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      authToken:
        'c19367575053954f6940a2a45d12b1e6a93a3750680b86213e6526d66628044f',
    }
  },
  mounted() {
    this.$store.dispatch('login', this.authToken)
  },
}
</script>

<style></style>
