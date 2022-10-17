<template>
  <v-container>
    <v-sheet elevation="8">
      <h2 class="mt-2 ml-2">Requests pending confirmation</h2>
      <v-slide-group v-model="model" center-active show-arrows>
        <v-slide-item v-for="(request, index) in requestsFinished" :key="index">
          <div
            :class="{
              stateFinished: request.isFinished && request.satoshis !== 0,
            }"
          >
            <v-card
              class="ma-2"
              elevetion="3"
              width="200"
              style="border: 5px solid #6d4c37"
              :img="require('@/assets/img/cardBackgroundImage.png')"
              @click="openDialog(index)"
            >
              <v-card-title class="font-weight-bold">
                {{ request.metadata.name }}
              </v-card-title>
              <v-card-subtitle class="font-weight-bold">{{
                request.clientName
              }}</v-card-subtitle>
            </v-card>
          </div>
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

export default {
  data: () => ({
    model: null,
    requestsFinished: [],
    dialog: false,
    currentRequest: null,
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
        jig.isFinished === true &&
        !jig.isFailure &&
        !jig.isSucceed
    )

    this.requestsFinished = JSON.parse(JSON.stringify(inventory))
    this.requestsFinished
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .reverse()
  },
  methods: {
    openDialog(index) {
      // 選択したrequestをdialogへ表示
      this.currentRequest = this.requestsFinished[index]
      this.dialog = true
    },
  },
}
</script>

<style>
.stateFinished {
  background-color: rgb(255, 230, 0);
}
</style>
