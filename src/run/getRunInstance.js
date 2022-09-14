/* 顧客のHandCashPurse、HandCashOwnerのキーを使用してRunインスタンスを起動する
// 主に、顧客のキー内にあるJigの表示や、換金の際に使用する
//
// 戻り値 run(顧客用)
// 副作用 なし
*/

const getRunInstance = (purse, owner) => {
  // eslint-disable-next-line no-undef, no-unused-vars
  const run = new Run({
    network: 'main',
    purse,
    owner,
    trust: '*',
    timeout: 60000,
  })

  return run
}

export default getRunInstance
