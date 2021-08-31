const barGraph = (data) => {
    const {getScale} = require("../utils/scale.js")
    const {graph, points, units, title} = data

    
    const greatestValue = points.reduce((total, {value}) => {
            if (value > total) total = +value
            return total
        }, 0) 

    const graphParams = {
            points, graph, units, scale: getScale(greatestValue), title
        }
    return graphParams
}

module.exports = {barGraph}
