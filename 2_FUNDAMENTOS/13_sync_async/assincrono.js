const fs = require('fs')

console.log('incicio')

fs.writeFile('arquivo.txt','oi', (err) => {
    if(err){
        console.log(`Erro ${err}`)
    }else{
        console.log('Arquivo criado com sucesso!')
    }
})

console.log()