/* ContractClassの読み込み
//
// 戻り値 contract
// 副作用 なし
*/

const loadContractClass = async (run) => {
  const contract = await run.load(
    'ed8a2c621c6f651ac27fdbbada6f601d046c1fabedd0fed40ec95017126ce130_o1'
  )

  return contract
}

export default loadContractClass

// 'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
