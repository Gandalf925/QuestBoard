import axios from 'axios'

const displayRate = async () => {
  // BSVの現在レートを表示
  const url = 'https://api.whatsonchain.com/v1/bsv/main/exchangerate'
  const res = await axios.get(url)
  return res
}

export default displayRate
