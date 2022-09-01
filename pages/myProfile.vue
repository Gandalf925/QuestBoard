<template>
  <v-container fluid>
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
          <v-btn @click="logOut()" class="primary">Log Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <show-my-requests />
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
