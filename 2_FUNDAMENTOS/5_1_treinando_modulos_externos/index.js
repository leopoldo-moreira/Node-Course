const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const name = args['nome']
const idade = args['idade']
const profissao = args['profissao']

console.log(`O nome dele é ${name}, ele possui ${idade} anos e é ${profissao}`)