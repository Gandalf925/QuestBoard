<template>
  <div>
    <v-footer :absolute="!fixed" app>
      <span>&copy; Gandalf {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      right: true,
      rightDrawer: false,
    }
  },
}
</script>

<style></style>
