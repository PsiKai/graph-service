const express = require("express")
const ejs = require("ejs")

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.set('view engine', "ejs");

app.get("/", (req, res) => {
    res.render("form")
})

app.post("/", (req, res) => {
    const {data} = req.body
    console.log(data);
    const {graph, points, units, title} = data

    const greatestValue = points.reduce((total, {value}) => {
        if (value > total) total = +value
        return total
    }, 0) 

    const {getScale} = require("./utils/scale.js")

    console.log(getScale(greatestValue));

    const graphParams = {
        points, graph, units, scale: getScale(greatestValue), title
    }

    ejs.renderFile("./views/graph.ejs", graphParams, (err, html) => {
        if (err) console.log(err);
        res.send(html)
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Your server is running on port 3000"))