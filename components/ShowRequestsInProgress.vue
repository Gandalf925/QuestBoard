<template>
  <v-container>
    <v-sheet class="mx-auto" elevation="8" max-width="800">
      <h2 class="mt-2 ml-2">Request in Progress</h2>
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item v-for="n in 5" :key="n" v-slot="{ active, toggle }">
          <v-card class="ma-4" height="100" width="200" @click="toggle">
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    model: null,
  }),
}
</script>

<style></style>
