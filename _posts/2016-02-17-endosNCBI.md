---
title: "Programmatically calculating the amount of genetic information available in GenBank for a particular organism"
author: "Matthew J. Neave"
date: "Febuary 17, 2016"
tags: [bioinformatics, python]
---

Let's say you're beginning a new project on an organism you haven't worked with before. 
You might be interested to find out how many studies have previously used this species, and how much of its genetic information is available on NCBI's GenBank.
You could jump on the NCBI website and do a search for the species and get a pretty rough idea of what's available, but this could quickly become laborious and it would not be easy to quantify.

We wanted to do an analysis like this for the folowing paper: Neave, M.J., Apprill, A., Ferrier-Pages, C., Voolstra, C.R. Diversity and function of prevalent symbiotic marine bacteria in the genus <i>Endozoicomonas</i>, published in <i>Applied Microbiology and Biotechnology.</i>
A pdf of this paper and other related code is available under [publications.](../publications)

The genus <i>Endozoicomonas</i> was only described in 2007 and we wanted to see the scientific popularity of the genus since then, i.e., how many papers were being published and how much genetic information was being gathered, relating to the <i>Endozoicomonas</i>.
This code was used to produce Figure 1 in the paper:

![endo_ncbi](https://github.com/neavemj/neavemj.github.io/blob/master/_posts/endo_review/endo_data.png/?raw=true)

