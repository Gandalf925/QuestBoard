/* 完了したリクエストJigから、satoshisを出金する
//
// 戻り値 result(実行結果)
// 副作用 なし
*/

import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const payUserProfit = async (data) => {
  const functions = getFunctions(firebaseApp)
  const payUserProfit = httpsCallable(functions, 'payUserProfit')
  const result = await payUserProfit(data)

  return result
}

export default payUserProfit
