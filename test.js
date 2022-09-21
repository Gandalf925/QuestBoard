/* eslint-disable no-undef */
/* eslint-disable new-cap */
const Run = require('run-sdk')

const run = new Run({
  network: 'main',
  purse: 'L3qGyBDyNvG3LztYgdDJ2JxhX9CW8J5r9d7Z5tBru9fteNYnqJKF',
  owner: 'KwMAvKrad1UCdETP69YLJ6oEhXP5wMwuUQe8G93XN5Rg24kBG9da',
  trust: '*',
  timeout: 60000,
})

class Contract extends Jig {
  init(
    title,
    clientName,
    description,
    reward,
    limit,
    createdAt,
    owner = '1MtLym3i3vrLBFFiTzotcUQW5KSQNUZNQs'
  ) {
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
  const deploy = run.deploy(Contract)
  await deploy.sync()
  console.log(deploy)
}
deploy()

// const comment = async () => {
//   const contract = await run.load(
//     'b9dc31fc919c14ad6efada41aec9f663ea9f0c0644028d7614461b3fb54b856d_o3'
//   )
//   await contract.sync()
//   const result = contract.discussions.setDiscussions(
//     'Gandalf',
//     'TEST',
//     '22/9/2'
//   )
//   await result.sync()
//   console.log({ result })
//   console.log(contract)
// }

// comment()

// location: '385628a48c908a74d6e8fd067cd4fe3f0217f71c773ef0ec7961875a8bba754b_o1',
// origin: '385628a48c908a74d6e8fd067cd4fe3f0217f71c773ef0ec7961875a8bba754b_o1',
// nonce: 1,
// owner: '1MtLym3i3vrLBFFiTzotcUQW5KSQNUZNQs',
// satoshis: 0

// owner: 'L1x3ZBdLHnmRJrZQ9P9DU4HCkp3jLcPtKJnzaN965k2skDg5PrsT',
