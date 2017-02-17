

var g_data;

var margin = {top: 20, right: 20, bottom: 40, left: 30},
    width = 500 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var xValue = function(d) { return d.gene;};
var x = d3.scalePoint().range([20, width-20])
var xAxis = d3.axisBottom()
        .scale(x);

var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

var svg = d3.select("div#rab_gene_scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
       .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

            
// read in data
     
d3.tsv("/matts_data/melted.edgeR_counts.design.head", function(data) {
    
        data.forEach(function(d) {
        d.cpm = +d.cpm;
        });
        
    
    g_data = data;
    x.domain(data.map(function(d) { return d.condition; }));
    y.domain([0, d3.max(data, function(d) { return d.cpm; })]);

    svg.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      //.selectAll("text")
     //   .attr("y", 0)
      //  .attr("x", -9);
        //.attr("transform", "rotate(-45)")
        //.style("text-anchor", "end");

    svg.append("g")
        .attr("class", "y_axis")
        .call(yAxis);

    svg.selectAll("matts_bar")
        .data(data).enter()
        .filter(function(d) { return d.gene == "ENSOCUG00000000001"})
        .append("circle")
        .style("fill", function(d) { 
            if (d.age == "kitten") {
                return "steelblue";
            } else {
                return "red";
        }})
        .attr("class", "matts_bar")
        .attr("cx", function(d) { return x(d.condition); })
        .attr("cy", function(d) { return y(d.cpm); })
        .attr("r", 5);
});

function update_plot(gene_name){

    var filt_data = g_data.filter(function(d) { return d.gene == gene_name});
    
    y.domain([0, d3.max(filt_data, function(d) { return d.cpm; })]);
       
    // Select what we want to change
    var svg = d3.select("div#rab_gene_scatter");

    // Make the changes
    svg.selectAll(".matts_bar")
            .data(filt_data)
                .transition()
                .duration(1000)
                .attr("cy", function(d) { return y(d.cpm); });
    svg.select(".y_axis")
            .transition()
            .duration(1000)
            .call(yAxis);
}



