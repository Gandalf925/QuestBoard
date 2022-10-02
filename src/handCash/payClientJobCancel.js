/* キャンセルしたリクエストJigから、satoshisを出金する
//
// 戻り値 result(実行結果)
// 副作用 なし
*/

import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const payClientJobCancel = async (data) => {
  const functions = getFunctions(firebaseApp)
  const payClientJobCancel = httpsCallable(functions, 'payClientJobCancel')
  const result = await payClientJobCancel(data)

  return result
}

export default payClientJobCancel
