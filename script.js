//Global Variables
var secondDivideContainer
var divideCategory
var thirdDivideContainer
var questionAnswerContainer
var playerAnswerContainer
var submitButton
var timerChange = 7;
var ticktock

var questions;
var playerAnswer = "";
var questionCounter = 1;
var isFirstRound = true;

var player = document.getElementById('nameInput')

document.addEventListener("keypress", function(playbutton) {
    if (playbutton.key === "Enter") {
        startGame();
    }
});
document.addEventListener("click", function(event) {
    var id = event.target.id
    var categories = ["aButton", "mButton", "sButton", "dButton"]
    var operation = {
        mButton: "Multiply",
        dButton: "Division",
        aButton: "Addition",
        sButton: "Subtraction"
    }

    // Logic for Play Button at the start of the game
    if (id === "playbutton") {
        startGame()
    }

    // Logic for Addition / Subtraction / Multiplication / Division buttons
    if (categories.includes(id)) { //.includes mean it will search through the array and find a match which is the id, if it matches it will return true else false
        questions = questionsConfig[id]
        //first round is to tell if its the first round if not it will hide the elements of the rest of the unchosen categories
        if (isFirstRound) {
            generateCategories(operation[id])
            var selectionContainer = document.getElementById('selectionContainer')
            selectionContainer.style.display = 'none'
        } else {
            changeOperationName(operation[id])
            secondDivideContainer.style.display = 'block'
            var selectionContainer = document.getElementById('selectionContainer')
            selectionContainer.style.display = 'none'
            document.getElementById('currentQuestionAnswer').innerHTML = questions[`Q${questionCounter}`].question
        }
    }

    // Logic for submit button
    if (id === "submit") {
        var answerToCurrentQuestion = questions[`Q${questionCounter}`].answer
        if (playerAnswer !== answerToCurrentQuestion) {
            var errorContainer = document.getElementById("error")
            errorContainer.style.display = "block"
            errorContainer.innerHTML = `Wrong answer ${nameInput.value}! Try again!`
        } else {
            document.getElementById("error").style.display = "none"
            questionCounter += 1
            if (questionCounter === 9) {
                document.getElementById('secondDivideContainer').style.display = "none"
                document.getElementById('selectionContainer').style.display = "block"

                // reset logic
                questionCounter = 1
                isFirstRound = false
                document.getElementById('playerAnswer').value = ""
            } else {
                document.getElementById('currentQuestionAnswer').innerHTML = questions[`Q${questionCounter}`].question
                document.getElementById('playerAnswer').value = ""
            }
            console.log(questionCounter)
        }
    }
});

document.addEventListener('change', function(event) {
    var id = event.target.id
    if (id === "playerAnswer") {
        playerAnswer = parseInt(event.target.value);
    }
});

document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/0a/9b/65/0a9b65c27cdbac4d4c37e48ffa3fdb8c.jpg')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "100% 100%";

function startGame(event) {
    addSelectionCategory();
    // console.log("Name Input Working!!!")
    var headerContainer = document.querySelector(".hangmanWallpaper");
    headerContainer.style.display = "none";
};

function addSelectionCategory() {
    document.body.style.backgroundColor = "black";

    var firstContainer = document.createElement("div");
    firstContainer.id = "selectionContainer";
    firstContainer.style.padding = "150px";
    firstContainer.style.textAlign = "center";
    document.body.appendChild(firstContainer);

    //create a heading to select one category
    var categorySelection = document.createElement("h1");
    categorySelection.innerHTML = `Select One Category! ${nameInput.value}!`;
    categorySelection.style.fontSize = "55px";
    categorySelection.style.color = "mediumvioletred";
    firstContainer.appendChild(categorySelection);

    //create multiply category button
    var multiplyButton = document.createElement("button");
    multiplyButton.id = 'mButton';
    multiplyButton.innerHTML = "MULTIPLY";
    multiplyButton.style.fontSize = "25px";
    multiplyButton.style.margin = "5px";
    firstContainer.appendChild(multiplyButton);
    // document.getElementById("mButton").addEventListener("click", initiateTimer);

    //create divide category button
    var divideButton = document.createElement("button");
    divideButton.id = 'dButton';
    divideButton.innerHTML = "DIVIDE";
    divideButton.style.fontSize = "25px";
    divideButton.style.margin = "5px";
    firstContainer.appendChild(divideButton);

    //create add category button
    var addButton = document.createElement("button");
    addButton.id = 'aButton';
    addButton.innerHTML = "ADD";
    addButton.style.fontSize = "25px";
    addButton.style.margin = "5px";
    firstContainer.appendChild(addButton);

    //create subtract category button
    var subtractButton = document.createElement("button");
    subtractButton.id = 'sButton';
    subtractButton.innerHTML = "SUBTRACT";
    subtractButton.style.fontSize = "25px";
    subtractButton.style.margin = "5px";
    firstContainer.appendChild(subtractButton);
};

