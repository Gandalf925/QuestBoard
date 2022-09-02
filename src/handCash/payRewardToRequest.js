import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from '@/plugins/firebase'

const peyRewardToRiquest = async (data) => {
  const functions = getFunctions(firebaseApp)
  const payRewardToRequest = httpsCallable(functions, 'payRewardToRequest')
  const result = await payRewardToRequest(data)

  return result
}

export default peyRewardToRiquest
