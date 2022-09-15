<!-- eslint-disable no-console -->
<template>
  <div>
    <v-row>
      <v-col v-for="(request, index) in requests" :key="index" cols="4">
        <v-card
          class="d-flex align-center"
          color="brown darken-1"
          hover
          height="110%"
          @click="openDialog(index)"
        >
          <v-card
            class="mx-auto"
            color="white"
            width="97%"
            :img="require('@/assets/img/cardBackgroundImage.png')"
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
              <v-card-text
                style="white-space: pre-wrap; word-wrap: break-word"
                width="80%"
                >{{ currentRequest.description }}</v-card-text
              >
            </p>
            <v-divider></v-divider>
            <v-card-text
              >Reward: {{ currentRequest.satoshis.toLocaleString() }} sats
              <p class="mx-3">
                (100,000,000sats(1BSV) = {{ rate }}USD)
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
              <v-btn
                v-show="
                  currentRequest.clientName === $store.getters.getHandleName
                "
                elevation="6"
                @click="deleteJob()"
                >Job Cancel</v-btn
              >
              <v-btn class="primary" elevation="6" @click="setAdventurer()"
                >Get to work</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import loadRequestJigs from '@/src/middle/loadRequestJigs'
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
    const inventory = await loadRequestJigs()

    // NuxtにRequestsをコピー
    this.requests = JSON.parse(JSON.stringify(inventory))

    // 日付で降順に並べ替え
    this.requests
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .reverse()

    // エラー防止のため、currentRequestに仮のrequestを代入
    this.currentRequest = this.requests[0]
  },
  async mounted() {
    // BSVの現在価格を取得
    await displayRate().then((res) => (this.rate = res.data.rate))
  },
  methods: {
    openDialog(index) {
      // 選択したrequestをdialogへ表示
      this.currentRequest = this.requests[index]
      this.dialog = true
    },
    async setComment(index) {
      this.$nuxt.$loading.start()
      this.dialog = false

      // Runインスタンスを起動
      const masterRun = await getMasterRunInstance()
      const contract = await masterRun.load(this.currentRequest.location)
      await contract.sync()

      // comment投稿時の時間を取得
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
      const inventory = await loadRequestJigs()
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
