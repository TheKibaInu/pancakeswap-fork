const getTokenLogoURL = (address: string) => address.toLowerCase() === '0xC3afDe95B6Eb9ba8553cDAea6645D45fB3a7FAF5'.toLowerCase() ? 'https://kiba.app/static/media/download.e893807d.png'
 : `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`

export default getTokenLogoURL
