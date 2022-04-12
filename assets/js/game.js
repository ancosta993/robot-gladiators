
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var fightOrSkip = function(){
  // ask player if they'd like to fight or skip using fightOrSkip funciton
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");
  if (promptFight === '' || promptFight === null){
    window.alert("You need to provide a valid answer! Please try again.");

    return fightOrSkip();
  } 
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    // Confirm player want to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quite?");

    // if (yes) true, leave fight
    if (confirmSkip){
      window.alert(playerInfo.name + " had decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.playerMoney - 10;

      // return true if player wants to leave
      return true;
    }
  }
  return false;

}




var fight = function(enemy) {
  // repeat and execute as long as enemy-robot is alive
   while (playerInfo.health > 0 && enemy.health > 0) {
     if (fightOrSkip()) {
      //  if true, leave fight by breaking loop
      break;
     }
     // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
     var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
     enemy.health = Math.max(0, enemy.health - damage);
     console.log(
       playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
     );
 
     // check enemy's health
     if (enemy.health <= 0) {
       window.alert(enemy.name + ' has died!');
 
       // award player money for winning
       playerInfo.money = Math.max(0, playerInfo.money + 20);
       // leave while() loop since enemy is dead
       break;
     } else {
       window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
     }
 
     // remove players's health by subtracting the amount set in the enemy.attack variable
     var damage = randomNumber(enemy.attack - 3, enemy.attack);
     playerInfo.health = Math.max(0, playerInfo.health - damage);
     console.log(
       enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
     );
 
     // check player's health
     if (playerInfo.health <= 0) {
       window.alert(playerInfo.name + ' has died!');
       // leave while() loop if player is dead
       break;
     } else {
       window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
     }
   } // end of while loop
 }; // end of fight function

var startGame = function(){
  // Reset player stats
  playerInfo.reset();
  for (var i=0;i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        //  let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (1+i) );

        // pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        // reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

        // use debugger to pause script from running and check what's going on at that moment in the code
        // debugger;

        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemy.name parameter.
        fight(pickedEnemyObj);

        // if we are not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          var storeConfirm = window.prompt("The fight is over, visit the store before the next round?")

          // if yes, take them to the store() function
          if (storeConfirm) {
            shop();
          }
        }


    } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }

    // play again
  }  // for loop ends

  // After the loop ends, run this function.
  endGame();
};

// function to end the entire game

var endGame = function() {
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You know have a score of " + playerInfo.money + ".");
  }
  else{
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else{
    window.alert("Thank you for playing Robot Galdiators! Come back soon!");
  }


};


// start the game when the page loads

var shop = function(){
  // ask the player what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 2 for 'LEAVE'."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt){

    case 1:
      playerInfo.refillHealth();
      break;

    
    case 2:
      playerInfo.upgradeAttack();
      // do nothing, so function will end
      break;

    case 3:
      window.alert("Leaving the store.");
      breake;

    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      // call shop() again to force player to pick a valid option
      break;
  }

};

var randomNumber = function(min, max){
  var value = Math.floor(Math.random()* (max- min + 1))+min;

  return value;
}

// function to set name
var getPlayerName = function(){
  var name ="";
  while (name === ""||name === null){
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;

};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },

  refillHealth: function(){
    if (this.money >= 7){
      window.alert("Refilling player's health by 20 for 7 dollar.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!")
    }
  },

  upgradeAttack: function(){
    if (this.money >= 7){
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack+=6;
      this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  }

};


var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();