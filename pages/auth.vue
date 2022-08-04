<template>
  <div></div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      // HandCashから取得
      handle: '',
      displayName: '',
      email: '',
      paymail: '',
      avatarUrl: '',
      selfDescription: '',
    }
  },
  created: {},
  methods: {
    // HandCashでログインした後、ここでProfileを抽出してからQuestBoardへリダイレクトするように作る

    async addData() {
      try {
        const db = getFirestore(this.$firebase)
        const docRef = await addDoc(collection(db, 'users'), {
          // title: this.title, 後で直す
          // name: this.name,
        })
        console.log('追加したデータ:', docRef.data())
      } catch (e) {
        alert('Error: ', e)
      }
    },
  },
}
</script>

<style></style>
