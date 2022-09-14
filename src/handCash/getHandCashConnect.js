/* Firestoreから取得したKeyを用いて、HandCashConnectを取得する
// 顧客のHandCashからpublicProfile,privateProfileを取得することや
// 顧客のHandCashからの支払いを受け付けること、またJigを送信することを目的とする
//
// 戻り値 HandCashConnect
// 副作用 なし
*/

import getHandCashKeys from '@/src/firebase/getHandCashKeys'
const { HandCashConnect } = require('@handcash/handcash-connect')

const getHandCashConnect = async () => {
  const keys = await getHandCashKeys()

  const handCashConnect = new HandCashConnect({
    appId: keys.appId,
    appSecret: keys.appSecret,
  })

  return handCashConnect
}

export default getHandCashConnect
