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
              min="2"
              label="sats"
              thumb-color="red"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-text-field
              v-model="reward"
              class="mt-n8"
              :rules="rewardRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          class="mb-5"
          :disabled="!isValid || loading"
          @click="requestJob()"
          >Request a Job</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
import getMasterRunInstance from '@/src/middle/getMasterRunInstance'
export default {
  data() {
    return {
      // クライアントネームはHandCashから取得予定
      isValid: false, // Formのバリデーションによるボタンのdisabledに利用

      // Requestの内容（以降）
      clientName: 'TEST君',
      deadline: '',
      reward: '',
      fee: '',
      rewardRules: [
        (v) =>
          (v > 1 && v <= 99999999) ||
          'Reward ranges from 100,000 sats to 99 million sats(Almost 1 BSV)',
      ],
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 150 || 'Title must be less than 150 characters',
      ],
      description: '',
      descRules: [(v) => !!v || 'Description is required'],
    }
  },
  methods: {
    async requestJob() {
      // 手数料の計算
      this.fee = Number(this.reward) / 10
      // 確認メッセージの表示
      const result = window.confirm(
        `May I make a request?\r\nIf you click OK, You will send the following amount.\r\n
        ${this.reward.toLocaleString()}sats for the commission\r\n
        ${this.fee.toLocaleString()}sats for the guild fee\r\n
        ${(this.reward + this.fee).toLocaleString()}sats total`
      )

      if (result) {
        const masterRun = await getMasterRunInstance()
        const contract = await masterRun.load(
          '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1'
        )

        // 投稿時刻の登録
        const time = new Date().toString()

        // 依頼の掲示
        // eslint-disable-next-line new-cap
        const request = new contract(
          this.title,
          this.clientName,
          this.description,
          this.reward,
          this.deadline,
          time
        )
        await request.sync()
        this.$router.push('/questBoard')
      }
    },
  },
}
</script>

<style></style>
