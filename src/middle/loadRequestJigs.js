/* MasterKeyに保管されているRequestsの中から、受注前の物を表示する
//
// 戻り値 inventory(受注待ちのRequestJigs)
// 副作用 なし
*/

import getMasterRunInstance from '@/src/middle/getMasterRunInstance'
import loadContractClass from '@/src/run/loadContractClass'

const loadRequestJigs = async () => {
  const run = await getMasterRunInstance()
  const contract = await loadContractClass(run)

  await run.inventory.sync()
  const inventory = run.inventory.jigs.filter(
    (jig) => jig instanceof contract && jig.adventurer === ''
  )

  return inventory
}

export default loadRequestJigs
