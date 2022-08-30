import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const getNextOwner = async (authToken) => {
  // firebase Functionsを起動
  const functions = getFunctions(firebaseApp)
  const getNextOwner = httpsCallable(functions, 'getNextOwner')
  const nextOwner = await getNextOwner(authToken)

  return nextOwner
}

export default getNextOwner
