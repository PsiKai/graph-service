const addDataPoint = () => {
    const dataDiv = document.querySelector(".data-collection")
    const newInput = document.createElement("div")
    newInput.innerHTML =
        `
            <label for="data-point">Data Point</label>
            <input id="data-point" name="name" type="text" />
            <label for="data-value">Data Value</label>
            <input id="data-value" name="value" type="number" step="0.01"/>
            <label for="value">Data Point</label>
            <input id="value" name="value" type="color" />
        `

    dataDiv.appendChild(newInput)
}


const getGraph = (e) => {
    e.preventDefault()
    const graph = e.target.querySelector("option")
    const inputs = Array.from(e.target.querySelectorAll("input"))
    const dataPoints = Array.from(document.querySelector(".data-collection").children)
    const body = document.querySelector("body")
    // console.log(graph, inputs, dataPoints);

    const reqObj = {
        "data": {
            "graph": graph.value,
            "units": inputs[1].value,
            "title": inputs[0].value,
            "points": dataPoints.map(point => {
                const jsonObj = {
                    "name": point.children[1].value,
                    "value": point.children[3].value,
                    "color": point.children[5].value
                }
                return jsonObj
            })
        } 
    }

    // console.log(JSON.stringify(reqObj));

    const callAPI = async () => {
        try {
            const res = await fetch("/", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqObj)
            })
            const markup = await res.text()
            const currentGraph = document.querySelector("iframe")

            if (currentGraph) body.removeChild(currentGraph)

            const frame = document.createElement("iframe")
            body.appendChild(frame)
            frame.contentWindow.document.open()
            frame.contentWindow.document.write(markup)
            frame.contentWindow.document.close()
        } catch (error) {
            console.log(error);
        }
    }

    callAPI();

    // const formElements = Array.from(e.target.children)
    // formElements.forEach((elem) => {
    //     if (elem.name) console.log(elem.name, elem.value);
    // })

    // const dataCollection = document.querySelector(".data-collection")
    // console.log(dataCollection);
}