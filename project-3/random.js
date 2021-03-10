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