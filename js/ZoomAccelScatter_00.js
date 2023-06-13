

// parse the Data
d3.csv(" /Dataset/All_dataset.csv").then(function (data) {

    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 50, bottom: 80, left: 50 },
        width = innerWidth / 1.5 - margin.left - margin.right,
        height = innerHeight * 0.35 + margin.top + margin.bottom;


    var parsedData = data.map(function (row) {
        row.SourceFile = parseFloat(row.SourceFile)
        row.Tilt = parseFloat(row.AccelerationVectorZ)
        row.Zoom = parseFloat(row.DigitalZoomRatio)
        row.CloudType1 = parseFloat(row.CloudType1)

        return row;
    })


    var rangeTilt = d3.extent(parsedData, function (d) { return d.AccelerationVectorZ });
    var rangeZoom = d3.extent(parsedData, function (d) { return d.DigitalZoomRatio });

    // console.log(rangeTilt, rangeZoom)

    var scaleTilt = d3.scaleLinear().domain(rangeTilt).range([window.innerWidth, 0]);
    var scaleZoom = d3.scaleLinear().domain(rangeZoom).range([0, window.innerHeight * 0.25]);

    // append the svg object to the body of the page
    svg_8 = d3.select("#chart_ZoomAccel")
        .append("svg")
        .attr("width", width * 2 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('id', 'hover_scatterchart')
        .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")")

    // set the scale for the X and Y axis
    var x_axis = d3.scaleLinear().domain([0, 1]).range([0, width + margin.right * 3.2]);
    var y_axis = d3.scaleLinear().domain([0, 5]).range([height, 0]);


    // draw the X and Y axis
    svg_8.append("g")

        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_axis))



    svg_8.append("g")
        .call(d3.axisLeft(y_axis))


    // add X-axis label
    svg_8.append("text")
        .attr("dx", width + margin.right * 1.4)
        .attr("dy", height + 40)
        .attr("text-anchor", "start")
        .style("font-size", "1.3em")
        .style("font-weight", 400)
        .text("Tilt of Z-axis (g)");

    // add Y-axis label
    svg_8.append("text")
        .attr("dx", "-0.2em")
        .attr("dy", "4em")
        .attr("transform", "rotate(90)")
        .attr("text-anchor", "start")
        .style("font-size", "1.3em")
        .style("font-weight", 400)
        .text("Digital Zoom Ratio (-x)");


    svg_8.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x_axis(d.AccelerationVectorZ) })
        .attr("cy", function (d) { return y_axis(d.DigitalZoomRatio) })
        .attr("r", 3)
        .attr("fill", " rgba(17, 114, 202,0.2)")
        // .style("fill-opacity", "0.5")
        .attr("stroke", " rgba(17, 114, 202,1)")
        .style("stroke-width", '1')

        .on('mouseover', function (event, d) {
            d3.select("#hover_scatterchart")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return x_axis(d.AccelerationVectorZ) + 10 })
                .attr("y", function () { return y_axis(d.DigitalZoomRatio) + 6 })
                .attr("font-size", "0.8rem")
                .text("⇢ Photo: " + (d.SourceFile) + " < Zoom: " + (d.DigitalZoomRatio) + ", " + "Tilt: " + (d.AccelerationVectorZ) + " >");

            d3.select(event.target)
                .join("circle")
                .attr("r", 9)

        })

        .on('mouseout', function (event, d) {
            d3.select("#hover_text").remove()
            d3.select(event.target).join("circle").attr("r", 3)

        })



})



