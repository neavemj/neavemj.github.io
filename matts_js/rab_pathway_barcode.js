
// global variable to store data
var b_data;

var b_margin = {top: 10, right: 10, bottom: 40, left: 10},
    b_width = 900 - b_margin.left - b_margin.right,
    b_height = 150 - b_margin.top - b_margin.bottom;

var b_x = d3.scaleLinear().range([10, b_width-10]);
var b_xAxis = d3.axisBottom()
        .scale(b_x)
        .ticks(10);

// tool tip 
var b_tool = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);
		
// main plot canvas		
var b_svg = d3.select("div#rab_pathway_barcode").append("svg")
        .attr("width", b_width + b_margin.left + b_margin.right)
        .attr("height", b_height + b_margin.top + b_margin.bottom)
        .append("g")
        .attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")");

// add the x axis
	b_svg.append("g")
		.attr("class", "x_axis")
		.attr("transform", "translate(0," + b_height + ")")
		.call(b_xAxis);

// x axis label
	b_svg.append("text")
		.attr("y", b_height + 35)
		.attr("x", ((b_width - b_margin.left)  / 2) - 35)
		.text("log fold change");
			  
// read in data

function load_barcode_data(p_selected_file){
	
d3.tsv(p_selected_file, function(f_data) {
	
	// convert logFC to integer
	f_data.forEach(function(d) {
		d.logFC = +d.logFC;
	});

	b_data = f_data;
	
});
};

function update_barcode(pathway){
	
	// filter the data for this particular pathway
	var b_filt = b_data.filter(function(d) { return d.go == pathway});
	
	b_x.domain([d3.min(b_filt, function(d) { return d.logFC; }), d3.max(b_filt, function(d) { return d.logFC; })]);
	
	// add color gradient for logFC
	b_svg.append("linearGradient")
      .attr("id", "log-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", "100%").attr("y2", 0)
    .selectAll("stop")
      .data([
        {offset: 0, color: "steelblue"},
        {offset: 3, color: "red"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });
	
	// select svg for changing and link the new pathway data
	var b_lines = b_svg.selectAll(".gene_lines")
		.data(b_filt, function(d) { return d.gene; });

	// make the 'update' changes, i.e. those that are not entering or exiting
	// UPDATE
	b_lines.transition().duration(1000).attr("x", function(d) { return b_x(d.logFC); });
	
	// add new lines from the enter selection
	// ENTER
	
	b_lines.enter()
			.append("rect")
			.attr("class", "gene_lines")
			.attr("width", '3px')
			.attr("y", '-10px')
			.attr("height", '100px')
			.style("fill", "url(#log-gradient")
			.on("mouseover", function(d) {
				d3.select(this).classed("hover", true);
				b_tool.transition()
					.duration(0)
					.style("opacity", .9);
				b_tool.html(d.gene)
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
				})
			.on("mouseout", function(d) {
				d3.select(this).classed("hover", false);
				b_tool.transition()
					.duration(0)
					.style("opacity", 0);
				})
			.on("click", function (d) {
				$('#mattsTabs a[href="#genes"]').tab('show');
				update_plot(d.gene);
				$('#current_gene_name').text(d.gene);
			})	
			.transition().duration(1000).attr("x", function(d) { return b_x(d.logFC); });

	// remove lines that are no longer needed from the exit selection
	// EXIT	
	b_lines.exit().transition().duration(500).style("opacity", 0).remove();
	
	// update the x axis info
	b_svg.select(".x_axis")
		.transition()
		.duration(1000)
		.call(b_xAxis);
		
};








