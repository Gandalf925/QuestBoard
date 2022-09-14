/* Firebase Functionsから、Firestoreに保存しているMasterKeyを取得する
//
// 戻り値 data{masterOwnerPrivKey, masterPursePrivKey}
// 副作用 なし
*/

import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

const getMasterKeys = async () => {
  const querySnapShot = await getDoc(doc(db, 'guildMaster', 'keys'))
  const data = querySnapShot.data()

  return data
}

export default getMasterKeys
