// Variables to keep track of what question, the user's score, and which answer is correct for the current question
let questionNumber = 0;
let score = 0;
let correctAnswer = null;
// Variables to access elements on the web page
let question = document.getElementById('question');
let points = document.getElementById('points');
let buttonTrue = document.getElementById('true');
let buttonFalse = document.getElementById('false');
let buttonRestartDiv = document.getElementById('restart');
let questionCard = document.getElementById("questionCard");
let divAnswer = document.getElementById("answers");
let ul = document.querySelector('ul');
let launchBar = document.getElementById('launchBar')
// Variables to create new element
let buttonRestart = document.createElement("button");
let paragraphQuestionRemain = document.createElement("p");
let li = document.createElement("li");
// Variable to know witch button is pointed
let activButton;
// Timers
let timer;
let timerQuest;
let timerLaunch = setInterval(launchGame, 500);
// Boolean for loading questions and errors 
let questionLoad = false;
let perfect = true;
// Tab for questions
let questionTab = 
['Mon futur alternant s\'appelle Antoine BASTELICA ?',
'Il pratique 4 à 8H par jour en semaine ?',
'Il sait tout et ne fera jamais d\'erreur ?',
'Il sait se remettre en question et apprendre de ses erreurs ?'];
// Variable for tab length
let questionRemain = questionTab.length;
// Variable for the counter 3 times by question
let count = questionRemain*3;
let countLaunch = 3;
// Hide True False buttons
divAnswer.style.display = "none";
// Set the button restart innertext and attributes
buttonRestart.innerText = "Recommencer";
buttonRestart.setAttribute("onclick","restart();");
// Set the div where the question remaining will show
divAnswer.appendChild(paragraphQuestionRemain);
// Set listeners for the buttons pointerover
buttonTrue.addEventListener("pointerover", changeButtonTrueColor);
buttonFalse.addEventListener("pointerover", changeButtonFalseColor);
// Set loading progression bar transition and width
launchBar.style.transition = "width 0.5s linear";
launchBarWidth = 100;


