function setMessageOfTheDay(){
    var text = "Message of the Day!";
    text = document.getElementById('message-of-the-day').value;
    document.getElementById('message-output').innerHTML = text;
}