const Run = require('run-sdk')

const deploy = async () => {
  const run = new Run({
    network: 'main',
    purse: 'L1btF93JjaFfHngS3rNhCZ2TgUf6KoTwXr7jFgEQ5wFsdFP1nNPp',
    owner: 'L3wdizmbG7uyzS9tBBET8bUUHzFjaxxmfwx64mdzYiuJF19EtpTZ',
    trust: '*',
    timeout: 60000,
  })

  // eslint-disable-next-line no-undef
  class TestToken extends Token {}
  TestToken.metadata = {
    name: '俺のコイン',
  }

  const deploy = await run.deploy(TestToken)
  await deploy.sync()
  console.log({ deploy })
}

deploy()
