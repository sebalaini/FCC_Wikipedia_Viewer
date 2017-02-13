/***************
GENERAL
***************/

// random click event
$("#random").click(function() {
	window.open('https://en.wikipedia.org/wiki/Special:Random');
});

// search click event
$(function(){

  $("#search").click(function(){
		console.log("hi");
  });


  
//press enter on text area..  
	$("#search_text").keypress(function(e) {
    if(e.which == 13) {
    	$("#search").click();
    }
	}); //end enter function
  
}); //end search function