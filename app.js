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

    const getScale = () => {
        const magnitude = Math.round(greatestValue).toString().length
        switch (magnitude) {
            case 1:
                return 10;
            case 2:
                return 100;
            case 3: 
                if (greatestValue / 2 < 100) {
                    return 200
                } else if (greatestValue / 2 < 150) {
                    return 300
                } else if (greatestValue / 2 < 200) {
                    return 400
                } else if (greatestValue / 2 < 250) {
                    return 500
                } else if (greatestValue / 2 < 300) {
                    return 600
                }
                return 1000;
            default:
                return;
        }
    }

    console.log(getScale());

    ejs.renderFile("./views/graph.ejs", {points, graph, units, scale: getScale(), title}, (err, html) => {
        if (err) console.log(err);
        res.send(html)
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Your server is running on port 3000"))