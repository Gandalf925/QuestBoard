<template>
  <div>
    <v-btn @click="addData()">add</v-btn>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import getUserProfile from '@/src/handCash/getUserProfile'
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
      // HandCashからユーザーデータを取得
      const userProfile = await getUserProfile(
        'c19367575053954f6940a2a45d12b1e6a93a3750680b86213e6526d66628044f'
      )

      console.log(userProfile.data)

      // firestoreから同名のユーザー情報を探し、無ければ新規に登録する
      const db = getFirestore(this.$firebase)
      const userData = doc(db, 'users', userProfile.data.publicProfile.handle)
      const docSnap = await getDoc(userData)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        // Vuexにデータを登録する処理を書く
      } else {
        await setDoc(
          doc(db, 'users', userProfile.data.publicProfile.handle),
          userProfile.data
        )
        console.log('DB set success!!')
      }

      // try {

      //   await setDoc(doc(db, 'users', userProfile.publicProfile.handle), {
      //     displayName: this.displayName,
      //     selfDescription: this.selfDescription,
      //   })
      // } catch (e) {
      //   console.error('Error: ', e)
      // }
    },
  },
}
</script>

<style></style>
