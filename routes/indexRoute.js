const express = require("express");
const app = express();
const path = require("path")
const mysql = require("../controller/databaseController")

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/login", (req, res) =>{
    res.render("auth/login")
})

app.get("/register", (req, res) =>{
    res.render("auth/register")
})

// login check
app.post("/login", async (req, res) =>{
    const username = req.body.username
    const password = req.body.password
    const isValid = await mysql.authenticateUser(username, password)
    console.log(isValid)
    if (isValid) {
        res.status(200).render("mainpages/main")
    } else {
        res.status(403).render("mainpages/403")
    }
    // mysql.authenticateUser(username, password).then(() => {
    //     res.status(200).render("mainpages/main")
    // }).catch(()=>{
    //     res.status(403).render("mainpages/403")
    // })
})

// register to create user
app.post("/register", (req, res) =>{
    const username = req.body.username
    const password = req.body.password
    mysql.createUser(username, password)
    res.render("auth/login")
})



module.exports = app;