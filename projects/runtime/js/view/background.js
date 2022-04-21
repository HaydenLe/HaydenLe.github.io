var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE: 
        //SteelBallRun is var tree
        var SteelBallRun; 
        //D4C_LoveTrainBarrier is var buildings
        var D4C_LoveTrainBarrier = [];   
        var HahaFebruary; 
        var DirtyDeedsDoneDirtCheap; 
        var Tusk_Act4;
        var RoundAbout;
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth + 5, groundY,'#b5d6e0');   
            background.addChild(backgroundFill); 

          
            // TODO: 3 - Add a moon and starfield

          //var moon = draw.bitmap('img/moon.png');
            //moon.x = 850;
            //moon.y = 30;
            //moon.scaleX = 0.5;
            //moon.scaleY = 0.5;
            //background.addChild(moon);

            //var circle;  
            //for(var i = 0; i < 100; i++) {
                //var circle = draw.circle(10,'yellow','orange',2);
                //circle.x = canvasWidth*Math.random();
                //circle.y = groundY*Math.random();
                //background.addChild(circle); 
           // } 


            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why? 

            HahaFebruary = draw.bitmap('img/HahaFeb.png'); 
                HahaFebruary.x = 1210; 
                HahaFebruary.y = 32; 
                background.addChild(HahaFebruary); 
                HahaFebruary.scaleX = 0.14; 
                HahaFebruary.scaleY = 0.14;  

            DirtyDeedsDoneDirtCheap = draw.bitmap('img/D4C.png'); 
                DirtyDeedsDoneDirtCheap.x = 1110; 
                DirtyDeedsDoneDirtCheap.y = 47; 
                background.addChild(DirtyDeedsDoneDirtCheap); 
                DirtyDeedsDoneDirtCheap.scaleX = 0.12; 
                DirtyDeedsDoneDirtCheap.scaleY = 0.12;  

            for(var i=0;i<20;++i) {
            //var D4CHeight = Math.floor((Math.random() * 365) + 150); 
            var D4CHeight = 1000
            var D4C_LoveTrain = draw.rect(5,D4CHeight,'yellow','orange',2);
            D4C_LoveTrain.x = 200*i;
            D4C_LoveTrain.y = groundY-D4CHeight;
            background.addChild(D4C_LoveTrain);
            D4C_LoveTrainBarrier.push(D4C_LoveTrain);
                } 


             Tusk_Act4 = draw.bitmap('img/BallBreaker.png'); 
                Tusk_Act4.x = 10; 
                Tusk_Act4.y = 232; 
                background.addChild(Tusk_Act4); 
                Tusk_Act4.scaleX = 0.25; 
                Tusk_Act4.scaleY = 0.25;   

                RoundAbout = draw.bitmap('img/RoundAbout.png'); 
                RoundAbout.x = 5; 
                RoundAbout.y = 600;
                background.addChild(RoundAbout); 
                RoundAbout.scaleX = .1; 
                RoundAbout.scaleY = .1;

            // TODO 4: Part 1 - Add a tree
            SteelBallRun = draw.bitmap('img/SteelBallRun.png');
                SteelBallRun.x = 700;
                SteelBallRun.y = 337; 
                SteelBallRun.scaleX = 0.5;
                SteelBallRun.scaleY = 0.5;
                background.addChild(SteelBallRun);
            }  
 
         

        // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
           SteelBallRun.x = SteelBallRun.x - 1;

            if(SteelBallRun.x < -1500) {
             SteelBallRun.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax
           for(var i = 0; i < D4C_LoveTrainBarrier.length; i++){ 
                    var D4C_LoveTrain = D4C_LoveTrainBarrier[i]; 
            
                D4C_LoveTrain.x = D4C_LoveTrain.x - 1.7 
            if(D4C_LoveTrain.x < -200) {
             D4C_LoveTrain.x = canvasWidth;
            }
                }   
              
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    }; 

};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
