// Define an array of quiz questions
const quizQuestions = [
    {
      question: " Capital city of India ? ",
      answers: [{text: "Paris", correct: false},
                {text: "Pune", correct: false},         
                {text: "Chennai", correct: false},
                {text: "New Delhi", correct: true},
      ]
      
    },
    {
      question: "Solve the puzzle: (a+b)-(c-d)=(a*d)/c.What are the values of a, b, c, d if any two of them are even numbers ?",
      answers: [{text:"0,2,7,6", correct: false},
                {text:"4,1,2,3", correct: true},
                {text:"9,11,12,14", correct: false},
                {text:"5,8,7,10", correct: false},        
      ]
      
    },
    {
      question: "Pointing to a photograph of a boy Suresh said,he is the son of the only son of my mother. How is Suresh related to that boy ?",
      answers: [ {text:"Father", correct:true},
                {text:"Brother", correct:false},              
                {text:"Uncle", correct:false},
                {text:"Grandfather" , coorect:false},
              ]
      
    },
    {
       question: " Correct the sentence: I and sheela was completing work yesterday. ",
       answers: [{text:"I and sheela are completing work yesterday.", correct: false},
                 {text:"I and sheela has completing work yesterday.", correct: false},
                 {text:"I and sheela were completing work yesterday.", correct: true },
                 {text:"I and sheela is completing work yesterday.", correct: false},
          ]
       
    },
    {
      question: " Education Minister of India ? ",
      answers: [{text:"Rajnath Singh ", correct: false },
               {text:"Dharmendra Pradhan", correct: true },
               {text: "Piyush Goyal", correct: false}, 
               {text:"Giriraj Singh", correct: false}, 
          ]
      
    },
    {
      question: " Guess the odd one out: Apple, Tomato, Cucumbers, Potato ",
      answers: [{text:"Cucumbers", correct:false},
                {text:"Apple", correct:false },
                {text:"Tomato", correct:false}, 
                {text:"Potato", correct:true},
            ]
      
    },
    {
      question: " Who is the current captain of indian cricket team in T20I ?",
      answers: [{text:"Rohit Sharma", correct:false},
                {text:"Hardik Pandya", correct:true },
                {text:"Mohammed", correct:false },
                {text:"Ravi Sharma" , correct:false},
          ]
      
    },
    {
      question: " What is the difference between ionic and covalent bonds ? ",
      answers: [{text:"Sharing electrons, elctrical attraction between atoms", correct: true },
                {text:"Electrical attraction between ions",correct: false},
                {text:"Electrostatic forces",correct: false },
                {text:"Nature of forming bonds", correct: false},
            ]
      
    },
    {
      question: " Who discovered atoms and molecules ?",
      answers: [{text:"Michael Faraday",  correct: false},
               {text:"Rutherford", correct: false},
               {text:"Bohr",correct: false},
               {text:"John Dalton", correct: true},
          ]
     
    },
    {
      question: " Who is the prime minister(PM) of India ? ",
      answers: [ {text:"Amit Shah", correct: false},
                  {text:"Draupadi Murmu", correct: false},
                  {text:"Narendra Modi", correct: true},
                  {text:"Manmohan Singh", correct:false},
              ]
      
    }
    
  ];
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;
   
  function startQuiz(){
    document.getElementById("start-button").style.display="flex";
    let startButton = document.getElementById("start-button");
    questionElement.innerHTML="";
    answerButtons.innerHTML="";
    nextButton.style.display="none";
    document.getElementById("wel").style.display="flex";
    let welcomeElement = document.getElementById("wel");
    startButton.addEventListener("click", ()=>{
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML="Next";
      displayQuestion();
      startButton.style.display="none";
      welcomeElement.style.display="none";
    });
     
  }
  
  function displayQuestion(){
     resetState();
     let currentQuestion = quizQuestions[currentQuestionIndex];
     let questionNo = currentQuestionIndex + 1;
     questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

     currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if(answer.correct){
         button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
     }); 
   } 
    
   function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
   }

   function selectAnswer(e){
     const selectedBtn = e.target;
     const isCorrect = selectedBtn.dataset.correct === "true";
     if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
     }else{
      selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
          button.classList.add("correct");
        }
        button.disabled = true;
     });
     nextButton.style.display = "flex";
   }
   
   function endQuiz(){
     resetState();
     questionElement.innerHTML =  `
     <h2 style='text-align:center;'>Quiz Completed.</h2>


     <p style='text-align:center;'>YOUR SCORE: ${score} / ${quizQuestions.length}</p>


      <h3 style='text-align:center;'>Thank you!!!<span style='font-size:60px;'>&#128077;</span></h3>
   `;
     nextButton.innerHTML = "Restart";
     nextButton.style.display = "flex";
   }
   function handleNextButton(){
      currentQuestionIndex++;
      if(currentQuestionIndex < quizQuestions.length){
        displayQuestion();
      }else{
        endQuiz();
      }
      
   }

   nextButton.addEventListener("click", ()=>{
     if(currentQuestionIndex < quizQuestions.length){
       handleNextButton();
     }else{
      startQuiz();
     }
   });

   startQuiz();