const deploy = async (run, jigClass) => {
  const deployContract = run.deploy(jigClass)
  await deployContract.sync()
  // eslint-disable-next-line no-console
  console.log({ deployContract })

  return deployContract
}

export default deploy
