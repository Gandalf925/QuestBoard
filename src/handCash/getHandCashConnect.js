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
