/***************
RANDOM REQUEST
***************/

// random click event
$("#random").click(function() {
	window.open('https://en.wikipedia.org/wiki/Special:Random');
});



/***************
SEARCH REQUEST
***************/

//AJAX request
function ajax(keyword) { 
	
	$.ajax({ 
		url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
		dataType: "jsonp",
		success: function(response) {
			if (response.query.searchinfo.totalhits === 0) {
				showError(keyword);
			} else {
				showResults(response);
			}
		},
		error: function () {
			alert("Error retrieving search results, please refresh the page");
		}
	});
}


function showResults(search) {

	//APPEND RESULT
	for (var i = 0; i <= 9; i++) {
		$(".result").append("<div class='result-list result-" + i + "'>" + "<span class='result-title title-" + i + "'></span>" + "<br>" +"<span class='result-snippet snippet-" + i + "'></span>" + "<br>" + "<span class='result-metadata metadata-" + i + "'></span>" + "</div>" );
	}


	// FOR LOOP FOR RESULT
	for (var m = 0; m <= 9; m++) {
		var title = search.query.search[m].title;
		var url = title.replace(/ /g, "_");
		var timestamp = search.query.search[m].timestamp;
		timestamp = new Date(timestamp);
		$(".title-" + m).html("<a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + search.query.search[m].title + "</a>");
		$(".snippet-" + m).html(search.query.search[m].snippet);
		$(".metadata-" + m).html((search.query.search[m].size/1000).toFixed(0) + "kb (" + search.query.search[m].wordcount + " words) - " + timestamp);
	}
}


function showError(keyword) {
	$(".result").append( "<div class='error'> <p>Your search <span class='keyword'>" + keyword + "</span> did not match any documents.</p> <p>Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div> ");
}



$("#search").click(function(event) {
	event.preventDefault();
	var keyword = $(".search_text").val();

	if (keyword !== "") {
		$(".search_text").val(keyword);
		$(".search_text").val("");
		ajax(keyword);
	} else {
		alert("Enter a keyword into the search box");
	}
	
});

  
//Key press enter on text area..  
	$("#search_text").keypress(function(e) {
    if(e.which == 13) {
    	$("#search").click();
    }
	}); //end enter function



