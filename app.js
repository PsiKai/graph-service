const express = require("express")
const ejs = require("ejs")

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.set('view engine', "ejs")


app.get("/", (req, res) => {
    const {body: {data}, headers: {cookie}} = req
    const {graph, points, units} = data
    ejs.renderFile("./views/graph.ejs", {points, graph, units}, (err, html) => {
        if (err) console.log(err);
        res.send(html)
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Your server is running on port 3000"))