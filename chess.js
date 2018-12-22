var boardToggle = "White";

function generatePrompt() {
	var randomSquare = String.fromCharCode('a'.charCodeAt() + Math.floor(Math.random() * 8));
	randomSquare = randomSquare + Math.floor(Math.random() * 8 + 1);
	$("#prompt").text(randomSquare);
};

function showCoordinate(clickedId) {
	$("#" + clickedId).text(clickedId);
	if(clickedId == $("#prompt").text()) {
		$("#score").text(Number($("#score").text()) + 1);
		$("#" + clickedId).css("background-color", "green");
		setTimeout(
 			function() {
    			generatePrompt();
				clearSquares();
				setSquareColors();
  			}, 1000);
	} else {
		$("#score").text("0");
	};
};

function clearSquares() {
	$('td').text("");
};

function setSquareColors() {
	for(l=1; l<9; l++){
		var rowType = "whiteSquareFirst";
		if(l % 2 == 0) {
				rowType = "blackSquareFirst";

		};
		for(k=1; k<9; k++){
			if (boardToggle == "Black") {
				selector = "#" + String.fromCharCode('a'.charCodeAt() + 8 - k) + l;
			} else {
				selector = "#" + String.fromCharCode('a'.charCodeAt() + k - 1) + (9 - l);
			};
			if(k % 2 !== 0){
				if(rowType == "whiteSquareFirst"){
					$(selector).addClass("white");
					$(selector).css("background-color", "white");
				} else {
					$(selector).addClass("black");
					$(selector).css("background-color", "black");
				};
			};
			if(k % 2 == 0){
				if(rowType == "whiteSquareFirst"){
					$(selector).addClass("black");
					$(selector).css("background-color", "black");
				} else {
					$(selector).addClass("white");
					$(selector).css("background-color", "white");
				};
			};
		};
	};
};

function buildBoard() {
	if(boardToggle == "White") {
		$("#column1").html("");
		var content = "<table id='chessBoard'>"; 
	    for(j=1; j<9; j++){
	        content = content + "<tr>";
	        for(i=0; i<8; i++) {
	    	    content = content + "<td id='" + String.fromCharCode('a'.charCodeAt() + i) + (9 - j) + "'></td>";
	        };
	        content = content + "</tr>";
	    };
	    content = content + "</table>";
		$("#column1").html(content);
		$("#viewLabel").html("Playing as:<br>White");
		boardToggle = "Black";
	} else {
		$("#column1").html("");
		var content = "<table id='chessBoard'>"; 
	    for(j=1; j<9; j++){
	        content = content + "<tr>";
	        for(i=1; i<9; i++) {
	    	    content = content + "<td id='" + String.fromCharCode('a'.charCodeAt() + 8 - i) + j + "'></td>";
	        };
	        content = content + "</tr>";
	    };
	    content = content + "</table>";
		$("#column1").html(content);
		$("#viewLabel").html("Playing as:<br>Black");
		boardToggle = "White";
	};
	setSquareColors();
	$("td").click(function() {
		var clickedId = $(this).attr('id');
		showCoordinate(clickedId);
	});
};

$(document).ready(function(){
	buildBoard();
	$("#column2").append("<div id='promptDiv'><p id='prompt'>Prompt</p></div>");
	$("#column2").append("<button type='button' id='newPrompt'>New Square</button>");
	$("#column2").append("<div id='scoreDiv'><p id='score'>0</p></div>");
	$("#scoreDiv").append("<p id='scoreLabel'>Score</p>");
	$("#column2").append("<button type='button' id='flipBoard'>Flip Board</button>");
	$("#column2").append("<p id='viewLabel'>Playing as:<br>White</p>");
	$("#newPrompt").click(function() {
 		generatePrompt();
 		clearSquares();
	});
	$('#flipBoard').click(function() {
		buildBoard();
	});
	generatePrompt();
});