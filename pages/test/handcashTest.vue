<template>
  <div>
    <v-btn @click="getUserProfile">Push</v-btn>
  </div>
</template>

<script>
// import functions from 'firebase-functions'
// import 'firebase/functions'
// import getUserProfile from '@/src/handCash/getUserProfile'
import { getFunctions, httpsCallable } from 'firebase/functions'
export default {
  data() {
    return {
      authToken:
        'c19367575053954f6940a2a45d12b1e6a93a3750680b86213e6526d66628044f',
    }
  },
  methods: {
    getUserProfile() {
      const functions = getFunctions(this.$firebase)
      const getUserProfile = httpsCallable(functions, 'getUserProfile')
      getUserProfile(this.authToken).then((result) => {
        const userProfile = result.data
        console.log(userProfile)
      })
    },
  },
}
</script>

<style></style>
