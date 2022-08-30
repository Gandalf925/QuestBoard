import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import getUserProfile from '@/src/handCash/getUserProfile'

export const state = () => ({
  isLoggedIn: false,
  handle: '',
  paymail: '',
  avatarUrl: '',
  userAuthToken: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setHandleName(state, handle) {
    state.handle = handle
  },
  setPayMail(state, paymail) {
    state.paymail = paymail
  },
  setAvatarUrl(state, avatarUrl) {
    state.avatarUrl = avatarUrl
  },
  setUserAuthToken(state, userAuthToken) {
    state.userAuthToken = userAuthToken
  },
}

export const actions = {
  async login({ commit }, authToken) {
    // HandCashからユーザーデータを取得
    const userProfile = await getUserProfile(authToken)

    // firestoreから同名のユーザー情報を探し、無ければ新規に登録する
    const db = getFirestore(this.$firebase)
    const userData = doc(db, 'users', userProfile.data.publicProfile.handle)
    const docSnap = await getDoc(userData)

    if (docSnap.exists()) {
      try {
        // stateへログイン情報を保存
        commit('setLoginState', true)
        commit('setHandleName', userProfile.data.publicProfile.handle)
        commit('setPayMail', userProfile.data.publicProfile.paymail)
        commit('setAvatarUrl', userProfile.data.publicProfile.avatarUrl)
        commit('setUserAuthToken', authToken)
        sessionStorage.setItem('isLoggedIn', true)
        sessionStorage.setItem('handle', userProfile.data.publicProfile.handle)
        sessionStorage.setItem(
          'paymail',
          userProfile.data.publicProfile.paymail
        )
        sessionStorage.setItem(
          'avatarUrl',
          userProfile.data.publicProfile.avatarUrl
        )
        sessionStorage.setItem('userAuthToken', authToken)
        this.$router.push('/questBoard')
      } catch (e) {
        alert('エラーが発生しました', e.message)
      }
    } else {
      // 初回ログインのため、ユーザーデータをFirestoreへ保存
      try {
        await setDoc(
          doc(db, 'users', userProfile.data.publicProfile.handle),
          userProfile.data
        )
        // stateへログイン情報を保存
        commit('setloginState', true)
        commit('setHandleName', userProfile.data.publicProfile.handle)
        commit('setPayMail', userProfile.data.publicProfile.paymail)
        commit('setAvatarUrl', userProfile.data.publicProfile.avatarUrl)
        commit('setUserAuthToken', authToken)
        sessionStorage.setItem('isLoggedIn', true)
        sessionStorage.setItem('handle', userProfile.data.publicProfile.handle)
        sessionStorage.setItem(
          'paymail',
          userProfile.data.publicProfile.paymail
        )
        sessionStorage.setItem(
          'avatarUrl',
          userProfile.data.publicProfile.avatarUrl
        )
        sessionStorage.setItem('userAuthToken', authToken)
        this.$router.push('/questBoard')
      } catch (e) {
        alert('エラーが発生しました', e.message)
      }
    }
  },
  logOut({ commit }) {
    try {
      // stateへログイン情報を保存
      commit('setLoginState', false)
      commit('setHandleName', '')
      commit('setPayMail', '')
      commit('setAvatarUrl', '')
      commit('setUserAuthToken', '')
      sessionStorage.removeItem('isLoggedIn')
      sessionStorage.removeItem('handle')
      sessionStorage.removeItem('paymail')
      sessionStorage.removeItem('avatarUrl')
      sessionStorage.removeItem('userAuthToken')
      this.$router.push('/auth/landing')
    } catch (e) {
      alert('エラーが発生しました', e.message)
    }
  },
}

export const getters = {
  getLoggedIn: (state) => !!state.isLoggedIn,
  getHandleName: (state) => state.handle,
  getPayMail: (state) => state.paymail,
  getAvatarUrl: (state) => state.avatarUrl,
  getUserAuthToken: (state) => state.userAuthToken,
}
