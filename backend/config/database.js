const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./database.sqlite', (error) => {
    if (error)
        console.log('Erro ao criar banco de dados:', error.message);
    
    console.log('Conexão com banco de dados estabelecida com sucesso!');
})

module.exports = db;