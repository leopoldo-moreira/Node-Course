const fs = require('fs');

if (!fs.existsSync('./minhaPasta')) {
    fs.mkdirSync('./minhaPasta');
    console.log('Pasta criada com sucesso!');
} else {
    console.log('Pasta ja existe!');
}