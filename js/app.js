
var numberToGuess = 0;
var guessCount = 0;

$(document).ready(function(){
	
	

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	//Generate new random number at initial page load
  	generateNewRandomNumber();

  	//Code for new game link click
  	$('.new').on('click', function(){
  		newGame(); //create a new game
  	});

  	$('#submitGuess').submit(function(e) {
  		e.preventDefault();
  		var inputVal = $('#userGuess').val();
  		if(isNaN(inputVal) == true)
  		{
  			$('#feedback').text("Enter a number!");
  		}
  		else
  		{
  			$('#feedback').text("Make your Guess!");
  			makeGuess(inputVal);
		}

		$('#userGuess').val(''); //Clear out the form input
		$('#userGuess').focus(); //Return focus to the input for better usability
  	});

  	console.log(numberToGuess);
});

//Function to call once a valid guess number is determined
function makeGuess(guessValue) {
	//$('body').css('background-color','blue');
	var listHTML = '<li>' +  guessValue +  '</li>'; 
	$('#guessList').prepend(listHTML); //Prepend list element to list
	incrementGuessCount();
	var difference;

	//If the user's guess is greater than the random number
	if(numberToGuess < guessValue)
	{
		console.log("Number greater");
		//Get the difference between the guess value and random number
		difference = guessValue - numberToGuess;
		hotOrCold(difference);

	}
	//If the user's guess is less than the random number 
	else if (numberToGuess > guessValue)
	{
		console.log("Number less");
		//Get the difference between the random number and the guess value
		difference = numberToGuess - guessValue;
		hotOrCold(difference);
	}
	//If they actually guess the number, they win!
	else
	{
		console.log("You got it!");
	}
}

//Function to determine hot-cold amount
function hotOrCold(diff) {
	if(diff <= 10)
		{
			//hot
			console.log("Hot");
		}
		else if(diff >= 11 && diff <= 20)
		{
			//warm
			console.log("Warm");
		}
		else if(diff >= 21 && diff <= 30)
		{
			//cool
			console.log("Cool");
		}
		else if(diff >= 31 && diff <= 40)
		{
			//cold
			console.log("Cold");
		}
		else if(diff >= 41)
		{
			//freezing cold
			console.log("Freezing cold");
		}
}

//Function to increment the guess counter
function incrementGuessCount() {
	guessCount++;
	$("#count").text(guessCount);
}

//Function to reset the guess counter
function resetGuessCount() {
	$("#count").text("0");
}

//Function to generate a new game
function newGame() {

	generateNewRandomNumber();
	resetGuessCount();
	$('li').remove();
	console.log(numberToGuess);

}

//Function to set a new random number
function generateNewRandomNumber() {

	var newRandom = Math.floor((Math.random() * 100) + 1);
	numberToGuess = newRandom;

}

