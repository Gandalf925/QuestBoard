const Run = require('run-sdk')

const run = new Run({
  purse: 'KyqLkzgFwmTBityrm3hMurC9JA3dkkhjnDb8FWNQr3XoDXuy8Vic',
  owner: 'KzPaaBBDJM5s2DSajUvr1153v3YC81WyFVh9cVuKiC5AXFXPV92g',
  trust: '*',
})

// eslint-disable-next-line no-undef
class Contract extends Jig {
  init(
    title,
    clientName,
    description,
    reward,
    limit,
    createdAt,
    owner = '1BBymKdvCnqHa5ocxd9j9yrKYfWEpJ2tJC'
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

const deploy = async () => {
  const result = run.deploy(Contract)
  await result.sync()
  console.log(result)
}

deploy()
