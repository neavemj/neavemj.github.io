#!/usr/bin/env python

# script to change color theme of website using original template
# Matthew J. Neave

template = "template_styles.css"
output = open("styles.css", "w")

# using grep found 10 unique colors in css sheet

#222A30 dark background
#49B1F7 light blue heading
#666	gray
#696969 similar gray for text?
#A3BFC6 gray blue
#B3D1F0 lighter blue
#b6b6b6 gray
#e8e8e8 light gray
#EC4E3B red headings
#F0E7D5 yellowy gray
#fff	white

orig_colors = ["#222A30", "#49B1F7", "#666", "#696969", "#A3BFC6", "#B3D1F0", "#b6b6b6", "#e8e8e8", "#EC4E3B", "#F0E7D5", "#fff"]

lighter_theme = ["#fff", "#3498db", "#2c3e50", "#2c3e50", "#2c3e50", "#2c3e50", "#2c3e50", "#2c3e50", "#EC4E3B", "#2c3e50", "#2c3e50"]

with open(template) as f:
    for line in f:
	for index, color in enumerate(orig_colors):
	    if color in line:
		line = line.replace(color, lighter_theme[index])
		break
	output.write(line)


