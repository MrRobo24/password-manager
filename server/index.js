const express = require('express');
const mysql = require('mysql');
const options = require('./options');
const app = express();
const cors = require('cors');

const {encrypt, decrypt} = require("./encryption_handler");

const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbLogin = {
    user: options.storageConfig.user,
    host: options.storageConfig.host,
    password: options.storageConfig.password,
    database: options.storageConfig.database
};

const db = mysql.createConnection(dbLogin)




app.post("/addpassword", (req, res) => {
    const {password, title} = req.body;
    const encryption = encrypt(password);

    db.query("INSERT INTO passwords (password, title, iv) VALUES (?, ?, ?)",
    [encryption.password, title, encryption.iv],
     (err, result) => {
         if (err) {
             console.log(err);
         } else {
             res.send("DB Insertion Successful");
         }
    });
});

app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
});

app.get("/showpasswords", (req, res) => {
    db.query("SELECT * FROM passwords", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }); 
});


app.listen(PORT, () => {
    console.log("Server is running");
});