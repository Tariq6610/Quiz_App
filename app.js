var questions = [
  {
    question: "What does HTML stand for?",
    option1: "Hyperlinks and Text Markup Language",
    option2: "Hypertext Markup Language",
    option3: "Home Tool Markup Language",
    correctOption: "Hypertext Markup Language",
  },
  {
    question: "Who is making the Web standards?",
    option1: "Google",
    option2: "The World Wide Web Consortium",
    option3: "Microsoft",
    correctOption: "The World Wide Web Consortium",
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    option1: "<heading>",
    option2: "<h6>",
    option3: "<h1>",
    correctOption: "<h1>",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    option1: "<linebreak>",
    option2: "<br>",
    option3: "<break>",
    correctOption: "<br>",
  },
  {
    question: "What is the correct HTML for adding a background color?",
    option1: '<body bg="yellow">',
    option2: "<background>yellow</background>",
    option3: '<body style="background-color:yellow;">',
    correctOption: '<body style="background-color:yellow;">',
  },
  {
    question: "Choose the correct HTML element to define important text:",
    option1: "<strong>",
    option2: "<b>",
    option3: "<i>",
    correctOption: "<strong>",
  },
  {
    question: "Choose the correct HTML element to define emphasized text:",
    option1: "<italic>",
    option2: "<i>",
    option3: "<em>",
    correctOption: "<em>",
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    option1: "<a>http://www.w3schools.com</a>",
    option2: '<a href="http://www.w3schools.com">W3Schools</a>',
    option3: '<a url="http://www.w3schools.com">W3Schools.com</a>',
    correctOption: '<a href="http://www.w3schools.com">W3Schools</a>',
  },
  {
    question: "How can you open a link in a new tab/browser window?",
    option1: '<a href="url" target="_blank">',
    option2: '<a href="url" target="new">',
    option3: ' <a href="url" new>',
    correctOption: '<a href="url" target="_blank">',
  },
  {
    question: "Which character is used to indicate an end tag?",
    option1: "*",
    option2: "/",
    option3: "<",
    correctOption: "/",
  },
  {
    question: "Which of these elements are all <table> elements?",
    option1: "<thead> <body> <tr>",
    option2: "<table> <tr> <tt>",
    option3: "<table> <tr> <td>",
    correctOption: "<table> <tr> <td>",
  },
  {
    question: "How can you make a numbered list?",
    option1: "<list>",
    option2: "<ol>",
    option3: "<ul>",
    correctOption: "<ol>",
  },
  {
    question: "What is the correct HTML for making a checkbox?",
    option1: '<input type="check"',
    option2: '<check>',
    option3: '<input type="checkbox"',
    correctOption: '<input type="checkbox"',
  },
  {
    question: "What is the correct HTML for making a text input field?",
    option1: '<input type="check"',
    option2: '<check>',
    option3: '<input type="checkbox"',
    correctOption: '<input type="checkbox"',
  },
  {
    question: "What is the correct HTML for making a drop-down list?",
    option1: '<input type="textfield">',
    option2: '<textfield>',
    option3: '<input type="text">',
    correctOption: '<input type="text">',
  },
];


const quest = document.querySelector("#quest");
const opt1 = document.querySelector("#opt1"); 
const opt2 = document.querySelector("#opt2"); 
const opt3 = document.querySelector("#opt3");
const btn = document.querySelector("#Next-btn")
const options = document.querySelectorAll("input");
let divClickables = document.querySelectorAll(".optionDiv")
let minit = document.querySelector("#minit")
let second = document.querySelector("#second")

let index = 0;
let score= 0;
let checkedOpt;
let correctOPt;
let percentage;
let time;
let min = 1;
let sec = 59;

let timerInterval;
let startAlert = Swal.fire({
  title: "Quiz will start soon",
  html: `You have ${questions.length} Questions to complete in ${min} minits and ${sec} seconds <br>Best Of Luck <br> <b></b> Seconds.`,
  timer: 10000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Math.round(Swal.getTimerLeft()/1000)}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});



function quiz(){
    if(index < questions.length ){
        quest.innerText = `Q${index+1}- `+questions[index].question
        opt1.innerText = questions[index].option1
        opt2.innerText = questions[index].option2
        opt3.innerText = questions[index].option3
        btn.disabled = true;
        btn.style.backgroundColor = "grey"   
      }else{
        if(time){
          clearInterval(time)
        }
      }
      
      for(let i = 0; i < options.length; i++){
        if(options[i].checked){
          let checkedValue = options[i].value;
          let checked = questions[index-1].question;
          checkedOpt = questions[index-1][`option${checkedValue}`];
          correctOPt = questions[index-1].correctOption;
          console.log(checked)
          if(checkedOpt === correctOPt){
            score++;
          }            
        }  
        options[i].checked = false;
      }
      if(index == questions.length){
        console.log("Qestion completed")
        percentage = (score/questions.length)*100;
        percentage= percentage.toFixed(2)
        Swal.fire({
          title: percentage+"%",
          text: "Your Score",
          icon: "info",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        })

        for(let i = 0; i < options.length; i++){
          options[i].disabled = true;
        } 
      }

       index++
      
       divClickables.forEach((div)=>{
         div.style.backgroundColor = "";
       })
}

function clicked(){
    btn.disabled = false;
    btn.style.backgroundColor = "#04AA6D"
}



let currentDiv = false;
divClickables.forEach((div)=>{
  div.addEventListener("click",()=>{
    let radiobtn = div.querySelector("input")
    let isChecked = radiobtn.checked
    
    if(currentDiv != false && currentDiv != div){
      currentDiv.style.backgroundColor = "";
    }

    if(!isChecked){
      radiobtn.checked = true;
      btn.disabled = false;
      btn.style.backgroundColor = "#04AA6D"
      div.style.backgroundColor = "#5ae6b2"
    }

      currentDiv = div;

  })
})



startAlert.then(()=>{

  
   time = setInterval(() => {
    sec--;
    if(sec == 0){
      if(min > 0){
        sec = 59;
        min--;
      }
    }
  
    minit.innerText = min;
    second.innerText = sec;
    
    if(min === 0 && sec === 0){
      clearInterval(time);
      Swal.fire({
        title: "Times Up",
        text: "see Your Result",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        index = questions.length;
      }).then(()=>{
        quiz();
      })
      
    }
    return time;
  }, 1000);
})


quiz()


