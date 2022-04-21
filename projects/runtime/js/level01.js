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
                //{ "type": "sawblade", "x": 100, "y": groundY - 50 },
                { "type": "Dino", "x": 1234, "y": groundY - 122 }, 
                { "type": "Dino", "x": 2234, "y": groundY - 137 }, 
                { "type": "Dino", "x": 3234, "y": groundY - 77 }, 
                { "type": "Dino", "x": 4567, "y": groundY - 77 }, 
                { "type": "Dino", "x": 5234, "y": groundY - 87 },
                { "type": "Dino", "x": 6567, "y": groundY - 77 }, 
                { "type": "Dino", "x": 7234, "y": groundY - 137 },
                { "type": "Dino", "x": 8351, "y": groundY - 77 }, 
                { "type": "Dino", "x": 11234, "y": groundY - 137 },
                { "type": "Dino", "x": 9391, "y": groundY - 77 },  
                { "type": "ScaryMonsters", "x": 750, "y": groundY - 22 }, 
                { "type": "ScaryMonsters", "x": 1750, "y": groundY - 22 }, 
                { "type": "ScaryMonsters", "x": 3750, "y": groundY - 22 }, 
                { "type": "ScaryMonsters", "x": 5750, "y": groundY - 22 }, 
                { "type": "ScaryMonsters", "x": 6575, "y": groundY - 22 },
                { "type": "ScaryMonsters", "x": 7790, "y": groundY - 22 }, 
                { "type": "ScaryMonsters", "x": 8875, "y": groundY - 22 },
                { "type": "ScaryMonsters", "x": 9080, "y": groundY - 22 },
                { "type": "ScaryMonsters", "x": 9999, "y": groundY - 22 },
                { "type": "TumbleWeed", "x": 1000, "y": groundY - 22}, 
                { "type": "TumbleWeed", "x": 2620, "y": groundY - 22},
                { "type": "TumbleWeed", "x": 3560, "y": groundY - 22}, 
                { "type": "TumbleWeed", "x": 4000, "y": groundY - 22},  
                { "type": "TumbleWeed", "x": 6856, "y": groundY - 22},
                { "type": "TumbleWeed", "x": 6978, "y": groundY - 22},  
                { "type": "TumbleWeed", "x": 8056, "y": groundY - 22},
                { "type": "TumbleWeed", "x": 9459, "y": groundY - 22},  
                { "type": "TumbleWeed", "x": 9756, "y": groundY - 22},  
                { "type": "TumbleWeed", "x": 9800, "y": groundY - 22},  
                { "type": "TumbleWeed", "x": 9900, "y": groundY - 22}, 
                { "type": "TumbleWeed", "x": 10000, "y": groundY - 22}, 
                { "type": "bullet", "x": 1000, "y": groundY - 92}, 
                { "type": "bullet", "x": 2222, "y": groundY - 92}, 
                { "type": "bullet", "x": 12500, "y": groundY - 112},
                { "type": "bullet", "x": 13400, "y": groundY - 137},  
                { "type": "bullet", "x": 3929, "y": groundY - 102},
                { "type": "bullet", "x": 19009, "y": groundY - 92}, 
                { "type": "bullet", "x": 14269, "y": groundY - 132},  
                { "type": "bullet", "x": 28269, "y": groundY - 102},
                { "type": "bullet", "x": 38690, "y": groundY - 82}, 
                { "type": "bullet", "x": 20067, "y": groundY - 72}, 
                { "type": "bullet", "x": 25269, "y": groundY - 102},
                { "type": "bullet", "x": 30000, "y": groundY - 92},
                //MISSSSTTTAAAAA 
                { "type": "bullet", "x": 30000, "y": groundY - 192}, 
                { "type": "bullet", "x": 30000, "y": groundY - 232},  
                { "type": "bullet", "x": 30000, "y": groundY - 202},
                { "type": "bullet", "x": 30000, "y": groundY - 182}, 
                { "type": "bullet", "x": 30000, "y": groundY - 172}, 
                { "type": "bullet", "x": 30000, "y": groundY - 200},
                //Out of Bullets
                { "type": "TubularBells", "x": 1500, "y": groundY - 72},
                { "type": "TubularBells", "x": 3500, "y": groundY - 57}, 
                { "type": "TubularBells", "x": 6590, "y": groundY - 32},
                { "type": "TubularBells", "x": 9920, "y": groundY - 82},
                { "type": "TubularBells", "x": 1000, "y": groundY - 37}, 
                { "type": "reward", "x": 2555, "y": groundY - 72},
                { "type": "reward", "x": 5009, "y": groundY - 62},  
                { "type": "reward", "x": 6824, "y": groundY - 72},  
                { "type": "reward", "x": 8824, "y": groundY - 77},  
                { "type": "reward", "x": 12000, "y": groundY - 72}, 
                { "type": "reward", "x": 12000, "y": groundY - 68}, 
                { "type": "reward", "x": 12000, "y": groundY - 70},
                { "type": "Za Hando", "x": 12345, "y": groundY - 73},
            ] 
        };  

            for (var i = 0; i < levelData.gameItems.length; i++) {
                 obj = levelData.gameItems[i]; 
                 objX = obj.x; 
                 objY = obj.y; 
                 objType = obj.type; 

                if (objType === "Dino") { 
                    createDino(objX, objY); 
                }  
                //else if (objType === "sawblade") { 
                    //createSawBlade(objX, objY);
                //} 

                 else if (objType === "ScaryMonsters") { 
                    createScaryMonsters(objX, objY);
                }

                else if (objType === "TumbleWeed") { 
                    createTumbleWeed(objX, objY);
                }       
                else if (objType === "TubularBells") { 
                    createTubularBells(objX, objY); 
                }            
                 else  if (objType === "reward") {
                    createReward(objX, objY); 
                }    
                else if (objType === "Za Hando") { 
                   createOiJosuke(objX, objY); 
                }
                 else if (objType === "bullet") 
                    createBullet(objX, objY);  
            }
            

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
          
        //function createSawBlade(x, y){
        //var hitZoneSize = 25;
        //var damageFromObstacle = 10;
        //var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); 
        //sawBladeHitZone.x = x;
        //sawBladeHitZone.y = y;  

        //game.addGameItem(sawBladeHitZone);  

        //var obstacleImage = draw.bitmap('img/sawblade.png');  
        //obstacleImage.x = -25; 
        //obstacleImage.y = -25;
       //sawBladeHitZone.addChild(obstacleImage); 
        //} 

    function createDino(x, y){
        var DinoZoneSize = 25;
        var damageFromObstacle = 10;
        var DinoHitZone = game.createObstacle(DinoZoneSize, damageFromObstacle); 
        DinoHitZone.x = x;
        DinoHitZone.y = y;  

        game.addGameItem(DinoHitZone);  

        var Dino = draw.bitmap('img/FlyDino.png');  
        Dino.x = -85; 
        Dino.y = -150; 
        Dino.scaleX = 0.25; 
        Dino.scaleY = 0.25;  
       DinoHitZone.addChild(Dino);  

        DinoHitZone.onProjectileCollision = function() { 
         console.log("Halle has hit the Flying Dinosaur"); 
          DinoHitZone.shrink();
        };
    } 

        function createScaryMonsters(x, y){
        var ScaryMonstersZoneSize = 50;
        var damageFromObstacle = 10;
        var ScaryMonstersHitZone = game.createObstacle(ScaryMonstersZoneSize, damageFromObstacle); 
        ScaryMonstersHitZone.x = x;
        ScaryMonstersHitZone.y = y;  

        game.addGameItem(ScaryMonstersHitZone);  

        var SuperCreeps = draw.bitmap('img/ScaryMonsters.png');  
        SuperCreeps.x = -70; 
        SuperCreeps.y = -60; 
        SuperCreeps.scaleX = 0.15; 
        SuperCreeps.scaleY = 0.15;  
       ScaryMonstersHitZone.addChild(SuperCreeps);  

        ScaryMonstersHitZone.onProjectileCollision = function() { 
         console.log("Halle has hit the WALK Dinosaur"); 
          ScaryMonstersHitZone.shrink();
        };
    } 

     //createSawBlade(400, 220); 
       //createSawBlade(850, 220); 
      // createSawBlade(650, 340);   

     function createOiJosuke(x, y){
        var TheHandZoneSize = 75; 
        var damageFromHand = 10000000000000000000000000000000000000000000000000000000000000000000000000000;
        var TheHandHitZone = game.createObstacle(TheHandZoneSize, damageFromHand); 
        TheHandHitZone.x = x;
        TheHandHitZone.y = y; 

        game.addGameItem(TheHandHitZone);  

        var OiJosuke = draw.bitmap('img/OiJosuke.png');  
        OiJosuke.x = -70; 
        OiJosuke.y = -150;
        OiJosuke.scaleX = .2; 
        OiJosuke.scaleY = .2;  
       TheHandHitZone.addChild(OiJosuke);  
        
        OiJosuke.onPlayerCollision = function() {
            console.log('Oi Josuke! I used『Za Hando』to erase this werid robot and now the player is gone! Aint that wacky?'); 
            game.onPlayerCollision = game.changeIntegrity(-10000000000000000000000);   
            game.increaseScore(1)  
        } 
    }


      function createTumbleWeed(x, y){  
        var damageFromObstacle = 2; 
        var hitZoneSize = 20;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); 
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;  
        sawBladeHitZone.velocityX = -5.5;
        game.addGameItem(sawBladeHitZone);  

        var obstacleImage = draw.bitmap('img/tumbleweed.png');  
        obstacleImage.x = -25; 
        obstacleImage.y = -45; 
        obstacleImage.scaleX = 0.1; 
        obstacleImage.scaleY = 0.1;  
       sawBladeHitZone.addChild(obstacleImage);  
      }

      //createBullet(2444,244);
      

        function createBullet(x,y) { 
        var bullet = game.createGameItem('bullet',0.4);
        var redSquare = draw.bitmap('img/mista.png');  
        redSquare.x = -.04;
        redSquare.y = -.04; 
        redSquare.scaleX = .04;
        redSquare.scaleY = .04;
        bullet.addChild(redSquare);  
        bullet.x = x;
        bullet.y = y; 
        game.addGameItem(bullet); 
        bullet.velocityX = -14; 
        //enemy.rotationalVelocity = 10; 
        bullet.onPlayerCollision = function() {
            console.log('The bullet has shot Halle'); 
            game.onPlayerCollision = game.changeIntegrity(-44);   
            game.increaseScore(100);
            bullet.fadeOut();
        };  
             
        bullet.onProjectileCollision = function() { 
            console.log("Halle has hit the bullet...somehow"); 
            bullet.shrink();
        };
             };

       //createBullets(1400,groundY-10);
       //createBullets(800,groundY-100); 
       //createBullets(1200,groundY-50);

       function createTubularBells(x,y) { 
        var Bells = game.createGameItem("TubularBells",30);
        var Tubular = draw.bitmap('img/Tubular Bells.png');  
        Tubular.x = 32;
        Tubular.y = 25; 
        Tubular.scaleX = -.1;
        Tubular.scaleY = -.1;
        Bells.addChild(Tubular);  
        Bells.x = x;
        Bells.y = y; 
        game.addGameItem(Bells); 
        Bells.velocityX = -6.6; 
        Bells.onPlayerCollision = function() {
            console.log('Halle got a funny looking balloon dog'); 
            game.onPlayerCollision = game.changeIntegrity(22);   
            game.increaseScore(25);
            Bells.fadeOut();
        };  
    };

        function createReward(x,y) { 
            var reward = game.createGameItem("RoundABout",40); 
            var PizzaMozzarella = draw.bitmap('img/BestSong.png');   
            PizzaMozzarella.x = -40;
            PizzaMozzarella.y = -40; 
            PizzaMozzarella.scaleX = .1; 
            PizzaMozzarella.scaleY = .1;  
            reward.addChild(PizzaMozzarella);  
            reward.x = x;
            reward.y = y;   
            game.addGameItem(reward);  
            reward.velocityX = -5; 
            reward.rotationalVelocity = 2004200520111890; 

            reward.onPlayerCollision = function() {
             console.log('Halle got a PizzaMozzarella PizzaMozzarella Rella Rella Rella'); 
             game.onPlayerCollision = game.changeIntegrity(44);  
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
