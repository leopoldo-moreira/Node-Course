const a = 20

if(!Number.isInteger(a)){
    throw new Error("a não é um número inteiro")
}

console.log("Continuando o código")