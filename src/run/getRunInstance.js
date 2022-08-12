const getRunInstance = (purse, owner) => {
  // eslint-disable-next-line no-undef, no-unused-vars
  const run = new Run({
    network: 'main',
    purse,
    owner,
    trust: '*',
    timeout: 60000,
  })

  return run
}

export default getRunInstance
