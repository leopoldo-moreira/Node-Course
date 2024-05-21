const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a primeira nota?'
    },
    {
        name: 'p2',
        message: 'qual a segunda nota?'
    }
]).then((answers) => {
    console.log(answers.p1)
    const media = (parseInt(answers.p1) + parseInt(answers.p2) ) / 2
    console.log(`a média é: ${media}`)

}).catch((err) => console.log(err))