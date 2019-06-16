var context;
var movement;
var player;
var loop; 
var laser;
var IMAGE;
var Round = 0;
var enemy;
var EnemiesVal = 4;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 600;
context.canvas.width = 900;

laser = {
    height: 5,
    width: 5,
    x: 100,
    y: 100,
    xVel: 0,
    yVel: 0
};

enemy = {
    height: 32,
    width: 32,
    x: 0,
    y: 549
};

player = {
    height: 64,
    width: 64,
    jumping: true,
    x: context.canvas.width/2, //left of canvas
    xVel: 0,
    y: 0,
    yVel: 0,
    imgSRC: "SpaceElon Movement/SpaceElon Idle/Right/1.png",
    postSRC: ""
};

IMAGE = document.createElement("img");
post = document.createElement("img");
IMAGE.src = player.imgSRC;
//post.src = 

movement = {
    left: false,
    right: false,
    up: false, 
    space: false,
    keyListener: function(event){
        var keyState = (event.type == "keydown")?true:false; //checks the key
    
        switch(event.keyCode){
            case 37: //left key
                movement.left = keyState;
            break;
    
            case 38: //up key
                movement.up = keyState;
            break;
    
            case 39: //right key
                movement.right = keyState;
            break;
            
            case 32:
                movement.space = keyState;
            break;
        }
    }
};

loop = function(){
    if (movement.up && player.jumping == false){
        //jumping physics
        player.yVel -= 20;
        player.jumping = true;
    }

    if (movement.left){
        //left movement of player
        player.xVel -= 0.5;
    } 

    if (movement.right){
        //right movement of player
        player.xVel += 0.5;
    }
    
    if (movement.space){
        //ball movement
        laser.xVel += 0.5;
        laser.yVel += 0;
    }

    player.yVel += .8; //gravity
    player.x += player.xVel;
    player.y += player.yVel;
    laser.x += laser.xVel;
    laser.y += laser.yVel;
    player.xVel *= 0.9; //friction
    player.yVel *= 0.9; //friction
    laser.xVel *= 0.9; //friction
    laser.yVel *= 0.9;
    
    // Player doesn't fall after the floor line
    if (player.y > context.canvas.height - 16 - 56){
        player.jumping = false;
        player.y = context.canvas.height - 16 - 56;
        player.yVel = 0;
    }

    //If player is going off the left of the screen
    if (player.x < -16){
        player.x = -16;
    }
    //If player is going off the right of the screen
    else if (player.x > context.canvas.width - 56) {
        player.x = context.canvas.width - 56;
    }

    if (enemy.x > context.canvas.width / 2){
        enemy.x = -16;
        //alert("you lose");
    }
    
    /*if (laser.x == enemy.x){
       // alert("got em");
    }*/

    context.clearRect(0,0, context.canvas.width, context.canvas.height);          //Clear canvas
    context.beginPath();
    context.drawImage(IMAGE, player.x, player.y, player.width, player.height); //draw sprite
    
    enemy.x += 1;

    context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
    context.fill();

    context.rect(player.x, player.y, 10, 10);
    context.fill();

    context.moveTo(0, 584);
    context.lineTo(context.canvas.width, 584);
    context.stroke();
    context.lineWidth = "4";

    //Updates the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", movement.keyListener)
window.addEventListener("keyup", movement.keyListener);
window.requestAnimationFrame(loop);

/*function Niggaenemies()
{
    this.SPRITE = document.createElement("img");
    for(var i = 0; i < EnemiesVal; i++)
    {
        var tmp = getRandomInteger(0,2);
        switch(tmp)
        {
            case 0: 
                this.SPRITE.src = ""; //Enemy one
            break;
            case 1: 
                this.SPRITE.src = ""; //enemy 2 
            break;
            case 2: 
                this.SPRITE.src = ""; //enemy 3
            break;
        }
    }
    this.SPRITE.height = 64;
    this.SPRITE.width = 64;
}*/