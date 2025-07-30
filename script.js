document.addEventListener("DOMContentLoaded", () => {
    habits.forEach(habitText => createHabitElement(habitText));
    handleStreak();
});

let habits = JSON.parse(localStorage.getItem("habits")) || [];

const dateMsg = document.getElementById("date");
const today = new Date();
const date = today.toDateString();
dateMsg.innerHTML = `<strong>Today's Date:</strong> ${date}`;

let habitCounter = 0; // <-- move it up here to make it global
function handleStreak () {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('date');
    let streak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastDate !== today) {
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("date", today);
    }

    // Always update the display
    const streakMsg = document.getElementById("streak");
    streakMsg.innerHTML = `<p>Total Streak: <strong>${streak}</strong></p>`;
  
}

function createHabitElement(habitText) {
    const container = document.querySelector(".container");
    const habit = document.createElement("div");
    const deleteBtn = document.createElement("div");
    const finishBtn = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const habitCounterMsg = document.getElementById("habit-counter");
    let finishBtnClickCount = 0;

    buttonWrapper.classList.add("button-wrapper");
    habit.classList.add("habit");
    habit.textContent = habitText;

    // Delete Button
    deleteBtn.innerHTML=`<img class="delete-btn" src="https://codehs.com/uploads/321402163bc9493582e9dcfc65d7e809">`;
   
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
        const confirmed = window.confirm("Are you sure you want to delete this habit?");
        if (confirmed) {
            habit.remove();
            habits = habits.filter(h => h !== habitText);
            localStorage.setItem("habits", JSON.stringify(habits));
        }
    });

    // Finish Button
    finishBtn.classList.add("finish-btn")
    finishBtn.style.cursor = "pointer";
    finishBtn.addEventListener("click", () => {
        finishBtnClickCount++;
        finishBtn.classList.toggle("finish-btn-click")
        habit.classList.toggle("done");
        habitCounterMsg.innerHTML = `You've completed ${habitCounter} <strong>Habits</strong> today!`;
        if (finishBtnClickCount === 1) {
            habitCounter++;
        }
        handleStreak();
    });

    // Append all the pieces
    habit.append(buttonWrapper);
    buttonWrapper.append(deleteBtn, finishBtn);
    container.appendChild(habit);
}

document.getElementById("add").addEventListener("click", () => {
    const input = document.getElementById("add-habit").value.trim();
    if (!input) return;

    createHabitElement(input);
    habits.push(input);
    localStorage.setItem("habits", JSON.stringify(habits));
});

//settings
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
