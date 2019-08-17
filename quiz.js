//source for images and vars for quiz
const correctAnswerIcon = "mario.jpg";
const wrongAnswerIcon= "bowser.jpg";
const warningIcon = "boo.jpg";
let questionCounter = 0;
let score = 0;
let questionsCount = BANK.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		/* console.log("handleStartClick() ran"); */ 
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').fadeIn("slow");
		renderQuizBox(); 
	});
}

// This function displays the quizz box with the question, options, score and question count
function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`Score:${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

// This function renders a new question
function renderQuestion(){
  $(".questions-form p").text(BANK[questionCounter].question);
  $(".questions-form #option-one").val(BANK[questionCounter].optionone);
  $(".questions-form #option-two").val(BANK[questionCounter].optiontwo);
  $(".questions-form #option-three").val(BANK[questionCounter].optionthree);
  $(".questions-form #option-four").val(BANK[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(BANK[questionCounter].optionone);
  $(".questions-form #option-two").next().text(BANK[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(BANK[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(BANK[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    /* console.log("handleSubmitAnswer() ran"); */
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}

// This function checks whether the answer selected by the user is correct or not
function checkAnswer(selected){
  let rightAnswer = BANK[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}

//This function gives feedback to the user whether the option selected in correct or wrong. 
//It also alerts the user if no option is selected
function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}

//This function will proceed to the next question or display the final score based on the question count.
function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    /* console.log("handlePopupClose() ran"); */
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < BANK.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

//This function displays the final score once the quiz is completed
function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`You got: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

//This function resets the questions and score
function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

//This function will start over the quiz
function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    /* console.log("handleStartOver() ran"); */
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function quiz(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(quiz());
