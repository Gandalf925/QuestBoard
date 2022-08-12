<template>
  <div>
    <v-text-field>input the text</v-text-field>
    <v-btn @click="deploy()">push</v-btn>
    <p>{{ location }}</p>
  </div>
</template>

<script>
import getRunInstance from '@/src/run/getRunInstance'
import getMasterKeys from '@/src/firebase/getMasterKeys'
import deploy from '@/src/run/deployClass'

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
      class TestJig extends Jig {
        init(HP, owner = '1DBTNTBrH9kmjd8pwPYQgcTKk95Rw9LmTt') {
          this.HP = HP
          this.owner = owner
        }

        send(to) {
          this.owner = to
        }
      }

      const contractInfo = await deploy(run, TestJig)
      this.location = contractInfo.location
    },
  },
}
</script>

<style></style>
