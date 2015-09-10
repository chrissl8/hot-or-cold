/*
HOT or COLD Number Guessing Game
By Chris Slaight, 2015
-app.js main JavaScript/jQuery logic for application
*/

//Declare global variables for current random number and current guess count
var numberToGuess = 0; //Variable to store current random number
var guessCount = 0; //Variable to store current count of guesses

//On document load, execute the following
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	//Call below function to generate new random number at initial page load
  	generateNewRandomNumber();

  	//Event handling code for new game link
  	$('.new').on('click touchstart', function(){
  		newGame(); //create a new game through below function
  	});

  	//On Submit event handling code for guess submission
  	$('#submitGuess').submit(function(e) {

  		e.preventDefault(); //Prevents the page from refreshing
  		var inputVal = $('#userGuess').val(); //Get user input
  		if(inputVal == "new") //New game easter egg because I'm lazy lol
  		{
  			newGame(); //Call below newGame function
  		}
  		else if(isNaN(inputVal) == true) //Validate input's numeric requirement
  		{
  			$('#feedback').text("Enter a number!"); //Tell user to enter a number
  			$('h2').css('background-color','#05C774'); //Reset H2 background color
  		}
  		else if(inputVal < 1 || inputVal > 100) //Validate input's numeric range
  		{
  			$('#feedback').text("Must be between 1 and 100!"); //Tell user number must be between 1 and 100
  			$('h2').css('background-color','#05C774'); //Reset H2 background color
  		}
  		else //Finally once all validation checks out
  		{
  			$('#feedback').text("Make your Guess!"); //Reset H2 text for good measure
  			makeGuess(inputVal); //Send input value to below makeGuess function
		}

		$('#userGuess').val(''); //Clear out the form input
		$('#userGuess').focus(); //Return focus to the input for better usability
  	});

  	//console.log(numberToGuess);
});

//Function to call once a valid guess number is determined
function makeGuess(guessValue) {

	var listHTML = '<li>' +  guessValue +  '</li>'; //Build list element for guess
	$('#guessList').prepend(listHTML); //Prepend list element to guess list
	incrementGuessCount(); //Increment guess count with below function
	var difference; //Define variable to hold the difference between the random number and guess
	var isGreater; //Define boolean var for too low/too high functionality

	//If the user's guess is greater than the random number
	if(numberToGuess < guessValue)
	{
		//console.log("Number greater");
		difference = guessValue - numberToGuess; //Get the difference between the guess value and random number
		isGreater = true; //Set isGreater flag to true
		hotOrCold(difference, isGreater); //Pass the information to be processed in the hotOrCold function below

	}
	//If the user's guess is less than the random number 
	else if (numberToGuess > guessValue)
	{
		console.log("Number less");
		//Get the difference between the random number and the guess value
		difference = numberToGuess - guessValue; //Get the difference between the random number and guess value
		isGreater = false; //Set isGreater flag to false
		hotOrCold(difference, isGreater); //Pass the information to be processed in the hotOrCold function below
	}
	//If they actually guess the number, they win!
	else
	{
		$('#feedback').text(numberToGuess + " is correct, you win!!"); //Tell the user their winning number in the H2 element
		$('h2').css('background-color','red'); //Set H2 element color to red
		$('body').css('background-image', 'url(images/bg_fireworks.jpg)'); //Woo fireworks for the winner
		//console.log("You got it!");
	}
}

