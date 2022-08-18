<template>
  <div>
    <Header />
    <v-btn @click="displayRequests()">Push</v-btn>
    <v-row>
      <v-col v-for="(request, index) in requests" :key="index" cols="6">
        <v-card>
          <v-card-title>{{ request.title }}</v-card-title>
          <v-space></v-space>
          <v-card-subtitle>{{ request.location }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </div>
</template>

<script>
import getMasterKeys from '@/src/firebase/getMasterKeys'
import getRunInstance from '@/src/run/getRunInstance'
export default {
  data() {
    return {
      requests: null,
    }
  },
  methods: {
    // ここに、秘密鍵に入ったインスタンスを表示するためのコードを記述する。

    async displayRequests() {
      const keys = await getMasterKeys()

      // eslint-disable-next-line no-undef
      const run = await getRunInstance(
        keys.masterPursePrivKey,
        keys.masterOwnerPrivKey
      )

      // eslint-disable-next-line no-undef
      const contract = await run.load(
        'c9b10dddb0d21c4509af815610b0ac8baf3c672318a41cea41429274f5bc040e_o1'
      )
      await run.inventory.sync()
      const inventory = run.inventory.jigs.filter(
        (jig) => jig instanceof contract
      )

      this.requests = JSON.parse(JSON.stringify(inventory))
    },
  },
}
</script>

<style></style>
