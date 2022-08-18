const Run = require('run-sdk')

const deploy = async () => {
  const run = new Run({
    network: 'main',
    purse: 'L1btF93JjaFfHngS3rNhCZ2TgUf6KoTwXr7jFgEQ5wFsdFP1nNPp',
    owner: 'L4GBfeZ7pkeiCoL8A2YMtmpE56Aq7Mb9G2dE768mbKcn7n3hBAJK',
    trust: '*',
    timeout: 60000,
  })

  /* eslint-disable no-unused-vars */

  // eslint-disable-next-line no-undef
  class Contract extends Jig {
    init(title, clientName, description, reward, limit, createdAt) {
      if (title === null || title === undefined) {
        throw new Error('Please enter a title')
      }
      if (reward < 0 && reward > 100000000) {
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

  // const deploy = await run.deploy(Contract)
  // await deploy.sync()
  // console.log({ deploy })

  const contract = await run.load(
    'c9b10dddb0d21c4509af815610b0ac8baf3c672318a41cea41429274f5bc040e_o1'
  )

  // eslint-disable-next-line new-cap
  // const mint = new contract('a', 'b', 'c', 1, 'e', 'g')
  // await mint.sync()
  // console.log({ mint })

  const inv = await run.inventory.sync()
  // const inventory = run.inventory.jigs.find((jig) => jig instanceof contract)
  const inventory = run.inventory.jigs.filter((jig) => jig instanceof contract)
  // eslint-disable-next-line no-console
  // await inventory.sync()
  console.log({ inventory })
}

deploy()

// location: 'c9b10dddb0d21c4509af815610b0ac8baf3c672318a41cea41429274f5bc040e_o1',
// origin: 'c9b10dddb0d21c4509af815610b0ac8baf3c672318a41cea41429274f5bc040e_o1',
// nonce: 1,
// owner: '1BwD1SSRmH8Kjm5nXuw2icEt1nucRjxMCw',
// satoshis: 0

// mint: Object <Object <Object <Complex prototype>>> {
//   location: '07b074dd11707676af60770061404198b46619953bc60a5c1f751b58abdaeb1c_o1',
//   origin: '07b074dd11707676af60770061404198b46619953bc60a5c1f751b58abdaeb1c_o1',
//   nonce: 1,
//   owner: '1BwD1SSRmH8Kjm5nXuw2icEt1nucRjxMCw',
//   satoshis: 10000,
//   title: 'a',
//   clientName: 'b',
//   description: 'c',
//   limit: 'e',
//   createdAt: 'g',
//   adventurer: '',
//   discussions: Array <Array <Complex prototype>>(0) []
// }
