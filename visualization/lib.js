var mouseX, mouseY;
$(document).mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}).mouseover(); // call the handler immediately


const defaultComp = 'Ramp Riot'
const ROOT_URL = 'http://127.0.0.1:3030/'


const TableSpec = {
    NORMAL: 0,
    EXCLUDE: 1,
    COLOR: 3,
    NUMSORT: 4,

};

function findMinMax(data, key) {
    const datas = data.map((node) => node[key]);
    return {
        min: Math.min(...datas),
        max: Math.max(...datas),
    }
}

function chooseComp(e) {
    console.log(e.innerHTML)
    document.getElementById("comp").innerText=e.innerHTML+" Chosen"
    localStorage.setItem("COMP", e.innerHTML)

}

if (localStorage.getItem("COMP")===null) {
    localStorage.setItem("COMP", defaultComp)
    document.getElementById("comp").innerText=defaultComp +" Chosen"

}
else {
    document.getElementById("comp").innerText=localStorage.getItem("COMP") +" Chosen"

}

function createDDElement(div, title) {
    const newDiv = document.createElement("div");
    newDiv.id = 'yes-drop'
    newDiv.classList.add('drag-drop')
    newDiv.innerText = title
    document.getElementById(div).insertBefore(newDiv, document.getElementById(div).firstChild)
}
function createDragDrop(zoneIDs, data, div, callbackWhenZonesFilled) {
    for (const d in data) {
        createDDElement(div, data[d].Field)
    }
    var zones = new Array(zoneIDs.length)
    /* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

    // enable draggables to be dropped into this
    interact(`#${div} .dropzone`).dropzone({
        // only accept elements matching this CSS selector
        accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:

        ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {

            var draggableElement = event.relatedTarget
            var dropzoneElement = event.target
            console.log(event.currentTarget.id)
            let idx = zoneIDs.findIndex((element) => element === event.currentTarget.id)
            console.log(idx)
            if (zones[idx] == null) {
                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target')
                draggableElement.classList.add('can-drop')
                zones[idx] = event.relatedTarget.innerText
            }


        },
        ondragleave: function (event) {

            // remove the drop feedback style
            event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            let idx = zoneIDs.findIndex((element) => element === event.currentTarget.id)
            if (event.relatedTarget.innerText === zones[idx])
                zones[idx] = null;
        },
        ondrop: function (event) {
            if (zones[0] == null || zones[1] == null) { }
            else {
                callbackWhenZonesFilled(zones);

            }
        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    })

    interact('.drag-drop')
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            // dragMoveListener from the dragging demo above
            listeners: { move: dragMoveListener }
        })
}




function createLinearChart(data, fields, div_id, hover_field, w = 1000, h = 400) {
    // set the dimensions and margins of the graph
    var margin = { top: 110, right: 50, bottom: 10, left: 50 },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#" + div_id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    var tooltip = d3.select("#" + div_id)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "3px")
        .style("position", "absolute")
        .style("font-size", "small")


    // Color scale: give me a specie name, I return a color


    var color = d3.scaleOrdinal()
        .domain(["B", "R"])
        .range(["#348ceb", "#F76F72"])

    // Here I set the list of dimension manually to control the order of axis:
    dimensions = fields

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    for (i in dimensions) {
        name = dimensions[i]
        y[name] = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d[name]; })]) // --> Same axis range for each group
            // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
            .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
        .range([0, width])
        .domain(dimensions);

    // Highlight the specie that is hovered
    var highlight = function (d) {

        selected_specie = d.TEAM_COLOR

        // do something with mouseX and mouseY
        tooltip
            .html(hover_field + " = " + d[hover_field])
            .style("opacity", 1)


            .style("left", (mouseX - 20) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (mouseY - 50) + "px")


        // first every group turns grey
        d3.selectAll(".line")
            .transition().duration(200)
            .style("stroke", "lightgrey")
            .style("opacity", "0.6")
        // Second the hovered specie takes its color
        d3.selectAll("." + selected_specie)
            .transition().duration(200)
            .style("stroke", color(selected_specie))
            .style("opacity", "1")
    }

    // Unhighlight
    var doNotHighlight = function (d) {
        tooltip.style("opacity", 0)
        d3.selectAll(".line")
            .transition().duration(200).delay(1000)
            .style("stroke", function (d) { return (color(d.TEAM_COLOR)) })
            .style("opacity", "1")
    }

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
        .selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
        .attr("class", function (d) { return "line " + d.TEAM_COLOR }) // 2 class for each line: 'line' and the group name
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", function (d) { return (color(d.TEAM_COLOR)) })
        .style("opacity", 0.5)
        .style("stroke-width", 5)
        .on("mouseover", highlight)
        .on("mouseleave", doNotHighlight)

    // Draw the axis:
    svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        .attr("class", "axis")
        // I translate this element to its right position on the x axis
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function (d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
        // Add axis title
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .attr("x", 50)

        .attr("transform", "rotate(-50)")
        .text(function (d) { return d; })
        .style("fill", "black")

}


function createSpider(data, fields, div_id, width=900) {
    if (data.length == 0 || fields.length == 0) return
    let newData = []

    let i = 0;
    for (let el in data) {
        newData.push(
            {
                type: 'scatterpolar',
                r: [],
                theta: [],
                fill: 'toself'
            }
        )
        i++
    }
    let idx = 0;

    for (let el of data) {
        for (let key of fields) {
            newData[idx].theta.push(key)
            newData[idx].r.push(el[key])

        }
        idx++;
    }

    layout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, findMinMax(newData, 'r') + 1]
            }
        },
        showlegend: false,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        width: width,
        height: width*0.75
    }

    Plotly.newPlot(div_id, newData, layout)


}


function createTable(data, fields, spec, id, initialSort, height = 500, haveFilter = true) {
    temp = []
    let color_store = null;
    for (const dt in fields) {
        if (spec[dt] === TableSpec.EXCLUDE) continue;


        if (spec[dt] === TableSpec.COLOR) {
            color_store = fields[dt].Field
        }
        if (spec[dt] === TableSpec.NUMSORT) {
            temp.push({
                title: fields[dt].Field,
                field: fields[dt].Field,
                width: 150,
                sorter: 'number'
            })
        }
        else {
            temp.push({
                title: fields[dt].Field,
                field: fields[dt].Field,
                width: 150
            })
        }
        if (haveFilter) {
            let sa = document.createElement('option')
            sa.text = fields[dt].Field
            sa.value = fields[dt].Field
            document.getElementById('filter-field').appendChild(sa)
        }
        
    }
    let table = new Tabulator("#" + id, {
        height: height, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: data, //assign data to table
        columns: temp,
        rowFormatter: function (row) {
            if (!color_store) return
            if (row.getData()[color_store] == "B") {
                row.getElement().style.backgroundColor = "#C9DAF8";
            }
            else {
                row.getElement().style.backgroundColor = "#F76F72";

            }
        },
        initialSort: initialSort,
    });




    //Define variables for input elements
    var fieldEl = document.getElementById("filter-field");
    var typeEl = document.getElementById("filter-type");
    var valueEl = document.getElementById("filter-value");



    //Trigger setFilter function with correct parameters
    function updateFilter() {
        var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
        var typeVal = typeEl.options[typeEl.selectedIndex].value;

        var filter = filterVal == "function" ? customFilter : filterVal;

        if (filterVal == "function") {
            typeEl.disabled = true;
            valueEl.disabled = true;
        } else {
            typeEl.disabled = false;
            valueEl.disabled = false;
        }

        if (filterVal) {
            table.setFilter(filter, typeVal, valueEl.value);
        }
    }

    //Update filters on value change
    document.getElementById("filter-field").addEventListener("change", updateFilter);
    document.getElementById("filter-type").addEventListener("change", updateFilter);
    document.getElementById("filter-value").addEventListener("keyup", updateFilter);

    //Clear filters on "Clear Filters" button click
    document.getElementById("filter-clear").addEventListener("click", function () {
        fieldEl.value = "";
        typeEl.value = "=";
        valueEl.value = "";

        table.clearFilter();
    });

}

function createLineGraph(data, x_axis, y_axis, div_id, w = 690, h = 600, dur = 800) {
    // Create SVG and padding for the chart
    const svg = d3
        .select("#" + div_id)
        .append("svg")
        .attr("height", h)
        .attr("width", w);

    const margin = { top: 10, right: 0, bottom: 90, left: 50 }
    const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const grp = chart
        .append("g")
        .attr("transform", `translate(-${margin.left},-${margin.top})`);

    // Add empty scales group for the scales to be attatched to on update 
    chart.append("g").attr("class", "x-axis");
    chart.append("g").attr("class", "y-axis");

    // Add empty path
    const path = grp
        .append("path")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5);

    function updateScales(data) {
        // Create scales
        const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, dataPoint => dataPoint[y_axis]) + 2]);
        const xScale = d3
            .scaleLinear()
            .range([0, width])
            .domain(d3.extent(data, dataPoint => dataPoint[x_axis]));
        return { yScale, xScale };
    }

    function createLine(xScale, yScale) {
        return d3
            .line()
            .x(dataPoint => xScale(dataPoint[x_axis]))
            .y(dataPoint => yScale(dataPoint[y_axis]));
    }

    function updateAxes(data, chart, xScale, yScale) {
        chart
            .select(".x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(data.length));
        chart
            .select(".y-axis")
            .attr("transform", `translate(0, 0)`)
            .call(d3.axisLeft(yScale));
    }

    function updatePath(dt, line) {
        const updatedPath = d3
            .select("path")
            .interrupt()
            .datum(dt)
            .attr("d", line);

        const pathLength = updatedPath.node().getTotalLength();
        // D3 provides lots of transition options, have a play around here:
        // https://github.com/d3/d3-transition
        const transitionPath = d3
            .transition()
            .ease(d3.easeSin)
            .duration(dur);
        updatedPath
            .attr("stroke-dashoffset", pathLength)
            .attr("stroke-dasharray", pathLength)
            .transition(transitionPath)
            .attr("stroke-dashoffset", 0);
    }


    function updateChart(data) {
        const { yScale, xScale } = updateScales(data);
        const line = createLine(xScale, yScale);
        updateAxes(data, chart, xScale, yScale);
        updatePath(data, line);
    }

    updateChart(data);

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .classed("axisT", true)
        .text(x_axis);

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", 0 - (height / 2))
        .classed("axisT", true)
        .text(y_axis)
}

function createBarChart(data, x_axis, y_axis, div_id, w = 690, h = 600) {

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 0, bottom: 90, left: 40 },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#" + div_id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    let yMinMax = findMinMax(data, y_axis)
    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d[x_axis]; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, yMinMax.max])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var tooltip = d3.select("#" + div_id)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "3px")
        .style("position", "absolute")
        .style("font-size", "small")
    var mouseover = function (d) {

        // do something with mouseX and mouseY
        tooltip
            .html(y_axis + " = " + d[y_axis])
            .style("opacity", 1)


            .style("left", (mouseX - 20) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (mouseY - 50) + "px")

    }


    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
    }
    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d[x_axis]); })
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        // no bar at the beginning thus:
        .attr("height", function (d) { return height - y(0); }) // always equal to 0
        .attr("y", function (d) { return y(0); })
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function (d) { return y(d[y_axis]); })
        .attr("height", function (d) { return height - y(d[y_axis]); })
        .delay(function (d, i) { return (i * 100) })

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 15)
        .attr("x", 0 - (height / 2))
        .classed("axisT", true)
        .text(y_axis)
    // Add circles
    $("mybar").hover(function () {
        $(this).css("stroke", "black");
    }, function () {
        $(this).css("stroke", "none");
    });

}


function createScatterplot(data, x_axis, y_axis, label, div_id, w = 690, h = 600) {
    console.log(data)
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 50, left: 60 },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    // append the SVG object to the body of the page
    var SVG = d3.select("#" + div_id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data

    xMinMax = findMinMax(data, x_axis)
    yMinMax = findMinMax(data, y_axis)

    // Add X axis
    var x = d3.scaleLinear()
        .domain([xMinMax.min - 1, xMinMax.max + 1])
        .range([0, width]);
    var xAxis = SVG.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([yMinMax.min - 1, yMinMax.max + 3])
        .range([height, 0]);
    var yAxis = SVG.append("g")
        .call(d3.axisLeft(y));

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = SVG.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);






    // now the user can zoom and it will trigger the function called updateChart

    // A function that updates the chart when the user zoom and thus new boundaries are available
    function updateChart() {

        // recover the new scale
        var newX = d3.event.transform.rescaleX(x);
        var newY = d3.event.transform.rescaleY(y);

        // update axes with these new boundaries
        xAxis.call(d3.axisBottom(newX))
        yAxis.call(d3.axisLeft(newY))

        // update circle position
        scatter
            .selectAll("circle")
            .attr('cx', function (d) { return newX(d[x_axis]) })
            .attr('cy', function (d) { return newY(d[y_axis]) })




    }

    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    var zoom = d3.zoom()
        .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    SVG.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .call(zoom);


    // Create the scatter variable: where both the circles and the brush take place
    var scatter = SVG.append('g')
        .attr("clip-path", "url(#clip)")

    if (label) {
        var tooltip = d3.select("#" + div_id)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "3px")
            .style("position", "absolute")
            .style("font-size", "small")



        var mouseover = function (d) {



            // do something with mouseX and mouseY
            tooltip
                .html(label + " = " + d[label])
                .style("opacity", 0.6)


                .style("left", (mouseX + 30) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (mouseY + 10) + "px")

        }


        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        var mouseleave = function (d) {
            tooltip
                .style("opacity", 0)
        }
        // Add circles
        scatter
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")


            .attr("cx", function (d) { console.log(d[x_axis]); return x(d[x_axis]); })
            .attr("cy", function (d) { return y(d[y_axis]); })
            .attr("r", 8)
            .style("fill", "#61a3a9")
            .style("opacity", 0.5)
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)



    }
    else {

        scatter
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[x_axis]); })
            .attr("cy", function (d) { return y(d[y_axis]); })
            .attr("r", 8)
            .style("fill", "#61a3a9")
            .style("opacity", 0.5)

    }

    SVG
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    SVG.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .classed("axisT", true)
        .text(x_axis);

    // Y axis label:
    SVG.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .classed("axisT", true)
        .text(y_axis)


    // Add circles
    $("circle").hover(function () {
        $(this).css("stroke", "black");
    }, function () {
        $(this).css("stroke", "none");
    });




}

