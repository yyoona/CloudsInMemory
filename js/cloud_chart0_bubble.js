var margin = { top: 60, right: 30, bottom: 60, left: 60 },
  width = innerWidth * 0.5 + margin.left + margin.right,
  height = innerHeight + margin.top + margin.bottom;



/////////////////////////////
/////////Chart_Day1//////////
////////////////////////////

// load csv data
// d3.csv("/Dataset/All_CloudType.csv").then(function (data) {


// var bar_width = 30;
// var margin = { top: 60, right: 100, bottom: 60, left: 100 },
//     canvas_width = innerWidth / 1.5 - margin.left - margin.right,
//     canvas_height = data.length * bar_width;

// var parsedData = data.map(function (row) {
//     row.CloudType = parseFloat(row.CloudType)
//     row.percent = parseFloat(row.percent)
//     return row;
// })


// var parsedData = data.map(function (row) {
//     row.percent = parseFloat(row.percent)
//     row.count = parseFloat(row.count)
//     return row;

// })


var json = {
   : [{ "CloudType": "Cumulus", "percent": "30.5", "count": "177" }, { "CloudType": "Stratocumulus", "percent": "13.6", "count": "79" }, { "CloudType": "Cirrocumulus", "percent": "12.1", "count": "70" }, { "CloudType": "Lacunosus", "percent": "11.9", "count": "69" }, { "CloudType": "Cirrus", "percent": "9.5", "count": "55" }, { "CloudType": "Undulatus", "percent": "5.2", "count": "30" }, { "CloudType": "Nimbostratus", "percent": "4.8", "count": "28" }, { "CloudType": "Altocumulus", "percent": "4.0", "count": "23" }, { "CloudType": "Cirrostratus", "percent": "2.4", "count": "14" }, { "CloudType": "Contrail", "percent": "1.6", "count": "9" }, { "CloudType": "Fibratus", "percent": "1.4", "count": "8" }, { "CloudType": "Horseshoe vortex", "percent": "0.7", "count": "4" }, { "CloudType": "Cavum", "percent": "0.3", "count": "2" }, { "CloudType": "Altostratus", "percent": "0.3", "count": "2" }, { "CloudType": "Pileus", "percent": "0.3", "count": "2" }, { "CloudType": "Vigra", "percent": "0.3", "count": "2" }, { "CloudType": "Mamma", "percent": "0.3", "count": "2" }, { "CloudType": "22-degree halo", "percent": "0.2", "count": "1" }, { "CloudType": "Iridescence", "percent": "0.2", "count": "1" }, { "CloudType": "Volutus", "percent": "0.2", "count": "1" }, { "CloudType": "Corona", "percent": "0.2", "count": "1" }]
}


svg_0.selectAll("circle")
  .data(data).enter()
  .append("circle")
  .attr("cx", function (d) { return d.percent })
  .attr("cy", function (d) { return d.percent })
  .attr("r", function (d) {
    return Math.sqrt(d.percent) / Math.PI
  })
  .attr("fill", " rgba(17, 114, 202,0.2)")
});

