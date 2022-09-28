/* ContractClassの読み込み
//
// 戻り値 contract
// 副作用 なし
*/

const loadContractClass = async (run) => {
  const contract = await run.load(
    'dca5fc09f0dade02518afb266025f0c706662741e3345b260a8c78f4ef778635_o1'
  )

  return contract
}

export default loadContractClass

// 'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
