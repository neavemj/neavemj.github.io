var g_data;
var visible_column;

var margin = {top: 20, right: 20, bottom: 100, left: 80},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var xValue = function(d) { return d.gene;};
var x = d3.scalePoint().range([20, width-20])
var xAxis = d3.axisBottom()
        .scale(x);

var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

// setup fill color
//var cValue = function(d) { return d.sample;};
//    color = d3.scaleLinear.category10();

var svg = d3.select("div#rab-data").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
       .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// read in data

d3.tsv("../rabA130_K1.txt", function(data) {

        data.forEach(function(d) {
        d.count = +d.count;
        d.linear = +d.linear;
        console.log(d);
        });

    g_data = data;

    x.domain(data.map(function(d) { return d.gene; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    svg.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("y", 0)
        .attr("x", -9)
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("class", "y_axis")
        .call(yAxis);

    svg.selectAll("matts_bar")
        .data(data)
      .enter().append("circle")
      .style("fill", function(d) { return d.color; })
        .attr("class", "matts_bar")
        .attr("cx", function(d) { return x(d.gene); })
        .attr("cy", function(d) { return y(d.count); })
        .attr("r", 2.5);
    visible_column = "d.count";
});


function updateData() {
    y.domain([0, d3.max(g_data, function(d) { return d.linear; })]);

    // Select what we want to change
    var svg = d3.select("div#rab-data");

    // Make the changes
    svg.selectAll(".matts_bar")
            .data(g_data)
            .transition()
            .duration(1000)
            .attr("cy", function(d) {return y(d.linear); });
    svg.select(".y_axis")
            .transition()
            .duration(1000)
            .call(yAxis);
}


d3.select("#data_type").on("change", function(){
                updateData_toggle(this.value);
                });

function updateData_toggle(value) {

    // Select what we want to change
    var svg = d3.select("div#rab-data");

    // Make the changes depending on the selection
    // have to call y.domain before changing attributes
    // think because y(d.count) relies on correct domain

    if(value=="count"){
    y.domain([0, d3.max(g_data, function(d) { return d.count; })]);
    svg.selectAll(".matts_bar")
            .data(g_data)
            .transition()
            .duration(1000)
            .attr("cy", function(d) {return y(d.count); });

    svg.select(".y_axis")
            .transition()
            .duration(1000)
            .call(yAxis);

    } else if (value=="linear") {
    y.domain([0, d3.max(g_data, function(d) { return d.linear; })]);
    svg.selectAll(".matts_bar")
            .data(g_data)
            .transition()
            .duration(1000)
            .attr("cy", function(d) {return y(d.linear); });

    svg.select(".y_axis")
            .transition()
            .duration(1000)
            .call(yAxis);

    }
}

