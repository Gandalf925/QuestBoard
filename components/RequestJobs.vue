<template>
  <div>
    <v-card>
      <h1 class="mx-5">Request a Job</h1>
      <v-form v-model="isValid" class="mx-3 my-7">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="title"
              :rules="titleRules"
              label="title"
            ></v-text-field>

            <v-textarea
              v-model.trim="description"
              :rules="descRules"
              label="description"
            ></v-textarea>
            <h3 class="mt-5">Deadline:</h3>
            <v-date-picker
              v-model="deadline"
              class="mx-auto"
              width="60%"
            ></v-date-picker>

            <h3 class="mt-5">Reward</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="4">
            <div class="mt-n8 text-h4" :rules="rewardRules">
              {{ reward.toLocaleString() }}sats
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="addHundredThousand()"> 100,000 </v-btn>
            <v-btn @click="addMillion()"> 1,000,000 </v-btn>
            <v-btn @click="addTenMillion()"> 10,000,000 </v-btn>
            <v-btn @click="resetReward()"> RESET</v-btn>
          </v-col>
        </v-row>
        <p>(100,000,000sats(1BSV) = {{ rate }}USD)</p>

        <v-btn
          color="primary"
          class="mb-5"
          :disabled="!isValid"
          @click="requestJob()"
          >Request a Job</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
import requestJobs from '@/src/middle/requestJobs'
import payRewardToRequest from '@/src/handCash/payRewardToRequest'
import displayRate from '@/src/others/displayRate'
export default {
  data() {
    return {
      // Formボタンのdisabledに利用
      isValid: false,

      // Requestの内容
      title: '',
      clientName: this.$store.getters.getHandleName,
      description: '',
      reward: 0,
      deadline: '',
      rate: '',
      guildBenefit: 10, // 依頼時の利益
      rewardRules: [
        (v) =>
          (v > 1 && v <= 99999999) ||
          'Reward ranges from 100,000 sats to 99 million sats(Almost 1 BSV)',
      ],
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 150 || 'Title must be less than 150 characters',
      ],
      descRules: [(v) => !!v || 'Description is required'],
    }
  },
  async mounted() {
    // BSVの現在価格を取得
    await displayRate().then((res) => (this.rate = res.data.rate))
  },
  methods: {
    async requestJob() {
      // 手数料の計算
      const fee = this.reward / this.guildBenefit

      const rewardAndFee = Math.floor(this.reward + fee)

      // 確認メッセージの表示
      const result = window.confirm(
        `May I make a request?\r\nIf you click OK, You will send the following amount.\r\n
        ${Math.round(this.reward).toLocaleString()}sats for the commission\r\n
        ${Math.round(fee).toLocaleString()}sats for the guild fee\r\n
        ${Math.round(rewardAndFee).toLocaleString()}sats total`
      )

      if (result) {
        this.$nuxt.$loading.start()
        // Firebase Functionsへ送る送金額とauthTokenをオブジェクト化
        const data = {
          rewardAndFee: Number(rewardAndFee) / 100000000,
          fee: Number(fee) / 100000000,
          authToken: this.$store.getters.getUserAuthToken,
        }

        try {
          payRewardToRequest(data)
        } catch (e) {
          window.alert('An error occured')
          // eslint-disable-next-line no-console
          console.error(e)
          throw e
        }

        try {
          console.log(this.reward)
          await requestJobs(
            this.title,
            this.clientName,
            this.description,
            this.reward,
            this.deadline
          )
          this.$nuxt.$loading.finish()
          this.$router.push('/questBoard')
        } catch (e) {
          window.alert('An error occured')
          // eslint-disable-next-line no-console
          console.error(e)
          this.$router.push('/questBoard')
        }
      }
    },
    addHundredThousand() {
      this.reward = Number(this.reward) + 100000
    },
    addMillion() {
      this.reward = Number(this.reward) + 1000000
    },
    addTenMillion() {
      this.reward = Number(this.reward) + 10000000
    },
    resetReward() {
      this.reward = 0
    },
  },
}
</script>

<style></style>
