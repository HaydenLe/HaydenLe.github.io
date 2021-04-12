var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "bullet", "x": 1000, "y": groundY }, 
                { "type": "bullet", "x": 1200, "y": groundY }, 
                { "type": "bullet", "x": 1300, "y": groundY }, 
                { "type": "enemy", "x": 1000, "y": groundY - 50},
                { "type": "reward", "x": 2000, "y": groundY - 60}, 
            ] 
        };  

            for (var i = 0; i < levelData.gameItems.length; i++) {
                 obj = levelData.gameItems[i]; 
                 objX = obj.x; 
                 objY = obj.y; 
                 objType = obj.type; 

                if (objType === "sawblade") { 
                    createSawBlade(objX, objY);
                } 
                else if (objType === "bullet") { 
                    createBullet(objX, objY);
                }    
                 else if (objType === "enemy") {
                    createEnemy(objX, objY);
                }                  
                 else (objType === "reward") 
                    createReward(objX, objY);
            } 

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
          
        function createSawBlade(x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); 
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;  

        game.addGameItem(sawBladeHitZone);  

        var obstacleImage = draw.bitmap('img/sawblade.png');  
        obstacleImage.x = -25; 
        obstacleImage.y = -25;
       sawBladeHitZone.addChild(obstacleImage); 
        
    }
     //  createSawBlade(400, 220); 
       //createSawBlade(850, 220); 
      // createSawBlade(650, 340);  

      function createBullet(x, y){  
          var hitZoneSize = .04;
        var damageFromObstacle = 44;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); 
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;  

        game.addGameItem(sawBladeHitZone);  

        var obstacleImage = draw.bitmap('img/bullet4 (1).png');  
        obstacleImage.x = -.04; 
        obstacleImage.y = -.04; 
        obstacleImage.scaleX = .04; 
        obstacleImage.scaleY = .04;  
       sawBladeHitZone.addChild(obstacleImage);  
      }

      //createBullet(2444,244);
      

        function createEnemy(x,y) { 
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.bitmap('img/bullet4 (1).png');  
        redSquare.x = -.04;
        redSquare.y = -.04; 
        redSquare.scaleX = .04;
        redSquare.scaleY = .04;
        enemy.addChild(redSquare);  
        enemy.x = x;
        enemy.y = y; 
        game.addGameItem(enemy); 
        enemy.velocityX = -14; 
        //enemy.rotationalVelocity = 10; 
        enemy.onPlayerCollision = function() {
            console.log('The bullets has hit Halle'); 
            game.onPlayerCollision = game.changeIntegrity(-44);   
            game.increaseScore(100);
            enemy.fadeOut();
        };  
             
        enemy.onProjectileCollision = function() { 
            console.log("Halle has hit the bullets...somehow"); 
            shrink()
        };
             };

       //createBullets(1400,groundY-10);
       //createBullets(800,groundY-100);
       //createBullets(1200,groundY-50);

        function createReward(x,y) { 
            var reward = game.createGameItem('reward',25);
            var greenSquare = draw.rect(25,25,'green');     
            greenSquare.x = -25;
            greenSquare.y = -25; 
            reward.addChild(greenSquare);  
            reward.x = x;
            reward.y = y;   
            game.addGameItem(reward);  
            reward.velocityX = -5; 
            reward.rotationalVelocity = 64; 
            reward.onPlayerCollision = function() {
             console.log('Halle got a reward'); 
             game.onPlayerCollision = game.changeIntegrity(10);  
             game.increaseScore(50);
             reward.shrink(); 
            };
        };
         //createReward(2200,groundY-50);

        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