// generate categories 
function generateCategories(operation) {
    // console.log("operation", operation)
    if (isFirstRound) {
        //create second container 
        secondDivideContainer = document.createElement("div");
        secondDivideContainer.id = "secondDivideContainer";
        document.body.appendChild(secondDivideContainer);

        //create multiply category heading
        divideCategory = document.createElement("h1");
        divideCategory.id = "allCategories";
        divideCategory.innerHTML = `${operation} Category`;
        divideCategory.style.fontSize = "55px";
        divideCategory.style.textAlign = "center";
        divideCategory.style.color = "mediumvioletred";
        divideCategory.style.padding = "150px";
        secondDivideContainer.appendChild(divideCategory);


        //create a container div to place the questions, and answer input
        thirdDivideContainer = document.createElement("div");
        thirdDivideContainer.id = "thirdDivideContainer";
        thirdDivideContainer.style.display = "flex";
        thirdDivideContainer.style.justifyContent = "center"
        secondDivideContainer.appendChild(thirdDivideContainer);

        //create a container for questions confiq
        questionAnswerContainer = document.createElement("div");
        questionAnswerContainer.id = "currentQuestionAnswer";
        questionAnswerContainer.style.margin = "0 10px 0 0";
        questionAnswerContainer.style.fontSize = "300%";
        questionAnswerContainer.innerHTML = questions[`Q${questionCounter}`].question;
        thirdDivideContainer.appendChild(questionAnswerContainer);

        //create an input for player answer
        playerAnswerContainer = document.createElement("input");
        playerAnswerContainer.id = "playerAnswer";
        playerAnswerContainer.style.fontSize = "150%";
        thirdDivideContainer.appendChild(playerAnswerContainer)

        //create submit button when player has entered an answer
        submitButton = document.createElement("button");
        submitButton.id = "submit";
        submitButton.style.width = "150px";
        submitButton.style.margin = "0 0 0 20px";
        submitButton.style.backgroundColor = "lightblue";
        submitButton.innerHTML = "Submit Answer";
        thirdDivideContainer.appendChild(submitButton)
    };

};

function changeOperationName(operation) {
    if (isFirstRound) {
        divideCategory = document.createElement("h1");
        divideCategory.innerHTML = `${operation} Category`;
        divideCategory.style.fontSize = "55px";
        divideCategory.style.textAlign = "center";
        divideCategory.style.color = "red";
        secondDivideContainer.appendChild(divideCategory);
    } else {
        //to change the heading of the category after first round
        divideCategory.innerHTML = `${operation} Category`;
    }

}

// // var initiateTimer = function() {
// create a timer when game start 

// 	var thetimer = document.createElement("div");
// 	thetimer.id = 'thetimer';
// 	document.body.insertBefore(thetimer, document.body.childNodes[0]);
//     var ticktock = setInterval(countDisplay, 1000);
//     const clear = () => { clearInterval(ticktock) };
//     setTimeout(clear, 7000);

// };

// var countDisplay = function() {
//     console.log(timerChange);
//     timerChange--;
//     if (timerChange >= 0) {
    	
//         thetimer.innerHTML = timerChange;
//         if (timerChange <= 5) {
//             document.getElementById('thetimer').style.color = "red";
//         }
//     }
//     if (timerChange === 0) {
//         alert("BETTER LUCK NEXT TIME!!!");
//         document.getElementById("thetimer").innerHTML = "TIME'S UP!!!";
//         thetimer.style.fontSize = "40px";
//         clearInterval(ticktock);
//         document.getElementById('allCategories').addEventListener("click", initiateTimer);
//         console.log("Time's up working fine")
//     }
// }