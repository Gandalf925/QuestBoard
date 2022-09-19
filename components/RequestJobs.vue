<template>
  <div>
    <v-card>
      <h1 class="mx-5">Request a Job</h1>
      <v-form v-model="isValid" class="mx-3 my-7">
        <v-row>
          <v-col cols="10">
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
              landscape
            ></v-date-picker>

            <h3 class="mt-5">Reward</h3>
            <v-slider
              v-model.number="reward"
              class="mb-n8"
              hint="100,000sats~99,999,999sats(near 1BSV)"
              max="99999999"
              min="10"
              label="sats"
              thumb-color="red"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="2">
            <v-text-field
              v-model="reward"
              class="mt-n8"
              :rules="rewardRules"
            ></v-text-field>
          </v-col>
          <p>(100,000,000sats(1BSV) = {{ rate }}USD)</p>
        </v-row>

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
      reward: '',
      fee: '',
      deadline: '',
      rate: '',
      benefit: 10, // 依頼時の利益
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
      this.fee = Number(this.reward) / this.benefit

      // 確認メッセージの表示
      const result = window.confirm(
        `May I make a request?\r\nIf you click OK, You will send the following amount.\r\n
        ${this.reward.toLocaleString()}sats for the commission\r\n
        ${this.fee.toLocaleString()}sats for the guild fee\r\n
        ${(this.reward + this.fee).toLocaleString()}sats total`
      )

      this.$nuxt.$loading.start()

      if (result) {
        // Firebase Functionsへ送る送金額とauthTokenをオブジェクト化
        const data = {
          rewardAndFee: (this.reward + this.fee) / 100000000,
          authToken: this.$store.getters.getUserAuthToken,
        }

        try {
          payRewardToRequest(data)
        } catch (e) {
          window.alert('An error occured')
          // eslint-disable-next-line no-console
          console.error(e)
          return
        }

        try {
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
  },
}
</script>

<style></style>
