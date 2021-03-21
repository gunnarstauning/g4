//Step 3A.
var htmlButton = document.getElementById('html-button');
var htmlIsChanged = false;
htmlButton.onclick = function () {
    changeHTMLElement()
};

function changeHTMLElement() {
    if (!htmlIsChanged) {
        htmlButton.innerHTML = "How dare you touch me?";
        htmlIsChanged = true;
    }
    else {
        htmlButton.innerHTML = "Change an HTML Element";
        htmlIsChanged = false;
    }
}

//Step 3B.
var cssButton = document.getElementById('css-button');
var cssIsChanged = false;
cssButton.onclick = function () {
    changeCSSElement()
};

function changeCSSElement() {
    var buttons = document.getElementsByClassName('p3-buttons');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("new-p3-buttons");
    }
}

//Step 3C.
var messageText = document.getElementById('message-of-the-day');

var messageSubmitButton = document.getElementById('message-submit-button');
messageSubmitButton.onclick = function () {
    setMessageOfTheDay()
};

function setMessageOfTheDay() {
    document.getElementById('message-output').innerHTML = messageText.value;
}

//Step 3D.
var randNumOut = document.getElementById('rand-num-out');

var randNumSubmit = document.getElementById('number-submit-button');

var randomNumber;

randNumSubmit.onclick = function () {
    randomNumber = GetRandomNumber();
    randNumOut.innerHTML = "Your Random Number Is: " + randomNumber;
    //animateDans();
}

function GetRandomNumber() {

    var num1 = document.getElementById('number-1').value;
    var num2 = document.getElementById('number-2').value;

    var randNum = parseInt(Math.random() * (num2 - num1) + num1);


    return randNum;
}

//Step 3E.
var danImg = new Image(35, 50);
danImg.src = 'DanFace.png';

var numOfDans;
var dans = new Array();

var danImageInsert = document.getElementById('add-dan-images');
var buttonGrid = document.getElementById('button-grid');

var spawnDansButton = document.getElementById('spawn-button');
spawnDansButton.onclick = function () {
    clearCurrentArray();
    numOfDans = randomNumber;
    addDansToList();
    spawnDans();
}

function clearCurrentArray() {
    dans = [];
    danImageInsert.innerHTML = '';
}

function addDansToList() {
    for (var i = 0; i < numOfDans; i++) {
        Dan();
    }
}
function Dan() {
    var danElement = document.createElement('img');
    danElement.setAttribute('src', 'DanFace.png');
    danElement.setAttribute('height', '50px');
    danElement.setAttribute('width', '35px');
    danElement.setAttribute('id', 'dan-face');
    danElement.setAttribute('style', 'margin:20px;')
    dans.push(danElement);
}
function spawnDans() {
    for (var i = 0; i < dans.length; i++) {
        danImageInsert.insertAdjacentElement('afterbegin', dans[i]);
    }
}

var shakeButton = document.getElementById('shake-button');
shakeButton.onclick = function () {
    shakeEmUp();
}

function shakeEmUp() {
    for (var i = 0; i < dans.length; i++) {
        //animateDans(dans[i]);
        dans[i].style.animationFillMode = "forwards";
        dans[i].animate([{transform: 'translateY(-1px)'},{transform: 'rotate(180deg)'},{transform: 'translateY(-500px)'},{transform: 'scale(1.5,1.5)'}],{duration: 1200});
    }
}
/*function makeNewPosition() {

    var h = document.body.height - 50;
    var w = document.body.width - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDans(dan) {
    var newq = makeNewPosition();
    var oldq = dan.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    dan.animate({ top: newq[0], left: newq[1] }, speed, function () {
        animateDans();
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.1;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}*/