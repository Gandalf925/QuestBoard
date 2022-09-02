/* eslint-disable no-undef */
/* eslint-disable new-cap */
const Run = require('run-sdk')

const run = new Run({
  network: 'main',
  purse: 'L1btF93JjaFfHngS3rNhCZ2TgUf6KoTwXr7jFgEQ5wFsdFP1nNPp',
  // owner: 'L2Vo8qdPwX9D8UAWwtcddQt8hkmiVFKVybcYBSi9To3pgbHBCXWo',
  // owner: 'KzzFG5pudmn7mhvVaLTSdjc95XjktWJffUAnf43xLMp69EzDkNCb',
  owner: 'KzzFG5pudmn7mhvVaLTSdjc95XjktWJffUAnf43xLMp69EzDkNCb',
  trust: '*',
  timeout: 60000,
})

// eslint-disable-next-line no-undef
class storeComments extends Jig {
  init() {
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
}

class Contract extends Jig {
  init(title, clientName, description, reward, limit, createdAt) {
    this.title = title
    this.clientName = clientName
    this.description = description
    this.limit = limit
    this.satoshis = reward
    this.createdAt = createdAt
    this.adventurer = ''
    this.discussions = new storeComments()
    this.isFinished = false
    this.isSucceed = false
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

  withdraw() {
    this.satoshis = 0
  }

  success() {
    this.isFinished = true
    this.isSucceed = true
  }

  fail() {
    this.isFinished = true
  }
}

Contract.deps = { storeComments }

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
