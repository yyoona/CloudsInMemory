
// parse the Data
d3.csv(" /Dataset/All_TimeAltitude.csv", function (d) {
    return { GPSTime: d.GPSTime, GPSAltitude: d.GPSAltitude }
}).then(function (data) {

    // set the dimensions and margins of the graph
    var margin = { top: 60, right: 100, bottom: 60, left: 100 },
        width = innerWidth * 30
    height = innerHeight * 0.5 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    svg_7 = d3.select("#chart_altitude")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a GPSTime format
    var x = d3
        .scaleTime()
        .domain(d3.extent(data, function (d) { return d.GPSTime; }))
        .range([0, width]);
    svg_7.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-10.0, 40.0])
        .range([height, 0]);
    svg_7.append("g")
        .call(d3.axisLeft(y));


    // define the area
    var area = d3.area()
        .x(function (d) { return x(d.GPSTime); })
        .y0(height)
        .y1(function (d) { return y(d.GPSAltitude); });

    var valueline = d3.line()
        .x(function (d) { return x(d.GPSTime); })
        .y(function (d) { return y(d.GPSAltitudee); });

    // Add the line
    svg_7.append("path")
        .datum(data)
        // .attr('d', area)
        .attr("stroke", " rgba(17, 114, 202,1)")
        .attr("fill", " rgba(17, 114, 202,0.2)")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
            .x(function (d) { return x(d.GPSTime) })
            .y(function (d) { return y(d.GPSAltitude) })
        )
    // Add the points
    svg_7
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.GPSTime) })
        .attr("cy", function (d) { return y(d.GPSAltitude) })
        .attr("r", 3)
        .attr("stroke", " rgba(17, 114, 202,1)")
        .attr("fill", " rgba(17, 114, 202,0.2)")

})

