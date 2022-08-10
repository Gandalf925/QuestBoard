<template>
  <div>
    <div v-for="(user, index) in users" :key="index">
      name: {{ user.name }} / title: {{ user.title }}
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      users: [],
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDoc(doc(db, 'guildMaster', 'keys'))
      const master = querySnapshot.data()
      console.log(master.masterOwnerPrivKey)
    } catch (e) {
      alert(e)
    }
  },
}
</script>

<style></style>
