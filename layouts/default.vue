<template>
  <v-app dark>
    <v-main>
      <Header />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <div class="d-block d-sm-none">
      <v-btn>これが表示されたらOKK</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>

<style></style>
