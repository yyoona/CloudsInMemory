
// parse the Data




d3.csv(" /Dataset/All_TimeAltitude.csv").then(function (data) {

    var parsedData = data.map(function (row) {
        row.TimeStamp = parseFloat(row.TimeStamp)
        row.GPSAltitude = parseFloat(row.GPSAltitude)
        return row;
    })

    var xValue = d => d.TimeStamp;
    var xLabel = 'Time';
    var yValue = d => d.GPSAltitude;
    var yLabel = 'Altitude';


    var margin = { top: 60, right: 100, bottom: 60, left: 100 },
        width = innerWidth * 30
    height = innerHeight * 0.5 - margin.top - margin.bottom;


    svg_7 = d3.select("#chart_altitude")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    svg_7.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', 100)
        .text(xLabel);



    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerHeight / 2)
        .attr('y', -60)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

    var xScale = d3.scaleTime();
    var yScale = d3.scaleLinear();

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickPadding(15)
        .tickSize(-innerHeight);



    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5)
        .tickPadding(15)
        .tickSize(-innerWidth);

    var row = d => {
        d.Timestamp = new Date(d.TimeStamp);
        d.GPSAltitude = +d.GPSAltitude;
        return d;
    };

    xScale
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    yScale
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(xValue(d)))
        .attr('cy', d => yScale(yValue(d)))
        .attr('fill-opacity', 0.6)
        .attr('r', 8);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
})








