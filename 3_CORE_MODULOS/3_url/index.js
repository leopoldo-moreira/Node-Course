const url = require('url')
const address = 'https://www.meusite.com/catalog?produtos=cadeira'
const parseUrl = new url.URL(address)

console.log(parseUrl)
