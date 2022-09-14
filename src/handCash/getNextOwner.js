/* HandCashConnectを用いて、ユーザーのアドレスを取得する
// 引数のauthTokenは、ログイン時に取得しているSessionStorageから取得する
//
// 戻り値 nextOwner(address)
// 副作用 なし
*/

import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const getNextOwner = async (authToken) => {
  // firebase Functionsを起動
  const functions = getFunctions(firebaseApp)
  const getNextOwner = httpsCallable(functions, 'getNextOwner')

  // ユーザのアドレスを取得する
  const nextOwner = await getNextOwner(authToken)

  return nextOwner
}

export default getNextOwner
