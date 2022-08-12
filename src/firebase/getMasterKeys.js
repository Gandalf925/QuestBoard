import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

const getMasterKeys = async () => {
  const querySnapShot = await getDoc(doc(db, 'guildMaster', 'keys'))
  const data = querySnapShot.data()

  return data
}

export default getMasterKeys
