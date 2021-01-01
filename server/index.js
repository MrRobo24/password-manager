const express = require('express');
const mysql = require('mysql');
const options = require('./options');
const app = express();
const cors = require('cors');
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
    db.query("INSERT INTO passwords (password, title) VALUES (?, ?)",
    [password, title],
     (err, result) => {
         if (err) {
             console.log(err);
         } else {
             res.send("DB Insertion Successful");
         }
    });
});

app.listen(PORT, () => {
    console.log("Server is running");
});