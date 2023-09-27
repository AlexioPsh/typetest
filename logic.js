document.addEventListener("DOMContentLoaded", function() {
    var fadeMoveComponent = document.querySelector(".mainPageButton");
    fadeMoveComponent.classList.add("loaded");
    fadeMoveComponent = document.querySelector(".info");
    fadeMoveComponent.classList.add("loaded");
});
var checkGameStart="false";
function loadgame(){
    var displayMainPage = document.querySelector(".displayMainPage");
    var displayGamePage = document.querySelector(".displayGamePage");
    var mainPage = document.querySelector(".mainPage");
    var gamePage = document.querySelector(".gamePage");
    mainPage.classList.add("animated");
    generateText();
    setTimeout(function() {
        displayMainPage.style.display="none";
        displayGamePage.style.display="block";
        gamePage.classList.add("animated");
        setTimeout(function() {
            gamePage.classList.remove("animated");
        }, 1000);
    }, 900);
    checkGameStart="true"; 
}
function randomizer(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var limiterRand=0;

function generateText(){
    var phrases=[
        "In the grand tapestry of life, every thread represents a unique story waiting to be woven into the fabric of our existence.",
        "The gentle rustling of leaves in the tranquil forest serves as nature's lullaby, soothing the soul into peaceful slumber.",
        "As the sun sets on the horizon, painting the sky with hues of orange and pink, we're reminded of the beauty in every ending.",
        "In the realm of possibility, dreams take flight on the wings of ambition, carrying us to destinations only our hearts can fathom.",
        "Amidst the chaos of the world, the stillness of a quiet moment can be a sanctuary where clarity and inner peace converge.",
        "Like a symphony of stars in the night sky, our interconnectedness hums with the harmony of countless shared experiences.",
        "Time, that elusive river, flows steadily, carrying us on its current, while memories are the stones that shape its ever-changing course.",
        "In the pages of a good book, one can traverse worlds, discover untold wisdom, and find solace in the embrace of well-crafted words.",
        "The heart, an enigmatic compass, navigates the labyrinth of emotions, leading us toward the uncharted shores of love and vulnerability.",
        "Life's journey is a mosaic of triumphs and tribulations, each piece adding depth and character to the canvas of our existence.",
        "In the embrace of genuine friendship, we find a refuge where laughter dances, tears find solace, and bonds grow stronger with time.",
        "The art of forgiveness is a transformative alchemy, turning the leaden weight of resentment into the golden lightness of liberation.",
        "The whispers of nature's wisdom can be heard in the babbling brook, the wind through trees, and the songs of birds in morning's light.",
        "With each sunrise, we are gifted a fresh canvas upon which to paint our aspirations, and with each sunset, a chance to reflect and renew.",
        "In the tapestry of cultures, diversity weaves threads of color and texture, creating a vibrant mosaic of humanity's shared heritage.",
        "When adversity knocks, resilience answers the door, reminding us that our inner strength is a beacon in the darkest of storms.",
        "Silence, a profound teacher, unveils the secrets of introspection, revealing the wisdom that can only be found within the depths of the soul.",
        "Through the lens of gratitude, life's ordinary moments become extraordinary treasures, and every breath is a reminder of abundance.",
        "The echo of history resonates in the footprints of our ancestors, shaping the path on which we tread toward an uncertain future.",
        "In the theater of dreams, our imaginations take center stage, crafting stories that transcend reality and nourish the spirit.",
    ];
    var generatedText="";
    if(limiterRand==0){
        var min=0;
        var max=19;
        var rand = [];
        
        for(var x =0; x<5; x++){
            rand[x]= randomizer(min, max);
            console.log(rand[x]);
            generatedText= generatedText + phrases[rand[x]] + " ";
        }
        for(var x=0; x<generatedText.length-1;x++){
            var letterElement = document.createElement('h3');
            letterElement.className = "letter"+x;
            letterElement.textContent=generatedText[x];
            if(generatedText[x]==" "){
                letterElement.textContent=String.fromCharCode(160);
            }
            if(x<100){
                letterElement.style.display="block";
            }
            else{
                letterElement.style.display="none";
            }

            document.querySelector('.text').appendChild(letterElement);
        }
        var opc=100;
        for(var x=80; x<100; x++){
            var letterElement = document.querySelector(".letter"+x);
            letterElement.style.opacity=opc+"%";
            opc=opc-5;
        }

    }
    return generatedText;
}


var currentLetter=0;
var startTimer=0;
document.addEventListener('keydown', function(event) {

    if(event.key=="Shift" || event.key=="CapsLock"){
        return 0;
    }
    if(checkGameStart=="true"){
        if(startTimer==0){
            startCountdown();
            startTimer=1;
        }
        var letterElement = document.querySelector(".letter"+currentLetter);
        letterElement.style.borderBottom = '0px';
        if(event.key== letterElement.textContent){
            letterElement.style.color="green";
        }
        else{
            if(event.key==" " && letterElement.textContent==String.fromCharCode(160)){
                letterElement.style.color="green";
            }
            else{
                console.log(letterElement.textContent);
                letterElement.style.color="red";
            }
        }
        currentLetter++;
        var firstLetter = document.querySelector(".letter"+(currentLetter - 50));
        var lastLetter = document.querySelector(".letter"+(currentLetter + 50));
        if (currentLetter >= 50) {
            firstLetter.style.display = "none";
            lastLetter.style.display = "block";
            var opc=100;
            for(var x=currentLetter+30; x<currentLetter+51; x++){
                lastLetter = document.querySelector(".letter"+x);
                lastLetter.style.opacity=opc+"%";
                opc=opc-5;
            }
            opc=100;
            for(var x=currentLetter-30; x>currentLetter-51; x--){
                lastLetter = document.querySelector(".letter"+x);
                lastLetter.style.opacity=opc+"%";
                opc=opc-5;
            }
          }
        letterElement = document.querySelector(".letter"+currentLetter);
        letterElement.style.borderBottom = '2px solid white';
    }
    else{
        console.log("game hasn't started yet");
    }
});
function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000); 
    updateCountdown();
}
var countdownValue = 60; 
var countdownInterval;
function updateCountdown() {
    const countdownElement = document.getElementById('timer');
    if (countdownValue >= 0) {
        const minutes = Math.floor(countdownValue / 60);
        const seconds = countdownValue % 60;
        countdownElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        countdownValue--;
    } else {
        checkGameStart="false";
        var displayAnalytics = document.querySelector(".displayAnalytics");
        displayAnalytics.style.display="block";
        var analytics = document.querySelector(".analytics");
        analytics.classList.add("animated");
        analyse();
        clearInterval(countdownInterval);
    }

}
function analyse(){
    var accuracy=0;
    var accuracyElement = document.getElementById('accuracy');
    var letterElement;
    for(var x=0; x<currentLetter; x++){
        letterElement = document.querySelector(".letter"+x);
        if(letterElement.style.color=="green"){
            accuracy++;
        }
    }
    accuracyElement.textContent = "Accuracy: " + (accuracy/currentLetter*100).toFixed(2) + "%";
    var wpmElement = document.getElementById('wpm');
    wpmElement.textContent = currentLetter/5;
}

function restart(){
    var displayAnalytics = document.querySelector(".displayAnalytics");
    displayAnalytics.style.display="none";
    var analytics = document.querySelector(".analytics");
    analytics.classList.remove("animated");
    var length= generateText();
    console.log(length);
    limiterRand=0;
    currentLetter=0;
    startTimer=0;
    countdownValue = 60; 
    countdownInterval;
    checkGameStart="true";
    for(var x=0; x<length.length; x++){
        var letterElement = document.querySelector(".letter"+x);
        letterElement.remove();
    }
    generateText();
}
