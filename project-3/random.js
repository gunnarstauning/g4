var messageText = document.getElementById('message-of-the-day');

var messageSubmitButton = document.getElementById('message-submit-button');
messageSubmitButton.onclick = function(){
    setMessageOfTheDay()
};

function setMessageOfTheDay(){
    document.getElementById('message-output').innerHTML = messageText.value;
}