const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const questionList = document.getElementById("question-list");
const timerDisplay = document.getElementById("timer");
const submitBtn = document.getElementById("submit-btn");
let currentQuestion = 0;
jsMCQs.forEach((q, index) => 
{
    const li = document.createElement("li");
    li.textContent = `Q${q.id}`;
    li.addEventListener("click", () => 
    {
        currentQuestion = index;
        displayQuestion();
    });
    questionList.appendChild(li);
});
let userAnswers = new Array(jsMCQs.length).fill(null);
function displayQuestion() 
{
    const q = jsMCQs[currentQuestion];
    questionText.textContent = q.question;
    optionsList.innerHTML = "";
    q.options.forEach(option => 
    {
        const li = document.createElement("li");
        li.textContent = option;
        if (userAnswers[currentQuestion] === option)
        {
           li.classList.add("selected"); 
        } 
        li.addEventListener("click", () => 
        {
            userAnswers[currentQuestion] = option;
            displayQuestion();
        });
        optionsList.appendChild(li);
    });
    Array.from(questionList.children).forEach((li, idx) => 
    {
        li.classList.toggle("active", idx === currentQuestion);
    });
}
prevBtn.addEventListener("click", () => 
{
    if (currentQuestion > 0)
    {
        currentQuestion--;
    } 
    displayQuestion();
});
nextBtn.addEventListener("click", () => 
{
    if (currentQuestion < jsMCQs.length - 1) 
    {
        currentQuestion++;
    }
    displayQuestion();
});
submitBtn.addEventListener("click", submitQuiz);
function submitQuiz() 
{
    let score = 0;
    jsMCQs.forEach((q, idx) => 
    {
        if (userAnswers[idx] === q.answer) 
        {
            score++;
        }
    });
    alert(`You scored ${score} out of ${jsMCQs.length}`);
}
let totalTime = 10 * 60; 
function startTimer() 
{
    const interval = setInterval(() => 
    {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        totalTime--;
        if (totalTime < 0) 
        {
            clearInterval(interval);
            alert("Time's up!");
            submitQuiz();
        }
    }, 1000);
}
displayQuestion();
startTimer();
