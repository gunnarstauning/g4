//Step 3A.
var htmlButton = document.getElementById('html-button');
var htmlIsChanged = false;
htmlButton.onclick = function(){
    changeHTMLElement()
};

function changeHTMLElement(){
    if(!htmlIsChanged){
        htmlButton.innerHTML = "How dare you touch me?";
        htmlIsChanged = true;
    }
    else{
        htmlButton.innerHTML = "Change an HTML Element";
        htmlIsChanged = false;
    }
}

//Step 3B.
var cssButton = document.getElementById('css-button');
var cssIsChanged = false;
cssButton.onclick = function(){
    changeCSSElement()
};

function changeCSSElement(){
    var buttons = document.getElementsByClassName('p3-buttons');
    for(i=0; i < buttons.length; i++){
        buttons[i].classList.toggle("new-p3-buttons");
    }
}

//Step 3C.
var messageText = document.getElementById('message-of-the-day');

var messageSubmitButton = document.getElementById('message-submit-button');
messageSubmitButton.onclick = function(){
    setMessageOfTheDay()
};

function setMessageOfTheDay(){
    document.getElementById('message-output').innerHTML = messageText.value;
}

//Step 3D.
var randNumOut = document.getElementById('rand-num-out');

var randNumSubmit = document.getElementById('number-submit-button');

var randomNumber;

randNumSubmit.onclick = function(){
    randomNumber = GetRandomNumber();
    randNumOut.innerHTML = "Your Random Number Is: " + randomNumber;
    //animateDans();
}

function GetRandomNumber(){
    
    var num1 = document.getElementById('number-1').value;
    var num2 = document.getElementById('number-2').value;

    var randNum = parseInt(Math.random() * (num2 - num1) + num1);
    

    return randNum;
}

//Step 3E.
var danImg = new Image(50, 50);
danImg.src = 'DanFace.png';

var numOfDans;
var dans = new Array();

var buttonGrid = document.getElementById('button-grid')
var spawnDansButton = document.getElementById('spawn-button');
spawnDansButton.onclick = function(){
    numOfDans = randomNumber;
    spawnDans();
}
function spawnDans(){
    for(var i = 0; i < numOfDans; i++){
        dans.push(danImg);
    }
    var danElement = document.createElement('img');
    danElement.setAttribute('src', 'DanFace.png');
    danElement.setAttribute('height', '50px');
    danElement.setAttribute('width', '50px');
    danElement.setAttribute('id', 'dan-face');
    buttonGrid.after(danElement);
    /*dans.forEach(function(dan) {
        Dan(dan);
    });*/
}
function Dan(dan){
    var danElement = document.createElement('img');
    danElement.setAttribute('src', 'DanFace.png');
    danElement.setAttribute('height', '50px');
    danElement.setAttribute('width', '50px');
    danElement.setAttribute('id', 'dan-face');
    buttonGrid.after(danElement);
}

        /*function makeNewPosition(){
            
            var h = document.body.height - 50;
            var w = document.body.width - 50;
            
            var nh = Math.floor(Math.random() * h);
            var nw = Math.floor(Math.random() * w);
            
            return [nh,nw];    
            
        }
        
        function animateDans(){
            var newq = makeNewPosition();
            var oldq = dans.offset();
            var speed = calcSpeed([oldq.top, oldq.left], newq);
            
            dans.animate({ top: newq[0], left: newq[1] }, speed, function(){
              animateDans();        
            });
            
        };
        
        function calcSpeed(prev, next) {
            
            var x = Math.abs(prev[1] - next[1]);
            var y = Math.abs(prev[0] - next[0]);
            
            var greatest = x > y ? x : y;
            
            var speedModifier = 0.1;
        
            var speed = Math.ceil(greatest/speedModifier);
        
            return speed;
        
        }*/