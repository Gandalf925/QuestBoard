/* 顧客の依頼をMasterKeyに送信してQuestBoardに表示させる（requestJobsページ限定使用）
//
// 戻り値 なし
// 副作用 なし
*/

import getMasterRunInstance from '@/src/middle/getMasterRunInstance'

const requestJobs = async (
  title,
  clientName,
  description,
  reward,
  deadline
) => {
  const masterRun = await getMasterRunInstance()
  const contract = await masterRun.load(
    'aecd1331472177ce3f4e409f4ff795711cb290b98b7669506c6ae0e0b67617d9_o1'
  )

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
