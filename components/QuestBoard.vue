<!-- eslint-disable no-console -->
<template>
  <div>
    <v-row>
      <v-col v-for="(request, index) in requests" :key="index" cols="3">
        <v-card
          class="mx-auto"
          hover
          :img="require('@/assets/img/cardBackgroundImage.png')"
          style="border: 5px solid #6d4c37"
          @click="openDialog(index)"
        >
          <v-card-title class="font-weight-black">{{
            request.title
          }}</v-card-title>
          <v-card-subtitle class="font-weight-bold">{{
            request.clientName
          }}</v-card-subtitle>
          <v-card-text class="d-flex align-end font-weight-black"
            >{{ request.satoshis.toLocaleString() }}sats</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <dialog-card :current-request="currentRequest"></dialog-card>
    </v-dialog>
  </div>
</template>

<script>
import loadRequestJigs from '@/src/middle/loadRequestJigs'

export default {
  data() {
    return {
      requests: [],
      currentRequest: null,
      dialog: false,
    }
  },
  async beforeCreate() {
    const inventory = await loadRequestJigs()

    // NuxtにRequestsをコピー
    this.requests = JSON.parse(JSON.stringify(inventory))

    // 日付で降順に並べ替え
    this.requests
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .reverse()
  },
  methods: {
    openDialog(index) {
      // 選択したrequestをdialogへ表示
      this.currentRequest = this.requests[index]
      this.dialog = true
    },
  },
}
</script>

<style></style>
