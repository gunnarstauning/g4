var score = 0;
var enemiesOnScreen = 0;
var projectilesFired = 0;
var projectilesHit = 0;
var textDisplay1;
var textDisplay2;
var enemyStartingSpawnDelay = 250;
var enemyFinalSpawnDelay = 50;
var difficultyMulitplier = 0.98;
// Enemies
var enemies = [];
var enemySize = 30;
var enemySpeed = 2;
var rick = new Image();
rick.src = 'rickPic.jpg';
// Player related variables
var player;
var playerSize = 30;
var playerAccelSpeed = 0.4;
var playerTopSpeed = 4;
var moveX = 0;
var moveY = 0;
var leftKeyDown = 0;
var rightKeyDown = 0;
var upKeyDown = 0;
var downKeyDown = 0;
var dan = new Image();
dan.src = 'DanFace.png';
// Bullets
var projectiles = [];
var projectileSize = 15;
var projectileSpeed = 10;
var fireCooldownReset = 10;
var fireCooldown = 0;
var projectile = new Image();
projectile.src = 'F.png';
var bulletAudioUp = new Audio('bulletSound.mp3');
bulletAudioUp.volume = .5;
var bulletAudioDown = new Audio('bulletSound.mp3');
bulletAudioDown.volume = .5;
var bulletAudioLeft = new Audio('bulletSound.mp3');
bulletAudioLeft.volume = .5;
var bulletAudioRight = new Audio('bulletSound.mp3');
bulletAudioRight.volume = .5;
// Lose Stuff
var loseAudio = new Audio('neverGonnaGiveYouUp.mp3');
var bigRick = new Image();
bigRick.src = 'bigRick.png';
// Background
var backgroundImg = new Image();
backgroundImg.src = 'rickBackground.png';

//prevent screen movement during game
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Set up keypress listeners
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 65) {
        leftKeyDown = 1;
    }
    else if (event.keyCode == 68) {
        rightKeyDown = 1;
    }
    else if (event.keyCode == 87) {
        upKeyDown = 1;
    }
    else if (event.keyCode == 83) {
        downKeyDown = 1;
    }
    // Create new bullet
    else if (event.keyCode == 37 && fireCooldown <= 0) {
        newProjectile("projectileLeft");
        bulletAudioLeft.play();
    }
    else if (event.keyCode == 38 && fireCooldown <= 0) {
        newProjectile("projectileUp");
        bulletAudioUp.play();
    }
    else if (event.keyCode == 39 && fireCooldown <= 0) {
        newProjectile("projectileRight");
        bulletAudioRight.play();
    }
    else if (event.keyCode == 40 && fireCooldown <= 0) {
        newProjectile("projectileDown");
        bulletAudioDown.play();
    }
}, true);
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 65) {
        leftKeyDown = 0;
    }
    else if (event.keyCode == 68) {
        rightKeyDown = 0;
    }
    else if (event.keyCode == 87) {
        upKeyDown = 0;
    }
    else if (event.keyCode == 83) {
        downKeyDown = 0;
    }
}, true);

function newProjectile(type) {
    projectiles.push(new component(projectileSize, projectileSize, "#0E2222", player.x + player.width / 2 - projectileSize / 2, player.y + player.height / 2 - projectileSize / 2, type));
    fireCooldown = fireCooldownReset;
    projectilesFired++;
}

// Start game area and all the objects
function startGame() {
    player = new component(playerSize, playerSize, "#F7594E", 150, 150, "player");
    textDisplay1 = new component("30px", "Consolas", "#0E2222", 35, 50, "text");
    textDisplay2 = new component("30px", "Consolas", "#0E2222", 35, 90, "text");
    textDisplay1.text = " ";
    textDisplay2.text = " ";
    gameCanvas.start();
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 720;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[11]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 17);
        
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(backgroundImg, 0, 0);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = gameCanvas.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = '#96bbbb';
            ctx.fillText(this.text, this.x, this.y);
        }
        else if(this.type == "enemy"){
            ctx.drawImage(rick, this.x, this.y);
        }
        else if(this.type == "player"){
            ctx.drawImage(dan, this.x, this.y);
        }
        else{
            ctx.drawImage(projectile, this.x, this.y);
        }
    }

    // Detect collision with an object
    this.crashWith = function (otherObj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherObj.x;
        var otherright = otherObj.x + (otherObj.width);
        var othertop = otherObj.y;
        var otherbottom = otherObj.y + (otherObj.height);
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        } else {
            var crash = true;
        }
        return crash;
    }
    // Push an object away from another one
    this.pushObject = function (otherObj) {
        var pushMultiplier = 0.7;
        var xPush = 0;
        var yPush = 0;
        var myX = this.x + (this.width / 2);
        var myY = this.y + (this.height / 2);
        var otherX = otherObj.x + (otherObj.width / 2);
        var otherY = otherObj.y + (otherObj.height / 2);
        var xDif = myX - otherX;
        var yDif = myY - otherY;
        if (this.type == "projectileLeft" && xDif > 0) {
            xPush = xDif;
        }
        if (this.type == "projectileRight" && xDif < 0) {
            xPush = xDif;
        }
        if (this.type == "projectileUp" && yDif > 0) {
            yPush = yDif;
        }
        if (this.type == "projectileDown" && yDif < 0) {
            yPush = yDif;
        }
        otherObj.x -= xPush * pushMultiplier;
        otherObj.y -= yPush * pushMultiplier;
    }
}

