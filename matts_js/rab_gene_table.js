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
  initialize_dataTable();
  return table;
  
};

var initialize_dataTable = function(){
	var d_table = $('#rab-table-body').DataTable( {			
	"scrollY": "350px",
	"scrollCollapse": false			
	});
 
$('#rab-table-body tbody').on( 'click', 'tr', function () {
	var gene_name = $(this).closest('tr').children().first().text();
    update_plot(gene_name);
	if ( $(this).hasClass('selected') ) {
		    $(this).removeClass('selected');
		}
	else {
		    d_table.$('tr.selected').removeClass('selected');
		    $(this).addClass('selected');
	}		
	});
};
