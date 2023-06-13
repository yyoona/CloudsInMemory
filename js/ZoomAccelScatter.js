// parse the Data
d3.csv("/Dataset/All_dataset.csv").then(function (data) {

    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 50, bottom: 80, left: 50 },
        width = innerWidth / 1.5 - margin.left - margin.right,
        height = innerHeight * 0.35 + margin.top + margin.bottom;

    var parsedData = data.map(function (row) {
        row.SourceFile = parseFloat(row.SourceFile);
        row.Tilt = parseFloat(row.AccelerationVectorZ);
        row.Zoom = parseFloat(row.DigitalZoomRatio);
        row.Day = parseFloat(row.Day);
        return row;
    });

    var rangeTilt = d3.extent(parsedData, function (d) { return d.AccelerationVectorZ; });
    var rangeZoom = d3.extent(parsedData, function (d) { return d.DigitalZoomRatio; });

    var scaleTilt = d3.scaleLinear().domain(rangeTilt).range([window.innerWidth, 0]);
    var scaleZoom = d3.scaleLinear().domain(rangeZoom).range([0, window.innerHeight * 0.25]);

    var svg_8 = d3.select("#chart_ZoomAccel")
        .append("svg")
        .attr("width", width * 2 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('id', 'hover_scatterchart')
        .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");

    var x_axis = d3.scaleLinear().domain([0, 1]).range([0, width + margin.right * 3.2]);
    var y_axis = d3.scaleLinear().domain([0, 5]).range([height, 0]);

    svg_8.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_axis));

    svg_8.append("g")
        .call(d3.axisLeft(y_axis));

    svg_8.append("text")
        .attr("dx", width + margin.right * 1.4)
        .attr("dy", height + 40)
        .attr("text-anchor", "start")
        .style("font-size", "1.3em")
        .style("font-weight", 400)
        .text("Tilt of Z-axis (g)");

    svg_8.append("text")
        .attr("dx", "-0.2em")
        .attr("dy", "4em")
        .attr("transform", "rotate(90)")
        .attr("text-anchor", "start")
        .style("font-size", "1.3em")
        .style("font-weight", 400)
        .text("Digital Zoom Ratio (-x)");

    var circles = svg_8.selectAll("circle")
        .data(parsedData)
        .join("circle")
        .attr("cx", function (d) { return x_axis(d.AccelerationVectorZ); })
        .attr("cy", function (d) { return y_axis(d.DigitalZoomRatio); })
        .attr("r", 3)
        .attr("fill", "rgba(17, 114, 202, 0.2)")
        .attr("stroke", "rgba(17, 114, 202, 1)")
        .style("stroke-width", '1')
        .style("opacity", 1);

    var selectedValue = "all";

    circles.on('mouseover', function (event, d) {
        if (selectedValue !== "all" && d.CloudType1.toString() !== selectedValue) {
            return;
        }
        svg_8.append("text")
            .attr("id", "hover_text_scatter")
            .attr("x", function () { return x_axis(d.AccelerationVectorZ) + 15; })
            .attr("y", function () { return y_axis(d.DigitalZoomRatio) + 5; })
            .html(function () {
                return d.CloudType1 + " in Day" + d.Day +
                    "<tspan dy='1.2em' x='" + (x_axis(d.AccelerationVectorZ) + 10) + "'>" +
                    "- Zoom " + d3.format(".1f")(d.DigitalZoomRatio) + "x" + "</tspan>" +
                    "<tspan dy='1.2em' x='" + (x_axis(d.AccelerationVectorZ) + 10) + "'>" + "- Tilt: " + d3.format(".3f")(d.AccelerationVectorZ) + "g" + "</tspan>";
            });

        d3.select(event.target)
            .attr("r", 9)
            .attr("fill", " rgba(17, 114, 202,0)")

    }).on('mouseout', function (event, d) {
        if (selectedValue !== "all" && d.CloudType1.toString() !== selectedValue) {
            return;
        }
        d3.select("#hover_text_scatter").remove();
        d3.select(event.target)
            .transition()
            .duration(300)
            .attr("fill", " rgba(17, 114, 202,0.2)")
            .attr("r", function (d) {
                if (selectedValue === "all") {
                    return 3;
                } else if (d.CloudType1.toString() === selectedValue) {
                    return 6;
                } else {
                    return 1.5;
                }
            })


    });

    d3.select("#dropdown")
        .on("change", function () {
            selectedValue = d3.select(this).property("value");
            circles.transition()
                .duration(1000)
                .attr("r", function (d) {
                    if (selectedValue === "all") {
                        return 3;
                    } else if (d.CloudType1.toString() === selectedValue) {
                        return 6;
                    } else {
                        return 1.5;
                    }
                })
                .style("opacity", function (d) {
                    if (selectedValue === "all") {
                        return 1;
                    } else if (d.CloudType1.toString() === selectedValue) {
                        return 1;
                    } else {
                        return 0.3;
                    }
                });
        });

});
