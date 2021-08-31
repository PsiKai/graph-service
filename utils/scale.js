const getScale = (greatestValue) => {
    const valueAsArray = Math.round(greatestValue).toString().split("")
    let x

    if (+valueAsArray[0] === 9 || +valueAsArray[0] > 5) {
        valueAsArray.unshift("1")
        x = 1
    } 
    else if (+valueAsArray[1] >= 5) {
        valueAsArray[0] = +valueAsArray[0] + 1
        x = 1
    }
    else if (+valueAsArray[1] < 5) {
        valueAsArray[1] = '5'
        x = 2
    }

    for (i = x; i < valueAsArray.length; i++) {
            valueAsArray[i] = '0'
        }
    console.log(parseInt(valueAsArray.join("")));
    const scale = parseInt(valueAsArray.join(""))

    return scale
}


module.exports = {getScale}