/* 現在利用しているContractClass
// （直接利用なし）
//
// 戻り値 なし
// 副作用 なし
*/

// eslint-disable-next-line no-undef
class Contract extends Jig {
  init(title, clientName, description, reward, limit, createdAt, owner = '1MtLym3i3vrLBFFiTzotcUQW5KSQNUZNQs') {
    this.metadata = {
      name: title,
    }
    this.clientName = clientName
    this.description = description
    this.limit = limit
    this.satoshis = reward
    this.createdAt = createdAt
    this.owner = owner
    this.adventurer = ''
    this.discussions = []
    this.isFinished = false
    this.isSucceed = false
    this.isFail = false
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

  isFinished() {
    this.isFinished = true
  }

  isSuccess() {
    this.isSucceed = true
  }

  isFail() {
    this.isFail = true
  }
}

export default Contract

// location: '9192d01c22a1a73994f0d7e32205154c09b5b9992b14cda8c56705c9f937ab83_o1',
// origin: '9192d01c22a1a73994f0d7e32205154c09b5b9992b14cda8c56705c9f937ab83_o1',
// nonce: 1,
// owner: '14DCJgi6SSphP7LdaDxjCt7pocbJCALCAX',
// satoshis: 0
