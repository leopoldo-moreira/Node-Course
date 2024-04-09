const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question("Quantos anos voce tem? ", (idade) =>{
    if (idade >= 18){
        console.log("você é maior de idade")
    }else{
        console.log("você é menor de idade")
    }   
    readline.close()
})

