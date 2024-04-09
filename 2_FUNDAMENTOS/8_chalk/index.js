const minimist = require('minimist')
const chalk = require('chalk')
const resultado = require('./resultado').resultado


const args = minimist(process.argv.slice(2))

const nota = args['nota']

const displayResult = () =>{
    setTimeout(()=>{
        console.clear()
    },2000)
}

if(resultado(nota)){
    console.log(chalk.bgGreen('Parabens! voce foi aprovado'))
    displayResult()
}else{
    console.log(chalk.bgRed('Lamento! voce foi reprovado'))
    displayResult()
}