//Function to determine hot-cold amount
function hotOrCold(diff, isGreater) //Takes two args, the diff amount and boolean for too high or too low
{
	if(isGreater == true) //If the guess is greater than the number
	{
		if(diff <= 2) //If the guess is 2 or less away
			{
				//User is considered On Fire
				$('#feedback').text("Too high, on fire!!"); //Set H2 text as such
				$('h2').css('background-color','#EC4431'); //Set BG color of response H2
				console.log("On fire");	
			}
		else if(diff >= 3 && diff <= 5) //If the guess is between 3 and 5 away
			{
				//User is considered burning hot
				$('#feedback').text("Too high, burning hot!"); //Set H2 text as such
				$('h2').css('background-color','#EE512A'); //Set BG color of response H2
				//console.log("Burning Hot");
			}
		else if(diff >= 6 && diff <= 10) //If the guess is between 6 and 10 away
			{
				//User is considered hot
				$('#feedback').text("Too high, hot!"); //Set H2 text as such
				$('h2').css('background-color','#EC8631'); //Set BG color of response H2
				//console.log("Hot!");
			}
		else if(diff >= 11 && diff <= 20) //If the guess is between 11 and 20 away
			{
				//User is considered warm
				$('#feedback').text("Too high, warm!"); //Set H2 text as such
				$('h2').css('background-color','#DFC52D'); //Set BG color of response H2
				//console.log("Warm");
			}
		else if(diff >= 21 && diff <= 30) //If the guess is between 21 and 30 away
			{
				//User is considered cool
				$('#feedback').text("Too high, cool!"); //Set H2 text as such
				$('h2').css('background-color','#df2be1'); //Set BG color of response H2
				//console.log("Cool");
			}
		else if(diff >= 31 && diff <= 40) //If the guess is between 31 and 40 away
			{
				//User is considered cold
				$('#feedback').text("Too high, cold!"); //Set H2 text as such
				$('h2').css('background-color','#2B93E1'); //Set BG color of response H2
				//console.log("Cold");
			}
		else if(diff >= 41) //If the guess is 41 or more away
			{
				//User is considered freezing cold
				$('#feedback').text("Too high, freezing cold!"); //Set H2 text as such
				$('h2').css('background-color','#2b40e1'); //Set BG color of response H2
				//console.log("Freezing cold");
			}
	}
	else if(isGreater == false) //If the guess is less than the number
	{
		if(diff <= 2) //If the guess is 2 or less away
			{
				//User is considered On Fire
				$('#feedback').text("Too low, on fire!!"); //Set H2 text as such
				$('h2').css('background-color','#EC4431'); //Set BG color of response H2
				console.log("On fire");	
			}
		else if(diff >= 3 && diff <= 5) //If the guess is between 3 and 5 away
			{
				//User is considered burning hot
				$('#feedback').text("Too low, burning hot!"); //Set H2 text as such
				$('h2').css('background-color','#EE512A'); //Set BG color of response H2
				//console.log("Burning Hot");
			}
		else if(diff >= 6 && diff <= 10) //If the guess is between 6 and 10 away
			{
				//User is considered hot
				$('#feedback').text("Too low, hot!"); //Set H2 text as such
				$('h2').css('background-color','#EC8631'); //Set BG color of response H2
				//console.log("Hot!");
			}
		else if(diff >= 11 && diff <= 20) //If the guess is between 11 and 20 away
			{
				//User is considered warm
				$('#feedback').text("Too low, warm!"); //Set H2 text as such
				$('h2').css('background-color','#DFC52D'); //Set BG color of response H2
				//console.log("Warm");
			}
		else if(diff >= 21 && diff <= 30) //If the guess is between 21 and 30 away
			{
				//User is considered cool
				$('#feedback').text("Too low, cool!"); //Set H2 text as such
				$('h2').css('background-color','#df2be1'); //Set BG color of response H2
				//console.log("Cool");
			}
		else if(diff >= 31 && diff <= 40) //If the guess is between 31 and 40 away
			{
				//User is considered cold
				$('#feedback').text("Too low, cold!"); //Set H2 text as such
				$('h2').css('background-color','#2B93E1'); //Set BG color of response H2
				//console.log("Cold");
			}
		else if(diff >= 41) //If the guess is 41 or more away
			{
				//User is considered freezing cold
				$('#feedback').text("Too low, freezing cold!"); //Set H2 text as such
				$('h2').css('background-color','#2b40e1'); //Set BG color of response H2
				//console.log("Freezing cold");
			}
	}
}

//Function to increment the guess counter
function incrementGuessCount() {

	guessCount++; //increment guessCount global variable by 1 when called
	$("#count").text(guessCount); //update #count span element with new value
}

//Function to reset the guess counter
function resetGuessCount() {

	guessCount = 0; //set guessCount global variable to 0
	$("#count").text("0"); //update #count span element to 0
}

//Function to generate a new game
function newGame() {

	$('h2').css('background-color','#05C774'); //Reset H2 background color to default
	$('body').css('background-image', 'url(images/bg_fire.jpg)'); //Reset background fire image
	generateNewRandomNumber(); //Generate a new random number with below function
	resetGuessCount(); //Call above function to reset guess count
	$('#feedback').text("Make your Guess!"); //reset H2 text to default
	$('#guessList li').remove(); //Remove all previous guess LI elements
	console.log(numberToGuess); //Intentionally uncommented, so you can cheat with Dev Tools
}

//Function to set a new random number
function generateNewRandomNumber() {

	var newRandom = Math.floor((Math.random() * 100) + 1); //Call Math.random and Math.floor to generate a random whole number between 1 and 100
	numberToGuess = newRandom; //Set global variable numberToGuess with this random value

}

