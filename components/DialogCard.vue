<template>
  <v-card style="border: 5px solid #6d4c37">
    <v-card-title>{{ currentRequest.title }}</v-card-title>
    <v-card-subtitle>Client: {{ currentRequest.clientName }}</v-card-subtitle>
    <v-card-subtitle>CreatedAt: {{ currentRequest.createdAt }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <h3 class="mx-3">Request detail</h3>
    <p class="mx-1">
      <v-card-text
        style="white-space: pre-wrap; word-wrap: break-word"
        width="80%"
        >{{ currentRequest.description }}</v-card-text
      >
    </p>
    <v-divider></v-divider>
    <v-card-text
      >Reward: {{ satoshisLocalScale }} sats
      <p class="mx-3">(100,000,000sats(1BSV) = {{ rate }}USD)</p></v-card-text
    >

    <v-card-text>Deadline: {{ currentRequest.limit }}</v-card-text>
    <v-card-text>Request location: {{ currentRequest.location }}</v-card-text>

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
        <v-text-field v-model="comment" placeholder="Comment"></v-text-field>
        <v-btn v-show="comment" class="mx2" @click="setComment(index)"
          >Comment</v-btn
        >
      </v-card-actions>
    </div>
    <v-divider inset></v-divider>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        v-show="currentRequest.clientName === $store.getters.getHandleName"
        elevation="6"
        @click="deleteJob()"
        >Job Cancel</v-btn
      >
      <v-btn
        v-show="!currentRequest.adventurer"
        class="primary"
        elevation="6"
        @click="setAdventurer()"
        >Get to work</v-btn
      >
      <v-btn
        v-show="currentRequest.adventurer === $store.getters.getHandleName"
        class="primary"
        elevation="6"
        @click="jobFinished()"
        >Finished</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import getMasterRunInstance from '@/src/middle/getMasterRunInstance'
import getNextOwner from '@/src/handCash/getNextOwner'
import displayRate from '@/src/displayRate'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    currentRequest: null,
  },
  data() {
    return {
      satoshisLocalScale: this.currentRequest.satoshis,
      comment: '',
      rate: '',
    }
  },
  async mounted() {
    // BSVの現在価格を取得
    await displayRate().then((res) => (this.rate = res.data.rate))
  },
  methods: {
    async setComment(index) {
      this.$nuxt.$loading.start()
      this.dialog = false

      // Runインスタンスを起動
      const masterRun = await getMasterRunInstance()
      const selectedRequest = await masterRun.load(this.currentRequest.location)
      await selectedRequest.sync()

      // comment投稿時の時間を取得
      const time = Date.now().toString()

      // commentをJigに書き込む処理
      selectedRequest.setDiscussions(
        this.$store.getters.getHandleName,
        this.comment,
        time
      )
      await selectedRequest.sync()

      // comment欄の初期化
      this.comment = ''

      // dialogをリフレッシュする処理
      location.reload()

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

          // QuestBoardのrequestsを再読み込みして更新
          await masterRun.sync()
          await masterRun.inventory.sync()

          location.reload()
        } catch (e) {
          window.alert('An error occured')
          // eslint-disable-next-line no-console
          console.error(e)
        }
      } else {
        window.alert('You are not client.')
      }

      this.$nuxt.$loading.finish()
    },
    async setAdventurer() {
      this.$nuxt.$loading.start()
      this.dialog = false

      // masterRunインスタンスを起動し、削除するrequestを読み込む
      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      // 削除する人が依頼人か否かを確認する
      const adventurerHandle = this.$store.getters.getHandleName

      if (request.clientName !== adventurerHandle) {
        try {
          // NFTをクライアントのウォレットに送信する
          request.setAdventurer(adventurerHandle)
          await request.sync()

          window.alert(
            'Congratulations!\r\nYour work order has been accepted!\r\nFrom now on, please communicate with the client via the request form in "MyProfile".'
          )

          this.$router.push('/myProfile')
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error occured: ', e)
        }
      } else {
        window.alert('You are client.')
      }

      this.$nuxt.$loading.finish()
    },
  },
}
</script>

<style></style>
