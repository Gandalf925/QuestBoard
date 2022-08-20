<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div>
    <Header />
    <div>
      <v-btn elevation="6" class="my-2" @click="displayRequests()"
        >Reflesh</v-btn
      >
      <v-row>
        <v-col
          v-for="(request, index) in requests"
          :key="index"
          cols="6"
          md="4"
        >
          <v-card hover @click="openDialog(index)">
            <v-card-title>{{ request.title }}</v-card-title>
            <v-card-subtitle>{{ request.clientName }}</v-card-subtitle>
            <v-card-text class="d-flex align-end"
              >{{ request.satoshis }}sats</v-card-text
            >
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
              <v-card-text width="80%" class="font-weight-medium">{{
                currentRequest.description
              }}</v-card-text>
              <v-card-text
                >Reward: {{ currentRequest.satoshis }} sats</v-card-text
              >
              <v-card-text>Deadline: {{ currentRequest.limit }}</v-card-text>
              <v-card-text>location: {{ currentRequest.location }}</v-card-text>

              <v-divider inset></v-divider>
              <div id="discussions">
                <h3 class="mx-3">Comments</h3>

                <div
                  v-for="(comment, index) in currentRequest.discussions"
                  :key="index"
                  scrollable
                >
                  <v-card-text>{{ comment.name }}</v-card-text>
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
              <v-card-actions>
                <v-btn elevation="6">Get to work</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import getMasterKeys from '@/src/firebase/getMasterKeys'
import getRunInstance from '@/src/run/getRunInstance'
export default {
  data() {
    return {
      requests: [],
      dialog: false,
      selectedIndex: null,
      currentRequest: null,
      comment: '',
    }
  },
  methods: {
    async displayRequests() {
      const keys = await getMasterKeys()

      // eslint-disable-next-line no-undef
      const run = await getRunInstance(
        keys.masterPursePrivKey,
        keys.masterOwnerPrivKey
      )

      // eslint-disable-next-line no-undef
      const contract = await run.load(
        '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1'
      )
      await run.inventory.sync()
      const inventory = run.inventory.jigs.filter(
        (jig) => jig instanceof contract
      )

      this.requests = JSON.parse(JSON.stringify(inventory))
      this.currentRequest = this.requests[0]
    },
    openDialog(index) {
      this.currentRequest = this.requests[index]
      this.dialog = true
    },
    closeDialog() {
      this.comment = ''
    },
    async setComment(index) {
      const keys = await getMasterKeys()

      // eslint-disable-next-line no-undef, no-unused-vars
      const run = await getRunInstance(
        keys.masterPursePrivKey,
        keys.masterOwnerPrivKey
      )
      const contract = await run.load(this.currentRequest.location)
      const time = Date.now().toString()
      contract.setDiscussions('Gandalf', this.comment, time)
      await contract.sync()
      // eslint-disable-next-line no-console
      console.log(contract.discussions)
      // eslint-disable-next-line no-console
      console.log(contract)
      this.comment = ''

      // dialogをリフレッシュする処理
      this.dialog = false
      const contractClass = await run.load(
        '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1'
      )
      await run.inventory.sync()
      const inventory = run.inventory.jigs.filter(
        (jig) => jig instanceof contractClass
      )

      this.requests = JSON.parse(JSON.stringify(inventory))
      this.currentRequest = this.requests[0]
      this.dialog = true
    },
  },
}
</script>

<style></style>
