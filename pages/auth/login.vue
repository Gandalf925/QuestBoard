<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      authToken:
        '825c7edff0c66e10948925c065bc818ebbbead464be5255881c63b17f95f50b6',
    }
  },
  mounted() {
    this.$store.dispatch('login', this.authToken)
  },
}
</script>

<style></style>
