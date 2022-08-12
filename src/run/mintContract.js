const mint = async (run, ContractClassLocation) => {
  const contract = await run.load(ContractClassLocation)
  await contract.sync()
  // const createContract = new contract()
  // console.log({ createContract })

  // return createContract
}

export default mint
