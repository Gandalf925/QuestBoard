const mint = async (run, ContractClassLocation) => {
  const contract = await run.load(ContractClassLocation)
  await contract.sync()
  // eslint-disable-next-line new-cap
  const createContract = new contract()
  // eslint-disable-next-line no-console
  console.log({ createContract })

  return createContract
}

export default mint
