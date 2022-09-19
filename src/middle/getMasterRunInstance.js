/* MasterKeyを使用してRunインスタンスを起動する
// 主に、受注待ちの依頼をQuestBoardに表示したり
// ユーザープロフィール画面に受注済みの依頼を表示する際などに使用する
//
// 戻り値 run
// 副作用 なし
*/

import getMasterKeys from '@/src/firebase/getMasterKeys'
import getRunInstance from '@/src/run/getRunInstance'

const getMasterRunInstance = async () => {
  const keys = await getMasterKeys()

  // eslint-disable-next-line no-undef
  const run = await getRunInstance(
    keys.masterPursePrivKey,
    keys.masterOwnerPrivKey
  )

  return run
}

export default getMasterRunInstance
