(function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time');
        data.addRows(5);
        data.setCell(0, 0, 'John');
        data.setCell(0, 1, 10000, '$10,000');
        data.setCell(0, 2, true);
        data.setCell(1, 0, 'Mary');
        data.setCell(1, 1, 25000, '$25,000');
        data.setCell(1, 2, true);
        data.setCell(2, 0, 'Steve');
        data.setCell(2, 1, 8000, '$8,000');
        data.setCell(2, 2, false);
        data.setCell(3, 0, 'Ellen');
        data.setCell(3, 1, 20000, '$20,000');
        data.setCell(3, 2, true);
        data.setCell(4, 0, 'Mike');
        data.setCell(4, 1, 12000, '$12,000');
        data.setCell(4, 2, false);
      
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      
        google.visualization.events.addListener(table, 'select', function() {
          var row = table.getSelection()[0].row;
          alert('You selected ' + data.getValue(row, 0));
        });
      }
    
)();
