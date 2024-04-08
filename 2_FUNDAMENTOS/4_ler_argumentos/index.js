const args = process.argv.slice(2)


const nome = args[0].split('=')[1]
const idade = args[1].split('=')[1]
console.log(`Nome é ${nome}, sua idade ${idade}`)