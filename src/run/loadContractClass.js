/* ContractClassの読み込み
//
// 戻り値 contract
// 副作用 なし
*/

const loadContractClass = async (run) => {
  const contract = await run.load(
    'ed3b51df93d85065049e4c46092034a71bc212f8571ff07374713167bf0757d4_o1'
  )

  return contract
}

export default loadContractClass

// 'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