function launchGame(){
  if(countLaunch>0){
    launchBarWidth = launchBarWidth - (launchBarWidth/countLaunch);
    launchBar.style.width = launchBarWidth+"%";
    countLaunch -= 1;
  } else if (countLaunch == 0){
    launchBarWidth = 100;
    launchBar.style.width = launchBarWidth+"%";
    launchBar.innerText = count;
    launchBar.style.backgroundColor = 'green';
    launchBar.style.color = 'white';
    clearInterval(timerLaunch);
    countLaunch = 3;
    nextQuestion();
    timer = setInterval(countdown, 1000);
    divAnswer.style.display = "initial";
    launchBar.style.transition = "none";
  }
}
function nextQuestion(){
  if(!questionLoad){
    buttonTrue.setAttribute("onclick","trueButton()");
    buttonFalse.setAttribute("onclick","falseButton()");
    timerQuest = setInterval(showQuestion,70);
    questionLoad = true;
  }
}
//Fonction d'affichage de questions
// Quand next question appelé, on efface puis next puis on réaffiche
function showQuestion()
{
  //console.log(countLaunch);
  if(countLaunch === 3){
    question.style.opacity = '0%';
    
    } else if(countLaunch === 2){
      questionCard.style.border = "none";
      switch (questionNumber){
        case 0:
          question.textContent = questionTab[questionNumber];
          correctAnswer = true;
          break;
        case 1:
          question.textContent = questionTab[questionNumber];
          correctAnswer = true;
          break;
        case 2: 
          question.textContent = questionTab[questionNumber];
          correctAnswer = false;
          break;
        case 3: 
          question.textContent = questionTab[questionNumber];
          correctAnswer = true;
          break;
        default:
          question.textContent = 'C\'est terminé !'
          if (score == questionTab.length){
            question.textContent = 'Sans faute, bravo !'
          }
          correctAnswer = null;
          clearInterval(timer);
          divAnswer.style.display = "none";
          buttonRestartDiv.appendChild(buttonRestart);
      }
      if (questionRemain>1){
        paragraphQuestionRemain.innerText = questionRemain + " questions restantes";
      } else {
        paragraphQuestionRemain.innerText = questionRemain + " question restante";
      }
      questionRemain = questionRemain - 1;
      questionNumber = questionNumber + 1;
      if(questionRemain <= 0){
        questionRemain = 0;
      }
    } else if(countLaunch === 1){
        question.style.opacity = '100%'
    } else if(countLaunch === 0){
        clearInterval(timerQuest);
        questionLoad = false;
        countLaunch = 4;
    }
  countLaunch -= 1;
}
function countdown(){
  launchBar.style.transition = "width 1.0s linear";
  if(count>0){
    launchBarWidth = launchBarWidth - (launchBarWidth/count);
    count -= 1;
    launchBar.style.width = launchBarWidth+"%";
    launchBar.innerText = count;
  }
  if (count === 0 ){
    launchBar.style.width = 8.3333+"%";
    questionNumber = 100;
    nextQuestion();
  } else if (count<3){
    launchBar.style.backgroundColor = 'red';
  } else if (count<7){
    launchBar.style.backgroundColor = 'orange';
  } else if (count<10){
    launchBar.style.backgroundColor = 'green';
    launchBar.style.color = 'white';
  }
}
function trueButton(){
  // Check if true is the correct answer
  buttonTrue.removeAttribute("onclick");
  if (correctAnswer == true){
    // Add 1 to the score if it is correct
    score += 1;
    questionCard.style.border = "solid green";
  } else {
    questionCard.style.border = "solid red";
    if(perfect){
      let newLi = document.createElement("li");
      newLi.innerText = "Réponse(s) érronée(s) :"; 
      //newLi.style.backgroundColor = color;
      ul.appendChild(newLi);
    }
    wrongAnswer();
    perfect = false;
  }
  //Update the textContent of points
  points.textContent = score;
  // Call the nextQuestion() function to load the next question;
  nextQuestion();
}
function falseButton(){
  // Check if false is the correct answer
  buttonFalse.removeAttribute("onclick");
  if (correctAnswer == false){
    score += 1;
    questionCard.style.border = "solid green";
    // Add 1 to the score if it is correct
  } else {
    questionCard.style.border = "solid red";
    if(perfect){
      let newLi = document.createElement("li");
      newLi.innerText = "Réponse(s) érronée(s)"; 
      //newLi.style.backgroundColor = color;
      ul.appendChild(newLi);
    }
    wrongAnswer();
    perfect = false;
  }
  //Update the textContent of points
  points.textContent = score;
  // Call the nextQuestion() function to load the next question;
  nextQuestion();
}
function wrongAnswer(){
  let answerValue = "";
  if(correctAnswer){
    answerValue = "Faux";
  }else {
    answerValue = "Vrai";
  }
  if(question.textContent != 'C\'est terminé !'){
    let newLi = document.createElement("li");
    newLi.innerText = question.textContent + " Votre réponse : " + answerValue; 
    //newLi.style.backgroundColor = color;
    ul.appendChild(newLi);
  }
}
function changeButtonTrueColor(){
  buttonTrue.style.backgroundColor = 'green';
  buttonTrue.style.color = 'white';
  buttonTrue.addEventListener("pointerover", changeButtonTrueColor);
  buttonTrue.addEventListener("pointerout", pointerOut);
  activButton = buttonTrue;
}
function changeButtonFalseColor(){
  buttonFalse.style.backgroundColor = 'red';
  buttonFalse.style.color = 'white';
  buttonFalse.addEventListener("pointerover", changeButtonFalseColor);
  buttonFalse.addEventListener("pointerout", pointerOut);
  activButton = buttonFalse;
}
function pointerOut(){
  activButton.style.backgroundColor = 'white';
  activButton.style.color = 'black';
}
function restart(){
  launchBar.style.transition = "none";
  questionRemain = questionTab.length;
  count = questionRemain*3;
  questionNumber = 0;
  score = 0;
  timer = setInterval(countdown, 1000);
  launchBarWidth = 100;
  launchBar.innerText = count;
  launchBar.style.backgroundColor = 'green';
  launchBar.style.width = launchBarWidth+"%";
  correctAnswer = null;
  points.textContent = score;
  nextQuestion();
  for(i=ul.children.length;i>0;i--){
    ul.children[i-1].remove();
  }
  buttonRestartDiv.removeChild(buttonRestart);
  divAnswer.style.display = "initial";
}