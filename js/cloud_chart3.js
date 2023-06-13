// var bar_width = 20;
// var margin = { top: 50, right: 50, bottom: 50, left: 100 },
//     canvas_width = window.innerWidth / 1.5 - margin.left - margin.right,
//     canvas_height = window.innerHeight / 4;



/////////////////////////////
/////////Chart_Day3//////////
////////////////////////////

// load csv data
d3.csv("/Dataset/Day3_CloudType.csv").then(function (data) {

    var bar_height = 30;
    var margin = { top: 80, right: 60, bottom: 80, left: 80 },
        canvas_width = innerWidth / 1.5 - margin.left - margin.right,
        canvas_height = data.length * bar_height;
    // var parsedData = data.map(function (row) {
    //     row.CloudType = parseFloat(row.CloudType)
    //     row.percent = parseFloat(row.percent)
    //     return row;
    // })
    // console.table(data)

    var svg_3 = d3.select('#chart_3')
        .append('svg')
        .attr('width', canvas_width * 2 + margin.left + margin.right)
        .attr('height', canvas_height + margin.top + margin.bottom)
        .append("g")
        .attr('id', 'hover_chart3')
        .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");


    var parsedData = data.map(function (row) {
        row.percent = parseFloat(row.percent)
        row.count = parseFloat(row.count)
        return row;


    })

    var rangePercent = d3.extent(parsedData, function (d) { return d.percent })
    var rangeCount = d3.extent(parsedData, function (d) { return d.count })

    // get the highest value of the percent
    var max_percent = d3.max(data, function (d) { return d["percent"] })
    var max_count = d3.max(data, function (d) { return d["count"] })

    // Set the scale for the x-axis and draw the x-axis
    var x_scale = d3.scaleLinear()
        .domain([0, 50])
        .range([0, canvas_width + margin.right * 2])
    svg_3.append("g")
        .attr("transform", "translate(20," + canvas_height + ")")
        .call(d3.axisTop(x_scale))
        .selectAll("text")
        .attr('x', '0')
        .attr("y", '20')
        .text(function (d) {
            return d + "%";
        })


    // Set the scale for the y-axis and draw the y-axis
    var y_scale = d3.scaleBand()
        .range([0, canvas_height])
    svg_3.append("g")
        .call(d3.axisLeft(y_scale))
        .attr('x', '20')
        .attr('y', '0')
        .attr("transform", "translate(20,0)")


    // Draw the bar chart
    svg_3.selectAll("chart_3")
        .data(data)
        .join("g")
        .append("rect")
        .attr("x", 22)
        .attr("rx", 12)
        .attr("y", function (d, i) { return bar_height * i })
        .attr("width", function (d) { return x_scale(d.percent) })
        .attr("height", bar_height - 8)
        .attr("stroke", " rgba(17, 114, 202,1)")
        .attr("fill", " rgba(17, 114, 202,0.2)")

        .on('mouseover', function (event, d) {

            var barY = d3.select(this).attr("y");

            d3.select("#hover_chart3")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", 25)
                .attr("y", function (d, i) { return parseFloat(barY) + parseFloat(bar_height) - 15; })
                .text("was observed in " + d.count + " out of 72 observations (" + d.percent + "%)")

            d3.select(event.target)
                .attr("fill", " rgba(17, 114, 202,0)")
        })

        .on("mouseout", function () {
            d3.select("#hover_text")
                .remove()

            d3.select(event.target)
                .transition()
                .duration(1000)
                .attr("stroke", " rgba(17, 114, 202,1)")
                .attr("fill", " rgba(17, 114, 202,0.2)")


        })


    //Add the cloud types for the y-axis
    svg_3.selectAll("chart_3")
        .data(data)
        .enter()
        .append("text")
        .text(function (d) { return d.CloudType })
        .attr("x", "-90")
        .attr("y", function (d, i) { return bar_height * 0.5 + bar_height * i })
        .attr("transform", "translate(105,0)")
        .attr("text-anchor", "end")


    svg_3.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "start")
        // .attr("y", 6)
        .attr("dx", "-0.2em")
        .attr("dy", "8em")
        .attr("transform", "rotate(90)")
        .text("Cloud types")
        .style("font-size", "1.3em");


})