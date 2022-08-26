<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-flex class="mb-4">
            <v-avatar size="96" class="mr-4">
              <img :src="avatarUrl" />
            </v-avatar>
          </v-flex>
          <v-text-field v-model="name" label="name"></v-text-field>
          <v-text-field
            v-model="paymail"
            label="paymail Address"
          ></v-text-field>
        </v-card-text>
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
}
</script>
