/* ContractClassの読み込み
//
// 戻り値 contract
// 副作用 なし
*/

const loadContractClass = async (run) => {
  const contract = await run.load(
    'c8964fafce9718712aaa2b760e0f493e038ce25f9d8bf269fd59d9e1b44d3bec_o1'
  )

  return contract
}

export default loadContractClass

// 'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
