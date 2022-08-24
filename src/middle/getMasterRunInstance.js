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
