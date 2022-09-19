<template>
  <v-container>
    <v-sheet class="mx-auto" elevation="8" max-width="100%">
      <h2 class="mt-2 ml-2">Requests on order</h2>
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
        <v-slide-item v-for="(request, index) in requestsOnOrder" :key="index">
          <v-row>
            <v-col cols="4">
              <v-card
                class="ma-4"
                elevetion="6"
                style="border: 5px solid #6d4c37"
                :img="require('@/assets/img/cardBackgroundImage.png')"
                @click="openDialog(index)"
              >
                <v-card-title class="font-weight-bold">
                  {{ request.title }}
                </v-card-title>
                <v-card-subtitle class="font-weight-bold">{{
                  request.clientName
                }}</v-card-subtitle>
                <v-card-text class="d-flex align-end font-weight-black"
                  >{{ request.satoshis.toLocaleString() }}sats</v-card-text
                >
              </v-card>
            </v-col>
          </v-row>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-dialog v-model="dialog">
      <dialog-card :current-request="currentRequest"></dialog-card>
    </v-dialog>
  </v-container>
</template>

<script>
import getMasterRunInstance from '../src/middle/getMasterRunInstance'
import loadContractClass from '../src/run/loadContractClass'
import displayRate from '@/src/others/displayRate'

export default {
  data: () => ({
    model: null,
    requestsOnOrder: [],
    dialog: false,
    currentRequest: null,
    comment: '',
    rate: '',
  }),
  async beforeCreate() {
    // Runインスタンスの起動
    const run = await getMasterRunInstance()
    const contract = await loadContractClass(run)

    await run.inventory.sync()

    // 顧客が受注しているrequestのみを抽出
    // (ここは後ほどユーザーのHandCash内にあるRequestsの表示に切り替え)
    const inventory = run.inventory.jigs.filter(
      (jig) =>
        jig instanceof contract &&
        jig.adventurer === this.$store.getters.getHandleName &&
        jig.isFinished === true
    )

    this.requestsOnOrder = JSON.parse(JSON.stringify(inventory))
  },
  async mounted() {
    // BSVの現在価格を取得
    await displayRate().then((res) => (this.rate = res.data.rate))
  },
  methods: {
    openDialog(index) {
      // 選択したrequestをdialogへ表示
      this.currentRequest = this.requestsOnOrder[index]
      this.dialog = true
    },
    async mounted() {
      // BSVの現在価格を取得
      await displayRate().then((res) => (this.rate = res.data.rate))
    },
  },
}
</script>

<style></style>
