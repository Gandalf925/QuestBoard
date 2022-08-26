<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      authToken:
        '289cb224516b42731239fa80e6a7bba1612db3381cf688a4332972cc8a09fae0',
    }
  },
  mounted() {
    this.$store.dispatch('login', this.authToken)
  },
}
</script>

<style></style>
