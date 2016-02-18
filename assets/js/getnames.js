console.log("GET NAMES!");

var JSONURL = 'https://spreadsheets.google.com/feeds/list/1T4dUaCJg1zNCKWtzVCcSw0-G3sYZ2Lez8EjnuKgYtlA/1/public/basic?alt=json'
function callback(data){
    var rows = [];
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.title = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }
    
    var raw = document.createElement('p');
	//console.log(rows);
    raw.innerText = JSON.stringify(rows);
    //console.log(raw);
	return rows;
}

$(document).ready(function(){
	
	console.log("DO AJAX");
  var data_array; 
  var src; 
    
    $.ajax({
        url:JSONURL,
        success: function(data){
		    console.log("success");
            data_array = callback(data);
			      console.log(data_array);
            console.log("MAP!");
            src =  $.map(data_array, function (el) {
                return { 
                    label: el.title,
                    value: el.total
                };
            });
            console.log("MAPPED");
            console.log(src);
            
            $("#name").autocomplete({
                source: src,
				select: function (event, ui) {
					var label = ui.item.label;
					var value = ui.item.value;
					
					console.log("LABEL"+label + "VAL"+value);
				   
				  this.value = label;
				  $('#rsvp-result').html("<p><h3>"+label+"</h3> Max Number of attendees is: "+value+"</p>");
				  $('#rsvp-result').data("family", label);
				  $('#rsvp-result').data("guests", value);
				  return false;
				}
            });
        },
		error: function(evt){
			console.log("ERROR");
			console.log(evt);
		}
    });

});

