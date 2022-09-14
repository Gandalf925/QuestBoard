/* MasterKeyに保管されているRequestsの中から、受注前の物を表示する
// 戻り値 inventory(受注待ちのRequestJigs)
// 副作用 なし
*/

import getMasterRunInstance from '@/src/middle/getMasterRunInstance'

const loadRequestJigs = async () => {
  const run = await getMasterRunInstance()
  const contract = await run.load(
    'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
  )

  await run.inventory.sync()
  const inventory = run.inventory.jigs.filter(
    (jig) => jig instanceof contract && jig.adventurer === ''
  )

  return inventory
}

export default loadRequestJigs
