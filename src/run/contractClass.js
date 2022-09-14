/* 現在利用しているContractClass
// （直接利用なし）
//
// 戻り値 なし
// 副作用 なし
*/

// eslint-disable-next-line no-undef
class Contract extends Jig {
  init(title, clientName, description, reward, limit, satoshis, createdAt) {
    if (title === null || title === undefined) {
      throw new Error('Please enter a title')
    }
    if (satoshis < 9999 && satoshis > 100000000) {
      throw new Error(
        'Satoshis that can be set are between 10000 and 1 BSV (100000000)'
      )
    }
    if (clientName === null || clientName === undefined) {
      throw new Error('Incorrect name.')
    }
    if (description === null || description === undefined) {
      throw new Error('Please enter a description')
    }
    this.title = title
    this.clientName = clientName
    this.description = description
    this.limit = limit
    this.satoshis = reward
    this.createdAt = createdAt
    this.adventurer = ''
    this.discussions = []
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

  setAdventurer(adventurer) {
    this.adventurer = adventurer
  }

  send(to) {
    this.owner = to
  }

  destroy() {
    this.satoshis = 0
    super.destroy()
  }
}

export default Contract

// location: '9192d01c22a1a73994f0d7e32205154c09b5b9992b14cda8c56705c9f937ab83_o1',
// origin: '9192d01c22a1a73994f0d7e32205154c09b5b9992b14cda8c56705c9f937ab83_o1',
// nonce: 1,
// owner: '14DCJgi6SSphP7LdaDxjCt7pocbJCALCAX',
// satoshis: 0
