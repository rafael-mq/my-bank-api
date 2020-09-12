const db = require("./database")
const bodyParser = require("body-parser");
const express = require("express")

const routes = require("./routes");

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.use("/account", routes)

db.init()
    .then(() => {
        console.log("database initialized");
        app.listen(port, () => {
            console.log(`My-bank-api is listening on http://localhost:${port}...`);
        })
    })
    .catch(e => console.log(e))
