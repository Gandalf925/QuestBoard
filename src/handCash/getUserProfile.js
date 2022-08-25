import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const getUserProfile = async (authToken) => {
  // firebase Functionsを起動
  const functions = getFunctions(firebaseApp)
  const getUserProfile = httpsCallable(functions, 'getUserProfile')
  const userProfile = await getUserProfile(authToken)

  return userProfile
  // console.log({ userProfile })
}

export default getUserProfile
