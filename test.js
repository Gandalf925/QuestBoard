const Run = require('run-sdk')

const deploy = async () => {
  const run = new Run({
    network: 'main',
    purse: 'L1btF93JjaFfHngS3rNhCZ2TgUf6KoTwXr7jFgEQ5wFsdFP1nNPp',
    owner: 'L2Vo8qdPwX9D8UAWwtcddQt8hkmiVFKVybcYBSi9To3pgbHBCXWo',
    trust: '*',
    timeout: 60000,
  })

  // eslint-disable-next-line no-undef
  class Contract extends Jig {
    init(title, clientName, description, reward, limit, createdAt) {
      this.title = title
      this.clientName = clientName
      this.description = description
      this.limit = limit
      this.satoshis = reward
      this.createdAt = createdAt
      this.adventurer = ''
      this.discussions = []
      this.isFinished = false
      this.isSucceed = false
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

  // const deploy = await run.deploy(Contract)
  // await deploy.sync()
  // console.log({ deploy })

  const contract = await run.load(
    '63e98ca82b42d53f0471f5f9a17f9e8fd1ac303f4ee4de47c72942f0c3ee1ab2_o1'
  )

  // eslint-disable-next-line new-cap
  // const mint = new contract(
  //   '二郎系ラーメンが食べてみたい',
  //   'レンタル二郎食べてみたい人',
  //   '明らかに健康に悪いあのラーメンを、人生で一度でいいから食べてみたい',
  //   1,
  //   '2022年4月4日',
  //   '2022年4月15日'
  // )
  // await mint.sync()
  // console.log({ mint })

  await run.inventory.sync()
  const inventory = run.inventory.jigs.filter((jig) => jig instanceof contract)
  const finishedContract = inventory.filter((jig) => jig.discussions === true)

  console.log({ inventory })
  console.log({ finishedContract })

  // -------------------------------SETADVENTURER

  // await contract.sync()
  // const setAdventurer = contract.setAdventurer('Gandalf925')
  // await contract.sync()
  // console.log(setAdventurer)

  // console.log({ inventory })
  // console.log({ finishedContract })

  // -------------------------DESTROY
  // await contract.sync()
  // const setSuccess = contract.destroy()
  // await contract.sync()
  // console.log(setSuccess)

  // ----------------------------------
  // await contract.sync()
}

deploy()

// contractClass
// location: '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1',
// origin: '7bcc124bfedcf005133b0d7c698faf864764bbeb3b01559ade3e8d133c0595a2_o1',
// nonce: 1,
// owner: '17cDTVo2c9Q5vVjFWiZUNnJHHxeb5NjuM5',
// satoshis: 0

// mint: Object <Object <Object <Complex prototype>>> {
//   location: '0328b9f10678bb45b1488d771f8bab5c802c8736a6a6db86452246422b7ae68f_o1',
//   origin: '0328b9f10678bb45b1488d771f8bab5c802c8736a6a6db86452246422b7ae68f_o1',
//   nonce: 1,
//   owner: '17cDTVo2c9Q5vVjFWiZUNnJHHxeb5NjuM5',
//   satoshis: 1,
//   title: '二郎系ラーメンが食べてみたい',
//   clientName: 'レンタル二郎食べてみたい人',
//   description: '明らかに健康に悪いあのラーメンを、人生で一度でいいから食べてみたい',
//   limit: '2022年4月4日',
//   createdAt: '2022年4月15日',
//   adventurer: '',
//   discussions: Array <Array <Complex prototype>>(0) [],
//   isFinished: false,
//   isSucceed: false
// }
