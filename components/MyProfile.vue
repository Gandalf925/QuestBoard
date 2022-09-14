<template>
  <v-container>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-flex class="mb-4">
            <v-layout justify-center>
              <v-avatar class="text-center mr-4" size="96">
                <img :src="avatar" />
              </v-avatar>
            </v-layout>
          </v-flex>
          <h3 class="text-center">{{ name }}</h3>
          <v-spacer />
          <h3 class="text-center">paymail: {{ paymail }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-btn class="primary" @click="logOut()">Log Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.handle,
      paymail: this.$store.state.paymail,
      avatar: this.$store.state.avatarUrl,
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },
  },
}
</script>

<style></style>
