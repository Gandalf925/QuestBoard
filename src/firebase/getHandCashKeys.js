import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

const getHandCashKeys= async () => {
  const querySnapShot = await getDoc(doc(db, 'handCash', 'data'))
  const keys = querySnapShot.data()

  return keys
}

export default getHandCashKeys
