

var bar_svg = d3.select("div#bar_example")
	.append("svg")
	.attr("width", '400px')
	.attr("height", '350px')

var bar_data = [4, 8, 15, 16, 23, 32]

bar_svg.selectAll(".bar")
	.data(bar_data)
      .enter().append("rect")
	.attr("class", "bar")
	.attr("x", 0)
	.attr("width", function(d) { return d * 10; })
	.attr("y", function(d, i) { return i * 51; })
	.attr("height", 50);

bar_svg.selectAll(".bartext")
	.data(bar_data)
	.enter().append("text")
	.attr("class", "bartext")
	.attr("fill", "white")
	.attr("x", function(d) { return (d * 10) - 30; })
	.attr("y", function(d, i) { return (i * 51) + 30; })
	.text(function(d) { return d; });
    