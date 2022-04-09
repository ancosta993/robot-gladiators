
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less


var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"]
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(enemyName) {
   // Repeat and execute as long as the enemy is alive.
   while (enemyHealth > 0) {

// if player chooses to fight, then fight
   promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

      if (promptFight == "FIGHT" || promptFight == "fight") {

         // Subtract the value of playerAttack from the value of enemyHealth and use that result to update the value of enemyHealth variable 
         enemyHealth = enemyHealth - playerAttack;

         // Log a resulting message to the console so we know that it worked.

         console.log(
         playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
      );

         // check enemy's health
         if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
         } 
         else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
         }

         // Player gets attacked by the enemy. Player health is subtracted by enemy attack.

         playerHealth = playerHealth - enemyAttack;
         console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " still has " + playerHealth + " health left."
         )

         // check player's health

         if (playerHealth <= 0){
            window.alert(playerName + " has died!")
         }

         else {
            window.alert(playerName + " still has " + playerHealth + " health left");
         }

         
      }
      // If player chooses to skip 
      else if(promptFight == "SKIP" || promptFight == "skip") {
         // Confirm player want to skip 
         var confirmSkip = window.confirm("Are you sure you'd like yo quit?");
         // If yes (true), leave fight
         if (confirmSkip){
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
         // subtract money from playerMoney for skipping
            playerMoney = playerMoney -2;
         }
         // if no(false), ask question again by running fight() again
         else{
            fight();
         }
      }

      // if player inputs an invalid value
      else {
         window.alert("You need to choos a valid option. Try again!");
      }

   }

   


};

// fight();

for(var i =0; i<enemyNames.length;i++){
   var pickedEnemyName = enemyNames[i];
   enemyHealth = 50;
  fight(pickedEnemyName);
}