/* WhatsonchainのAPIから、現在のBSVレートを取得する
//
// 戻り値 res(rate)
// 副作用 なし
*/

import axios from 'axios'

const displayRate = async () => {
  // BSVの現在レートを表示
  const url = 'https://api.whatsonchain.com/v1/bsv/main/exchangerate'
  const res = await axios.get(url)
  return res
}

export default displayRate
