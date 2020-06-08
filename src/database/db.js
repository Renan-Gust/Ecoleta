// Importar a dependencia do sqlite3
var sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer operações no de banco de dados
var db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto de banco de dados, para nossas operações
 db.serialize(() => { 
 // Com comandos com SQL eu vou:
// 1-Criar uma tabela 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2-Inserir dados na tabela
    var query = `    
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    var values = [
         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
         "Colectoria",
         "Guilherme Gemballa, Jardim América",
          "Número 260",
         "Santa Catarina",
         "Rio do Sul",
         "Resíudos eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

   // db.run(query, values, afterInsertData)
        
    // 3-Consulta os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    // 4-Deletar um dado da tabela
     db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")
    }) 

}) 