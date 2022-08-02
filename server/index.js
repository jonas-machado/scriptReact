const express = require("express")
const app = express()
const mysql = express()

const db = mysql.createPoll({
    host: "localhost",
    user: "root",
    password: "password",
    database: "",
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})