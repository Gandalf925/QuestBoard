/* Firebase Functionsから、ユーザーが作成したリクエストJigに対して設定したsatoshisを送金する
// この送金額には、手数料である10%も含むものとする
//
// 戻り値 result(実行結果)
// 副作用 なし
*/

import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const peyRewardToRiquest = async (data) => {
  const functions = getFunctions(firebaseApp)
  const payRewardToRequest = httpsCallable(functions, 'payRewardToRequest')
  const result = await payRewardToRequest(data)

  return result
}

export default peyRewardToRiquest
