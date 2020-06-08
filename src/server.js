var express = require("express")
var server = express()

// Pegar o banco de dados
var db = require("./database/db.js")

//Configurar pasta pública
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//Utilizando template engine
var nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
   express: server, 
   noCache:  true
})

//Configurar caminhos da minha aplicação
//Página inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) =>{
    return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) =>{
    //req.query: Query Strings da nossa url
    //console.log(req.query)



    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body: O copor do nosso formulário
    //console.log(req.body)

    //Inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
             console.log(err)
             return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) =>{
    var search = req.query.search

    if(search == "") {
        //Pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        var total = rows.length

        //Mostrar a página HTML com os ddos do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })

})

//ligar o servidor
server.listen(3000)