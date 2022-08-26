<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div>
    <v-btn elevation="6" class="my-2" @click="displayRequests()"
      >Show Requests</v-btn
    >
    <v-row>
      <v-col v-for="(request, index) in requests" :key="index" cols="6" md="4">
        <v-card color="amber lighten-4" hover @click="openDialog(index)">
          <v-toolbar color="brown lighten-1" dark flat>{{
            request.title
          }}</v-toolbar>
          <v-card-subtitle>{{ request.clientName }}</v-card-subtitle>
          <v-card-text class="d-flex align-end"
            >{{ request.satoshis.toLocaleString() }}sats</v-card-text
          >
        </v-card>

        <v-dialog v-model="dialog" max-width="70%" :retain-focus="false">
          <v-card>
            <v-card-title>{{ currentRequest.title }}</v-card-title>
            <v-card-subtitle
              >Client: {{ currentRequest.clientName }}</v-card-subtitle
            >
            <v-card-subtitle
              >CreatedAt: {{ currentRequest.createdAt }}</v-card-subtitle
            >
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <h3 class="mx-3">Request detail</h3>
            <v-card-text width="80%">{{
              currentRequest.description
            }}</v-card-text>
            <v-card-text
              >Reward:
              {{ currentRequest.satoshis.toLocaleString() }} sats</v-card-text
            >
            <v-card-text>Deadline: {{ currentRequest.limit }}</v-card-text>
            <v-card-text
              >Request location: {{ currentRequest.location }}</v-card-text
            >

            <v-divider inset></v-divider>
            <div id="discussions">
              <h3 class="mx-3">Comments</h3>

              <div
                v-for="(comment, index) in currentRequest.discussions"
                :key="index"
                scrollable
              >
                <v-card-text>name:{{ comment.name }}</v-card-text>
                <v-card-text>{{ comment.comment }}</v-card-text>
                <v-card-text>{{ Date(comment.time) }}</v-card-text>
                <v-divider></v-divider>
              </div>
              <v-card-actions>
                <v-text-field
                  v-model="comment"
                  placeholder="Comment"
                ></v-text-field>
                <v-btn v-show="comment" class="mx2" @click="setComment(index)"
                  >Comment</v-btn
                >
              </v-card-actions>
            </div>
            <v-divider inset></v-divider>
            <v-card-actions>
              <v-btn elevation="6">Get to work</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import getMasterRunInstance from '@/src/middle/getMasterRunInstance'
export default {
  data() {
    return {
      requests: [],
      dialog: false,
      selectedIndex: null,
      currentRequest: null,
      comment: '',
    }
  },
  methods: {
    async displayRequests() {
      // runインスタンスの起動
      const masterRun = await getMasterRunInstance()

      // ContractClassの読み込み
      const contract = await masterRun.load(
        '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1'
      )

      // Boardに載るRequests(masterのinventory）を読み込み
      await masterRun.inventory.sync()
      const inventory = masterRun.inventory.jigs.filter(
        (jig) => jig instanceof contract
      )

      // NuxtにRequestsをコピー
      this.requests = JSON.parse(JSON.stringify(inventory))

      // 日付で降順に並べ替え
      this.requests
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .reverse()

      // エラー回避のためにcurrentRequestにデータを読み込み
      this.currentRequest = this.requests[0]
    },
    openDialog(index) {
      this.currentRequest = this.requests[index]
      this.dialog = true
    },
    async setComment(index) {
      const masterRun = await getMasterRunInstance()
      const contract = await masterRun.load(this.currentRequest.location)

      // comment投稿時につける日付
      const time = Date.now().toString()

      // commentをJigに書き込む処理
      contract.setDiscussions('Gandalf', this.comment, time)
      await contract.sync()

      // comment欄の初期化
      this.comment = ''

      // dialogをリフレッシュする処理
      this.dialog = false
      const contractClass = await masterRun.load(
        '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1'
      )
      await masterRun.inventory.sync()
      const inventory = masterRun.inventory.jigs.filter(
        (jig) => jig instanceof contractClass
      )

      this.requests = JSON.parse(JSON.stringify(inventory))
      this.currentRequest = this.requests[index]
      this.dialog = true
    },
  },
}
</script>

<style></style>
