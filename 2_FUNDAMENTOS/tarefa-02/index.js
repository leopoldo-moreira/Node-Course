const chalk = require('chalk')
const inquirer = require('inquirer')

const formatadText = (text) =>{
    console.log(chalk.bgYellow.black(text))
}

const questions = [
{
    name: 'userName',
    message: 'Por favor, digite seu nome.'
},
{
    name: 'userAge',
    message: `por favor, digite sua idade.`
}
]

inquirer.prompt(questions)
.then((answer) =>{    
    const name = answer.userName;
    const age = answer.userAge;
    const text = `Olá ${name}, voçê tem ${age} anos`
    formatadText(text)
})
.catch((error) =>{
    console.log(error)
})