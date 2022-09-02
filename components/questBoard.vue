<template>
  <div>
    <v-row>
      <v-col v-for="(request, index) in requests" :key="index" cols="6">
        <v-card
          class="d-flex align-center"
          color="brown lighten-2"
          hover
          height="110%"
          @click="openDialog(index)"
        >
          <v-card class="mx-auto" color="grey lighten-2" width="97%">
            <v-card-title>{{ request.title }}</v-card-title>
            <v-card-subtitle>{{ request.clientName }}</v-card-subtitle>
            <v-card-text class="d-flex align-end"
              >{{ request.satoshis.toLocaleString() }}sats</v-card-text
            >
          </v-card>
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
            <p class="mx-1">
              <v-card-text width="80%">{{
                currentRequest.description
              }}</v-card-text>
            </p>
            <v-card-text
              >Reward: {{ currentRequest.satoshis.toLocaleString() }} sats
              <p class="mx-3">
                (1BSV = 100,000,000sats = {{ rate }}USD)
              </p></v-card-text
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
            <v-card-actions class="d-flex justify-space-between">
              <v-btn elevation="6" @click="deleteJob()">Job Cancel</v-btn>
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
import getNextOwner from '@/src/handCash/getNextOwner'
import displayRate from '@/src/displayRate'

export default {
  data() {
    return {
      requests: [],
      dialog: false,
      selectedIndex: null,
      currentRequest: null,
      comment: '',
      rate: '',
    }
  },
  async beforeCreate() {
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
  async mounted() {
    await displayRate().then((res) => (this.rate = res.data.rate))
  },
  methods: {
    openDialog(index) {
      this.currentRequest = this.requests[index]
      this.dialog = true
    },
    async setComment(index) {
      this.$nuxt.$loading.start()
      this.dialog = false
      const masterRun = await getMasterRunInstance()
      const contract = await masterRun.load(this.currentRequest.location)
      await contract.sync()

      // comment投稿時につける日付
      const time = Date.now().toString()

      // commentをJigに書き込む処理
      contract.setDiscussions(
        this.$store.getters.getHandleName,
        this.comment,
        time
      )
      await contract.sync()

      // comment欄の初期化
      this.comment = ''

      // dialogをリフレッシュする処理

      const contractClass = await masterRun.load(
        '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1'
      )
      await masterRun.inventory.sync()
      const inventory = masterRun.inventory.jigs.filter(
        (jig) => jig instanceof contractClass
      )

      this.requests = JSON.parse(JSON.stringify(inventory))
      this.$nuxt.$loading.finish()
    },
    async deleteJob(index) {
      // 本当に消してよいか確認
      const isDelete = window.confirm(
        'Are you sure you want to delete this request?\r\nDeleted requests can be returned to BSV at the Redemption Office'
      )
      if (!isDelete) {
        return
      }
      this.$nuxt.$loading.start()
      // masterRunインスタンスを起動し、削除するrequestを読み込む
      this.dialog = false
      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      // 削除する人が依頼人か確認する
      const clientHandle = this.$store.getters.getHandleName

      if (request.clientName === clientHandle) {
        try {
          // NFTをクライアントのウォレットに送信する
          const nextOwner = await getNextOwner(
            this.$store.getters.getUserAuthToken
          )
          request.send(nextOwner.data)
          await masterRun.sync()
          await masterRun.inventory.sync()
          location.reload()
        } catch (e) {
          console.error('Error occured: ', e)
        }
      } else {
        window.alert('You are not client.')
      }
      this.$nuxt.$loading.finish()
    },
  },
}
</script>

<style></style>
