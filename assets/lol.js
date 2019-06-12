var leagueCharacter = [
  {
    name: "aatrox",
    image: "assets/image/Aatrox.png"
  },
  {
    name: "ahri",
    image: "assets/image/Ahri.png"
  },
  {
    name: "akali",
    image: "assets/image/Akali.png"
  },
  {
    name: "alistar",
    image: "assets/image/Alistar.png"
  }
]
// what
// Number of "_" to print
var numberOfBlanks = 0;
// Check if user guessed the name of character
var gussedCharacter = [];

// Array to split the character name into letters
var letters = [];

// Array to keep track of wrong guesses
var wrongGuess = [];
var lettersGuessed = "";

// Name of character being guessed
var character = "";
// Image of character being guessed
var characterImage = [];

// number trackers
var wins = 0;
var losses = 0;
var numberOfGuess = 15;

// directly our methods to HTLM.

// Method that prints number of guesses, correct guessed letters, wrong guess letter
function result() {
  document.getElementById("guessRemain").innerHTML = numberOfGuess;
  document.getElementById("characterName").innerHTML = gussedCharacter.join(" ");
  document.getElementById("wrongGuess").innerHTML = wrongGuess.join(" ");
}

// Method that prints an image of the character that is being guessed
function hint() {
  var imageHint = document.getElementById("hints");
  imageHint.src = characterImage;
}

// Method that updates the screen if user correctly guess the character
function win() {
  // Win counter is updated by +1
  wins++;
  document.getElementById("message").innerHTML = 'PENTA KIll';
  document.getElementById("winStreak").innerHTML = wins;
  // Restarts the game
  leagueGame.start();
}

// Method that updates the screen if user didn't guess the character
function lose() {
  losses++;
  document.getElementById("message").innerHTML = 'STOP FEEDING!';
  document.getElementById("loseStreak").innerHTML = losses;
  // Restarts the game
  leagueGame.start();
}

// The game that is being played
const leagueGame = {

  // Start Method
  start: function() {
    // Getting a random number based on the length of our array for number of characters
    var randonNumber = Math.floor(Math.random()*leagueCharacter.length);
    // Using the random number to get the name of character and linked image to user to guess
    character = leagueCharacter[randonNumber].name;
    characterImage = leagueCharacter[randonNumber].image;
    // Calling the hint at the start of the game.
    hint();
    // Splits the character name to indiviual letters
    letters = character.split("");
    numberOfBlanks = letters.length;
    // resetting number of guess to 15 at the start of the game;
    numberOfGuess = 15;
    wrongGuess = [];
    gussedCharacter = [];

    // prints the number of "_" based on character name length
    for (let i = 0; i < numberOfBlanks; i++) {
      gussedCharacter.push("_");
    }

    // Call the result method
    result();
  },

  // Check if letter is being guessed correctly
  checker: function(letter) {
    // Start and stop controller
     var letterInWord = false;
     // for loop to check if letter being guessed is in the name of the character's name
     for (var i = 0; i < numberOfBlanks; i++) {
       if (character[i] === letter) {
         letterInWord = true;
         gussedCharacter[j] = letter;
       }
     }
     if (letterInWord) {
       for (var j = 0; j < numberOfBlanks; j++) {
         if (character[j] === letter) {
           gussedCharacter[j] = letter;
         }
       }
    // if for loop fails, then letter being guessed isn't part of the character's name.
     } else {
       wrongGuess[letter];
       wrongGuess.push(letter);
       // subtracting number of guesses left by 1
       numberOfGuess--;
     }
   },

   // 
  finish: function() {
    // calling for result method
    result();
    // if statements: if user guessed the word, called for win method else calls for lose method.
    if (letters.toString() === gussedCharacter.toString()) {
      win();
    } else if (numberOfGuess === 0) {
      lose();
    }
  }
};

// Starting the game
leagueGame.start();

// Event listener
document.addEventListener("keyup", function(event) {
  // Storing the key that the user pressed and change it to lower case incase user types in caps lock.
  lettersGuessed = String.fromCharCode(event.which).toLowerCase();
  document.getElementById("message").innerHTML = 'Keep Trying Wood5'
  leagueGame.checker(lettersGuessed);
  leagueGame.finish();
});
