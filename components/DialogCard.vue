<template>
  <v-card style="border: 5px solid #6d4c37">
    <div
      v-if="
        currentRequest.isFinished === true &&
        currentRequest.clientName === $store.getters.getHandleName &&
        !currentRequest.isSucceed &&
        !currentRequest.isFailure
      "
    >
      <v-card-text class="text-h5">
        {{ finishedMessageTop }}
      </v-card-text>
      <v-card-text class="text-h5">
        {{ finishedMessageBottom }}
      </v-card-text>
    </div>
    <div
      v-else-if="
        currentRequest.isSucceed === true &&
        currentRequest.adventurer === $store.getters.getHandleName &&
        currentRequest.satoshis
      "
    >
      <v-card-text class="text-h5">
        {{ finishedMessageForAdventurer }}
      </v-card-text>
    </div>
    <v-card-title>{{ currentRequest.metadata.name }}</v-card-title>
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
        v-show="
          currentRequest.clientName === $store.getters.getHandleName &&
          !currentRequest.adventurer
        "
        class="error"
        elevation="6"
        @click="deleteJob()"
        >Job Cancel</v-btn
      >
      <v-btn
        v-show="
          !currentRequest.adventurer &&
          currentRequest.clientName !== $store.getters.getHandleName
        "
        class="primary"
        elevation="6"
        @click="setAdventurer()"
        >Get to work</v-btn
      >
      <v-btn
        v-show="
          currentRequest.adventurer === $store.getters.getHandleName &&
          currentRequest.isFinished === false
        "
        class="primary"
        elevation="6"
        @click="jobFinished()"
        >Finished</v-btn
      >
      <v-btn
        v-show="
          currentRequest.clientName === $store.getters.getHandleName &&
          currentRequest.isFinished &&
          !currentRequest.isSucceed &&
          !currentRequest.isFailure
        "
        class="success"
        @click="setJobSuccess()"
        >OK</v-btn
      >
      <v-btn
        v-show="
          currentRequest.clientName === $store.getters.getHandleName &&
          currentRequest.isFinished &&
          !currentRequest.isSucceed &&
          !currentRequest.isFailure
        "
        class="warning"
        @click="setJobFailure()"
        >NG</v-btn
      >
      <v-btn
        v-show="
          currentRequest.adventurer === $store.getters.getHandleName &&
          currentRequest.isFinished &&
          currentRequest.isSucceed &&
          currentRequest.satoshis !== 0
        "
        class="success"
        @click="sendReward()"
        >GET REWARD
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-text class="text-h3">PLEASE WAIT...</v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import getMasterRunInstance from '@/src/middle/getMasterRunInstance'
import displayRate from '@/src/others/displayRate'
// import payClientJobFailed from '@/src/handCash/payClientJobFailed'
import payClientJobCancel from '@/src/handCash/payClientJobCancel'
import payUserProfit from '@/src/handCash/payUserProfit'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    currentRequest: null,
  },
  data() {
    return {
      satoshisLocalScale: this.currentRequest.reward,
      comment: '',
      rate: '',
      dialog: false,
      finishedMessageTop:
        'Confirmation of completion of this request has been applied for.',
      finishedMessageBottom:
        "Please contact the adventurer via 'Comments' to confirm completion of the work.",
      finishedMessageForAdventurer:
        'The request has been completed. Please get the reward',
    }
  },
  async mounted() {
    // BSVの現在価格を取得
    await displayRate().then((res) => (this.rate = res.data.rate))
  },
  methods: {
    async setComment() {
      this.$nuxt.$loading.start()
      this.dialog = true

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
      this.dialog = false
      location.reload()

      this.$nuxt.$loading.finish()
    },
    async deleteJob() {
      // 本当に消してよいか確認
      const isDelete = window.confirm(
        'Are you sure you want to delete this request?\r\nThe commission for the cancelled job will be returned to your HandCash, excluding the guild fee'
      )
      if (!isDelete) {
        return
      }
      this.$nuxt.$loading.start()
      this.dialog = true

      const data = {
        reward: Math.round(this.currentRequest.satoshis) / 100000000,
        authToken: this.$store.getters.getUserAuthToken,
      }

      // masterRunインスタンスを起動し、削除するrequestを読み込む
      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      try {
        // NFTをクライアントのウォレットに送信する
        await request.destroy()
        await payClientJobCancel(data)

        window.alert(
          'Your request has been canceled.\r\nYour request fee will be returned.'
        )

        location.reload()
      } catch (e) {
        window.alert('An error occured')
        // eslint-disable-next-line no-console
        console.error(e)
        this.dialog = false
      }

      this.$nuxt.$loading.finish()
    },
    async setAdventurer() {
      this.$nuxt.$loading.start()
      this.dialog = true

      // masterRunインスタンスを起動し、削除するrequestを読み込む
      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      try {
        // NFTをクライアントのウォレットに送信する
        request.setAdventurer(this.$store.getters.getHandleName)
        await request.sync()

        window.alert(
          'Congratulations!\r\nYour work order has been accepted!\r\nFrom now on, please communicate with the client via the request form in "MyProfile".'
        )

        this.$router.push('/myProfile')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error occured: ', e)
        this.dialog = false
      }

      this.$nuxt.$loading.finish()
    },
    async jobFinished() {
      const isFinished = window.confirm(
        'Do you inform the client of the completion of the request??'
      )
      if (isFinished) {
        this.$nuxt.$loading.start()
        this.dialog = true

        // Runインスタンスを起動
        const masterRun = await getMasterRunInstance()
        const selectedRequest = await masterRun.load(
          this.currentRequest.location
        )
        await selectedRequest.sync()

        // requestのisFinishedをtrueに変更
        selectedRequest.isFinish()
        await selectedRequest.sync()

        this.$nuxt.$loading.finish()
        location.reload()
      }
    },
    async setJobSuccess() {
      this.dialog = true
      this.$nuxt.$loading.start()

      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      // requestのisSucceedをtrueに変更
      request.isSuccess()
      await request.sync()
      this.$nuxt.$loading.finish()
      location.reload()
    },
    async setJobFailure() {
      this.dialog = true
      this.$nuxt.$loading.start()
      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      // requestのisFailureをtrueに変更
      request.isFail()
      await request.sync()
      this.$nuxt.$loading.finish()
      location.reload()
    },
    async sendReward() {
      this.dialog = true
      this.$nuxt.$loading.start()

      const data = {
        reward: Math.round(this.currentRequest.satoshis) / 100000000,
        authToken: this.$store.getters.getUserAuthToken,
      }

      // masterRunインスタンスを起動し、削除するrequestを読み込む
      this.dialog = false
      const masterRun = await getMasterRunInstance()
      const request = await masterRun.load(this.currentRequest.location)
      await request.sync()

      try {
        // NFTからsatoshisを抜き出し、クライアントのウォレットに送信する
        await request.withdraw()
        await payUserProfit(data)

        // QuestBoardのrequestsを再読み込みして更新
        await masterRun.sync()
        await masterRun.inventory.sync()

        location.reload()
      } catch (e) {
        window.alert('An error occured')
        // eslint-disable-next-line no-console
        console.error(e)
        this.dialog = false
      }

      this.$nuxt.$loading.finish()
    },
  },
}
</script>

<style></style>
