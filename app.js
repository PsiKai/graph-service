const express = require("express")
const ejs = require("ejs")

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.set('view engine', "ejs")

const port = process.env.PORT || 3000

const parseData = (data) => {
    const {graph, points} = data

    const pointMap = points.map(point => `<div>${point.name}: ${point.value}</div>`)

        console.log(points, pointMap);

    return 
}

app.get("/", (req, res) => {
    const {body: {data}, headers: {cookie}} = req
    const {graph, points} = data
    // res.json({msg: "Ping!", cookie, data})
    res.render("graph", {
        points,
        graph
    })
})

app.listen(port, () => console.log("Your server is running on port 3000"))