function flashMessage(message) {
    textDisplay2.text = message;
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    // Quit game with return if the player collides with an enemy
    for (i = 0; i < enemies.length; i++) {
        if (player.crashWith(enemies[i])) {
            lose();
            return;
        }
    }
    // Push enemies if they make contact with a projectile
    for (i = 0; i < enemies.length; i++) {
        for (p = 0; p < projectiles.length; p++) {
            if (enemies[i].crashWith(projectiles[p])) {
                projectilesHit++;
                projectiles[p].pushObject(enemies[i]);
            }
        }
    }
    gameCanvas.clear();
    gameCanvas.frameNo++;

    if (gameCanvas.frameNo == 50) {
        flashMessage("MOVE WITH WASD");
    }
    if (gameCanvas.frameNo == 220) {
        flashMessage(" ");
    }
    if (gameCanvas.frameNo == 260) {
        flashMessage("FIRE BULLETS WITH ARROW KEYS");
    }
    if (gameCanvas.frameNo == 480) {
        flashMessage(" ");
    }
    if (gameCanvas.frameNo > 500) {
        textDisplay1.text = "Time alive: " + score;
    }


    // Move player
    if (leftKeyDown == 1) {
        moveX -= playerAccelSpeed;
    }
    if (rightKeyDown == 1) {
        moveX += playerAccelSpeed;
    }
    if (upKeyDown == 1) {
        moveY -= playerAccelSpeed;
    }
    if (downKeyDown == 1) {
        moveY += playerAccelSpeed;
    }
    // Stop the player from going too fast
    if (moveX > playerTopSpeed) {
        moveX = playerTopSpeed;
    }
    if (moveX < -playerTopSpeed) {
        moveX = -playerTopSpeed;
    }
    if (moveY > playerTopSpeed) {
        moveY = playerTopSpeed;
    }
    if (moveY < -playerTopSpeed) {
        moveY = -playerTopSpeed;
    }
    // Decellerate when keys are released
    if (leftKeyDown == 0 && rightKeyDown == 0) {
        if (moveX > 0)
            moveX -= playerAccelSpeed;
        if (moveX < 0)
            moveX += playerAccelSpeed;
    }
    if (upKeyDown == 0 && downKeyDown == 0) {
        if (moveY > 0)
            moveY -= playerAccelSpeed;
        if (moveY < 0)
            moveY += playerAccelSpeed;
    }
    if (moveX < playerAccelSpeed && moveX > -playerAccelSpeed) moveX = 0;
    if (moveY < playerAccelSpeed && moveY > -playerAccelSpeed) moveY = 0;
    player.x += moveX;
    player.y += moveY;

    // Create a new enemy 
    if (gameCanvas.frameNo == 100 || everyinterval(enemyFinalSpawnDelay + Math.floor(enemyStartingSpawnDelay))) {

        // Pick one of the 4 sides at random to spawn at.
        y = Math.random() * gameCanvas.canvas.height;
        var sideToSpawn = Math.random();
        if (sideToSpawn >= 0.00 && sideToSpawn < 0.25) { // left side
            x = -50;
            y = Math.random() * gameCanvas.canvas.height;
        }
        if (sideToSpawn >= 0.25 && sideToSpawn < 0.50) { // top side
            y = -50;
            x = Math.random() * gameCanvas.canvas.width;
        }
        if (sideToSpawn >= 0.50 && sideToSpawn < 0.75) { // right side
            x = gameCanvas.canvas.width + 50;
            y = Math.random() * gameCanvas.canvas.height;
        }
        if (sideToSpawn >= 0.75 && sideToSpawn <= 1.00) { // bottom side
            y = gameCanvas.canvas.height + 50;
            x = Math.random() * gameCanvas.canvas.width;
        }
        
        enemies.push(new component(enemySize, enemySize, '#194473', x, y, "enemy"));
        enemiesOnScreen++;
        enemyStartingSpawnDelay *= difficultyMulitplier;
    }
    // Move each enemy towards the player
    for (i = 0; i < enemies.length; i++) {
        var dx = player.x - enemies[i].x;
        var dy = player.y - enemies[i].y;
        var angle = Math.atan2(dy, dx)
        enemies[i].x += enemySpeed * Math.cos(angle);
        enemies[i].y += enemySpeed * Math.sin(angle);
        enemies[i].update();
    }
    // Move each projectile
    for (i = 0; i < projectiles.length; i++) {
        if (projectiles[i].type == "projectileLeft") {
            projectiles[i].x -= projectileSpeed;
        }
        if (projectiles[i].type == "projectileRight") {
            projectiles[i].x += projectileSpeed;
        }
        if (projectiles[i].type == "projectileUp") {
            projectiles[i].y -= projectileSpeed;
        }
        if (projectiles[i].type == "projectileDown") {
            projectiles[i].y += projectileSpeed;
        }
        projectiles[i].update();
    }

    textDisplay1.update();
    textDisplay2.update();
    player.update();
    if (fireCooldown <= 0) {
        fireCooldown = 0;
    } else {
        fireCooldown--;
    }

    if (gameCanvas.frameNo % 60 == 0) {
        score++;
    }
}



function everyinterval(n) {
    if ((gameCanvas.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function lose() {
    gameCanvas.clear();
    ctx2 = gameCanvas.context;
    ctx.drawImage(bigRick, 0, 0);
    ctx.font = 'bold 28px Courier';
    ctx.fillStyle = '#96bbbb';
    ctx.textAlign = 'center';
    ctx.fillText("You Fought Off The Ricks For: " + score + " Seconds!", 720/2, 720/2);
    
    //var videoDiv = document.getElementById("lose-video");
    //videoDiv.style.display = "block";
    loseAudio.volume = .05;
    loseAudio.play();
}