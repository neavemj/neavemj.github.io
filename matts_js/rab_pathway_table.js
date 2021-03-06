var pathway_tabulate = function (data,columns) {
  var table = d3.select('div#rab_pathway_table').append('table')
          .attr("class", "table display tableSection")
          .attr("id", "rab_pathway_table_body")
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
  initialize_pathway_dataTable();
  return table;
  
};

var initialize_pathway_dataTable = function(){
	var d_table = $('#rab_pathway_table_body').DataTable( {
    "order": [[5, "asc"]],
	"pageLength": 50,
	"scrollY": "200px",
	"scrollCollapse": false
	});
 
 $(window).bind('resize', function() {
	 d_table.columns.adjust();
 });
 
$('#rab_pathway_table_body tbody').on( 'click', 'tr', function () {
	var pathway_name = $(this).closest('tr').children().first().text();
    update_barcode(pathway_name);
	if ( $(this).hasClass('selected') ) {
		    $(this).removeClass('selected');
		}
	else {
		    d_table.$('tr.selected').removeClass('selected');
		    $(this).addClass('selected');
	}		
	});
};
