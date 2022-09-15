/* 顧客の依頼をMasterKeyに送信してQuestBoardに表示させる（requestJobsページ限定使用）
//
// 戻り値 なし
// 副作用 なし
*/

import getMasterRunInstance from '@/src/middle/getMasterRunInstance'
import loadContractClass from '@/src/run/loadContractClass'

const requestJobs = async (
  title,
  clientName,
  description,
  reward,
  deadline
) => {
  const run = await getMasterRunInstance()
  const contract = await loadContractClass(run)

  // 投稿時刻の登録
  const time = new Date().toString()

  // 依頼の掲示
  // eslint-disable-next-line new-cap
  const request = new contract(
    title,
    clientName,
    description,
    reward,
    deadline,
    time
  )
  await request.sync()
}

export default requestJobs
