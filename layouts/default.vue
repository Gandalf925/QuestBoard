<template>
  <v-app dark>
    <v-main class="backGround">
      <v-container>
        <Header />
        <Nuxt />
      </v-container>
    </v-main>
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

<style>
.backGround {
  background-image: url('@/assets/img/questBoard_background.png');
  background-position-y: 50px;
  background-size: cover;
}
</style>
