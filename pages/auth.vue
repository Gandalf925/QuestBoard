<template>
  <div></div>
</template>

<script>
import getUserProfile from '@/src/handCash/getUserProfile'
export default {
  data() {
    return {
      // HandCashから取得予定
      handle: '',
      displayName: '',
      email: '',
      paymail: '',
      avatarUrl: '',
      selfDescription: '',
      authToken: '',
    }
  },
  async mounted() {
    const userProfile = await getUserProfile(
      'c19367575053954f6940a2a45d12b1e6a93a3750680b86213e6526d66628044f'
    )
    console.log(userProfile)
  },
}
</script>

<style></style>
