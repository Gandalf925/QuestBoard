/* ContractClassの読み込み
//
// 戻り値 contract
// 副作用 なし
*/

const loadContractClass = async (run) => {
  const contract = await run.load(
    '385628a48c908a74d6e8fd067cd4fe3f0217f71c773ef0ec7961875a8bba754b_o1'
  )

  return contract
}

export default loadContractClass

// 'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
