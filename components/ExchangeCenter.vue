<template>
  <div>
    <v-row>
      <v-col cols="12" xl="4" lg="4" md="4" sm="6" xs="12">
        <v-sheet>
          <!-- 続きはここから -->
        </v-sheet>
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
