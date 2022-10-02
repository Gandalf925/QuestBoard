/* 失敗したリクエストJigから、satoshisを出金する
//
// 戻り値 result(実行結果)
// 副作用 なし
*/

import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const payClientJobFailed = async (data) => {
  const functions = getFunctions(firebaseApp)
  const payClientJobFailed = httpsCallable(functions, 'payClientJobFailed')
  const result = await payClientJobFailed(data)

  return result
}

export default payClientJobFailed
