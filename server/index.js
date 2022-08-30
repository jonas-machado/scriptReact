require("dotenv").config()

const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")
const bcrypt = require("bcrypt")
const saltRounds = 10

const orion = require("solar-orionjs")({
    server: "172.16.40.9",
    port: 17778,
    auth: {
        username: "redes2020",
        password: "OT#internet2018"
    }
})

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const axios = require('axios')

const jwt = require("jsonwebtoken")

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "35796482",
    database: "banco",
})

app.use(express.json())
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    key: "userId",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000,
    }
}))

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        res.send("Precisa do token");
    } 
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                res.json({auth: false, msg: "falhou"});
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}


app.get("/monitoramento", (req, res) => {
    orion.query({query:`SELECT EventID, EventTime, NetworkNode, NetObjectID, EventType, Message, Acknowledged, NetObjectType, TimeStamp
    FROM Orion.Events
    where EventTime(date) BETWEEN '2022-08-29 23:00:00' AND '2022-08-30 23:00:00'`}, 
    function (result){
        res.send(result);
    });})

app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("Autenticado")
})

app.get("/login", (req, res) =>{
    if(req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user,
        })
    }else{res.send({loggedIn: false})}
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM banco.usuarios WHERE email = ?", 
        email, (err, result) => {
            if (err) {
                res.send(err)
            }
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response){
                        const id = result[0].idusuarios
                        const token = jwt.sign({id}, process.env.SECRET_KEY, {
                            expiresIn: 300,
                        })

                        req.session.user = result


                        res.json({auth: true, token: token, result: result})

                    } else {
                        res.send({msg: "Alguma coisa deu errada"})
                    }
                })
            } else {res.json({auth: false, msg: "Alguma coisa deu errada"})}
    })
})

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM banco.usuarios WHERE email = ?", [email], (err, response) => {
        if(err) {
            res.send(err)
        }
        if (response.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
                    console.log(err)
                }
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



app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})