<template>
  <div>
    <v-btn @click="addData()">add</v-btn>
  </div>
</template>

<script>
import { getFirestore, doc, setDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      displayName: 'abb',
      email: '',
      paymail: '',
      avatarUrl: '',
      selfDescription: 'test',
    }
  },
  methods: {
    async addData() {
      try {
        const db = getFirestore(this.$firebase)
        await setDoc(doc(db, 'users', 'handle'), {
          displayName: this.displayName,
          selfDescription: this.selfDescription,
        })
      } catch (e) {
        console.error('Error: ', e)
      }
    },
  },
}
</script>

<style></style>
