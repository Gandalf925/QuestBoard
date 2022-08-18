<template>
  <div>
    <v-text-field>input the text</v-text-field>
    <v-btn @click="mint()">mint</v-btn>
    <p>{{ location }}</p>
  </div>
</template>

<script>
import getRunInstance from '@/src/run/getRunInstance'
import getMasterKeys from '@/src/firebase/getMasterKeys'
import deploy from '@/src/run/deployClass'
import Contract from '@/src/run/contractClass'
import mint from '@/src/run/mintContract'

export default {
  data() {
    return {
      location: '',
    }
  },
  methods: {
    async deploy() {
      const keys = await getMasterKeys()

      // eslint-disable-next-line no-undef
      const run = await getRunInstance(
        keys.masterPursePrivKey,
        keys.masterOwnerPrivKey
      )

      // eslint-disable-next-line no-undef

      const contractInfo = await deploy(run, Contract)
      this.location = contractInfo.location
    },

    async mint() {
      const keys = await getMasterKeys()

      // eslint-disable-next-line no-undef
      const run = await getRunInstance(
        keys.masterPursePrivKey,
        keys.masterOwnerPrivKey
      )

      // eslint-disable-next-line no-undef

      const contractInfo = await mint(
        run,
        'd7ddfc5dd1a4c538e04ae2a86e79cdd00d31ae4a84a1a708811b1f7351b2aab1_o1'
      )
      this.location = contractInfo.location
    },
  },
}
</script>

<style></style>
