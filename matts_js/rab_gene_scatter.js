

var g_data;

var margin = {top: 40, right: 45, bottom: 60, left: 60},
    width = 460 - margin.left - margin.right,
    height = 453 - margin.top - margin.bottom;

var xValue = function(d) { return d.condition;};
var x = d3.scalePoint().range([20, width-20])
var xAxis = d3.axisBottom()
        .scale(x);

var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

var tool = d3.select("body").append("div")
		 .attr("class", "tooltip")
		 .style("opacity", 0);
		
var svg = d3.select("div#rab_gene_scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
       .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
       
// read in data
     
d3.tsv("/matts_data/sig_genes.edgeR_counts.tsv", function(data) {
    
        data.forEach(function(d) {
        d.cpm = +d.cpm;
        });
        
    
    g_data = data;
	x.domain(["control","RHDV-1_12","RHDV-1_24","RHDV-2_12","RHDV-2_24"]);
    y.domain([0, d3.max(data, function(d) { return d.cpm; })]);

// add the x axis
    svg.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
       .selectAll("text")
	    .style("font-size", "12px")
		.style("font-family", "sans-serif")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
	
// add the y axis
    svg.append("g")
        .attr("class", "y_axis")
        .call(yAxis);
		
// y axis text label
	svg.append("text")
		.attr("transform", "rotate(-90)")
	    .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Counts per Million (cpm)");  

// now add the scatter points
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
        .attr("r", 5)
		.on("mouseover", function(d) {
			d3.select(this).classed("hover", true);
			tool.transition()
				.duration(0)
				.style("opacity", .9);
		tool	.html(d.sample)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			d3.select(this).classed("hover", false);
			tool.transition()
				.duration(0)
				.style("opacity", 0);
		});

		
// draw legend
  var legend = svg.selectAll(".legend")
      .data(["adult", "kitten"])
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored circles
  legend.append("circle")
      .attr("cx", width)
	  .attr("cy", 6)
      .attr("r", 5)
      .style("fill", function(d) { 
            if (d == "kitten") {
                return "steelblue";
            } else {
                return "red";
        }});

  // draw legend text
  legend.append("text")
      .attr("x", width + 8)
      .attr("y", 6)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d;})
		
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



