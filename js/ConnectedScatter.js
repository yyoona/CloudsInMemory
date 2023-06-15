


// parse the Data
d3.csv("./Dataset/All_TimeAltitude.csv").then(function (data) {
    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 100, bottom: 80, left: 100 },
        width = innerWidth * 40,
        height = 400 - margin.top - margin.bottom;


    var parsedData = data.map(function (row) {
        row.GPSTime = parseFloat(row.GPSTime)
        // row.Date = parseFloat(row.Date)
        // row.Time = parseFloat(row.Time)
        row.GPSAltitude = parseFloat(row.GPSAltitude)
        return row;
    })

    var rangeGPSTime = d3.extent(parsedData, function (d) { return d.GPSTime });
    var rangeGPSAltitude = d3.extent(parsedData, function (d) { return d.GPSAltitude });

    var scaleGPSTime = d3.scaleLinear().domain(rangeGPSTime).range([window.innerWidth * 0.5, 0]);
    var scaleGPSAltitude = d3.scaleLinear().domain(rangeGPSAltitude).range([0, window.innerHeight * 0.5]);


    svg_7_y = d3.select("#linechart_y")
        .append("svg")
        .attr("width", 101)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // svg_7_x = d3.select("#linechart_x")
    //     .append("svg")
    //     .attr("width", 50)
    //     .attr("height", 20)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left * -10.3 + "," + margin.top + ")");



    // append the svg object to the body of the page
    svg_7 = d3.select("#chart_altitude")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('id', 'hover_linechart')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set the scale for the X and Y axis
    var x_axis_dot = d3.scaleLinear().domain([1368778200, 1369231200]).range([0, width]);

    var x_axis = d3.scaleTime()
        .domain([new Date(1684732200000), new Date(1685185200000)])
        .range([0, width])




    var xAxis = d3.axisBottom(x_axis)
        .ticks(d3.timeHour.every(1))
        .tickFormat(d3.timeFormat("%H:%M:%S (%a. %d. %m)"))
        .tickSize(20)




    var y_axis = d3.scaleLinear().domain([-10.0, 40.0]).range([height, 0]);

    svg_7.append("g")
        .attr('id', 'xAxis_tick')
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")




    svg_7_y.append("g")
        .attr('id', 'linechart_yAxis')
        .call(d3.axisLeft(y_axis))
        .selectAll("text")


    // // add X-axis label
    // svg_7_x.append("text")
    //     .attr('id', 'linechart_xLabel')
    //     .attr("dx", "74em")
    //     .attr("dy", "-3em")
    //     .attr("text-anchor", "end")
    //     .style("font-size", "1.3em")
    //     .text("Time");

    // add Y-axis label
    svg_7_y.append("text")
        .attr('id', 'linechart_yLabel')
        .attr("dx", "-0.2em")
        .attr("dy", "4em")
        .attr("transform", "rotate(90)")
        .attr("text-anchor", "start")
        .style("font-size", "1.3em")
        .text("Altitude (meters above sea level)");

    // svg_7.append("text")
    // .attr("class", "y label")
    // .attr("text-anchor", "start")
    // .attr("y", 6)
    // .attr("dy", ".75em")
    // .attr("transform", "rotate(90),translate(5,100)")
    // .style("font-size", "1.2em")
    // .text("Altitude");

    var area = d3.area()
        .x(function (d) { return x(d.GPSTime); })
        .y0(height)
        .y1(function (d) { return y(d.GPSAltitude); });

    var valueline = d3.line()
        .x(function (d) { return x(d.GPSTime); })
        .y(function (d) { return y(d.GPSAltitude); });

    // Add the line
    svg_7.append("path")
        .datum(data)
        .attr("stroke", " rgba(17, 114, 202,1)")
        .attr("fill", " rgba(17, 114, 202,0)")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
            .x(function (d) { return x_axis_dot(d.GPSTime) })
            .y(function (d) { return y_axis(d.GPSAltitude) }))

    svg_7.selectAll("chart_altitude")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x_axis_dot(d.GPSTime) })
        .attr("cy", function (d) { return y_axis(d.GPSAltitude) })
        .attr("r", 3)
        .attr("stroke", " rgba(17, 114, 202,1)")
        .attr("fill", " rgba(17, 114, 202,0.2)")
        .style("stroke-width", '1')


        .on('mouseover', function (event, d) {

            d3.select("#hover_linechart")
                .append("text")
                .attr("id", "hover_text_1")
                .attr("x", function () { return x_axis_dot(d.GPSTime) - 10 })
                .attr("y", height + 15)
                .text("at " + (d.Time) + " " + (d.Date))

            d3.select("#hover_linechart")
                .append("text")
                .attr("id", "hover_text_2")
                .attr("x", function () { return x_axis_dot(d.GPSTime) - 10 })
                .attr("y", function () { return y_axis(d.GPSAltitude) - 15 })
                .text("Altitude: " + d.GPSAltitude + "m")

            d3.select("#hover_linechart")
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + x_axis_dot(d.GPSTime) })
                .attr("y1", function () { return y_axis(d.GPSAltitude) })
                .attr("x2", function () { return + x_axis_dot(d.GPSTime) })
                .attr("y2", height)
                .attr("stroke", " rgba(17, 114, 202,0.8)")
                .style("stroke-dasharray", ("5, 3"))
                .style("stroke-width", '1')


            d3.select(event.target)
                .attr("r", 9)
                .attr("fill", " rgba(17, 114, 202,0)")

        })

        .on('mouseout', function () {
            d3.select("#hover_text_1")
                .remove()
            d3.select("#hover_text_2")
                .remove()
            d3.select("#hover_line")
                .transition()
                .duration(50)
                .remove()


            d3.select(event.target)
                .transition()
                .duration(300)
                .attr("r", 3)
                .attr("fill", " rgba(17, 114, 202,0.2)")

        })


})

