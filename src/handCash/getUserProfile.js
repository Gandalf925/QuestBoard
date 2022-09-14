/* HandCashConnectを用いて、ユーザーの個人情報（publicProfile, privateProfile）を取得する
//
// 戻り値 userProfile{publicProfile, privateProfile}
// 副作用 なし
*/

import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const getUserProfile = async (authToken) => {
  // firebase Functionsを起動
  const functions = getFunctions(firebaseApp)
  const getUserProfile = httpsCallable(functions, 'getUserProfile')
  const userProfile = await getUserProfile(authToken)

  return userProfile
}

export default getUserProfile
