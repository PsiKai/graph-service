const express = require("express")
const ejs = require("ejs")

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.set('view engine', "ejs");

app.get("/", (req, res) => {
    res.render("pages/form")
})

app.post("/", (req, res) => {
    const { data } = req.body
    const { graph } = data
    let graphParams

    switch (graph) {
        case "bar":
            const { barGraph } = require("./graphs/bargraph.js")
            graphParams = barGraph(data)
            break;   
        default:
            res.status(400).json({msg: "No graph style received"})
            break;
    }

    ejs.renderFile(`./views/pages/${graph}-graph.ejs`, graphParams, (err, html) => {
        if (err) console.log(err);
        res.send(html)
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Your server is running on port 3000"))