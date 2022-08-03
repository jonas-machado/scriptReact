const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")
const bcrypt = require("bcrypt")
const saltRounds = 10

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "35796482",
    database: "banco",
})

app.use(express.json())
app.use(cors())

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM banco.usuarios WHERE email = ?", [email], (err, response) => {
        if(err) {
            res.send(err)
        }
        if (response.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                db.query(
                    "INSERT INTO banco.usuarios (email, password) VALUES (?, ?)", [email, hash],
                    (err, result) => {
                        if (err) {
                            res.send(err)
                        }
                        res.send({msg: "Cadastrado com sucesso"})
                    }
                )
            })
            
        } else {res.send({msg: "Usuário já cadastrado"})}
    })
})

app.post("/register2", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM banco.usuarios WHERE email = ?", 
        [email]), (err, result) => {
            if (err) {
                res.send(err)
            }
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (err, result) => {
                    if(result){
                        res.send("Usuário logado")
                    } else {res.send("Senha está incorreta")}
                })
                res.send({msg: "Logado"})
            } else {res.send({msg: "Conta não encontrada"})}
    }
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})