/* 現在利用しているContractClass
// （直接利用なし）
//
// 戻り値 なし
// 副作用 なし
*/

// eslint-disable-next-line no-undef
class Contract extends Jig {
  init(
    title,
    clientName,
    description,
    reward,
    limit,
    createdAt,
    owner = '17WzGFg5Rkom9gdCNbewMaN5bkwApUCYyq'
  ) {
    this.metadata = {
      name: title,
    }
    this.clientName = clientName
    this.description = description
    this.limit = limit
    this.satoshis = reward
    this.reward = reward
    this.createdAt = createdAt
    this.owner = owner
    this.adventurer = ''
    this.discussions = []
    this.isFinished = false
    this.isSucceed = false
    this.isFailure = false
  }

  setAdventurer(adventurer) {
    this.adventurer = adventurer
  }

  setDiscussions(name, comment, time) {
    comment = {
      name,
      comment,
      time,
    }
    this.discussions.push(comment)
    return this.discussions
  }

  send(to) {
    this.owner = to
  }

  destroy() {
    this.satoshis = 0
    super.destroy()
  }

  withdraw() {
    this.satoshis = 0
  }

  isFinish() {
    this.isFinished = true
  }

  isSuccess() {
    this.isSucceed = true
  }

  isFail() {
    this.isFailure = true
  }
}

export default Contract

// location: 'dca5fc09f0dade02518afb266025f0c706662741e3345b260a8c78f4ef778635_o1',
// origin: 'dca5fc09f0dade02518afb266025f0c706662741e3345b260a8c78f4ef778635_o1',
// nonce: 1,
// owner: '17WzGFg5Rkom9gdCNbewMaN5bkwApUCYyq',
// satoshis: 0
