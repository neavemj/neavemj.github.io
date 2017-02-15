var tabulate = function (data,columns) {
  var table = d3.select('div#rab-table').append('table')
          .attr("class", "table display tableSection")
          .attr("id", "rab-table-body")
        var thead = table.append('thead')
        var tbody = table.append('tbody')

        thead.append('tr')
          .selectAll('th')
            .data(columns)
            .enter()
          .append('th')
            .text(function (d) { return d })

        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
          .append('tr')

        var cells = rows.selectAll('td')
            .data(function(row) {
                return columns.map(function (column) {
                        return { column: column, value: row[column] }
              })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })
  return table;
}

d3.tsv('/matts_data/rab_gene_annots_100.tsv',function (data) {
        var columns = ["Gene ID", "Description"]
        tabulate(data,columns)
})
