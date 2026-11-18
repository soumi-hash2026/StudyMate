
console.log("Welcome to StudyMate!");

// DASHBOARD

const dateElement = document.querySelector("#today-date");

if (dateElement) {
    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

const greetingElement = document.querySelector("#greeting");

if (greetingElement) {
    const hour = new Date().getHours();

    if (hour < 12) {
        greetingElement.textContent = "Good morning!";
    } else if (hour < 18) {
        greetingElement.textContent = "Good afternoon!";
    } else {
        greetingElement.textContent = "Good evening!";
    }
}

function updateDashboardOverview() {
    const totalTasksElement = document.querySelector("#total-tasks");
    const completedElement = document.querySelector("#dashboard-completed");
    const activitiesElement = document.querySelector("#scheduled-activities");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(task => task.completed).length;

    if (totalTasksElement) {
        totalTasksElement.textContent = "Tasks: " + tasks.length;
    }

    if (completedElement) {
        completedElement.textContent = "Completed: " + completedTasks;
    }

    const savedSchedule = localStorage.getItem("schedule") || "";
    const temporaryList = document.createElement("ul");

    temporaryList.innerHTML = savedSchedule;

    if (activitiesElement) {
        activitiesElement.textContent =
            "Scheduled activities: " +
            temporaryList.querySelectorAll("li").length;
    }
}

function updateProgress() {
    const completedCountElement = document.querySelector("#completed-count");

    if (!completedCountElement) {
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(task => task.completed).length;

    completedCountElement.textContent = completedTasks;
}

updateDashboardOverview();
updateProgress();


// TASK MANAGEMENT

const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const priorityInput = document.querySelector("#priority-input");

function saveTasks() {
    if (!taskList) {
        return;
    }

    const tasks = [];

    taskList.querySelectorAll("li").forEach(item => {
        const taskText = item.querySelector(".task-text");

        if (taskText) {
            tasks.push({
                text: taskText.textContent,
                completed: item.classList.contains("completed"),
                priority: item.dataset.priority || "medium"
            });
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(task, completed = false, priority = "medium") {
    if (!taskList) {
        return;
    }

    const listItem = document.createElement("li");
    listItem.dataset.priority = priority;

    if (completed) {
        listItem.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;

    const priorityLabel = document.createElement("small");
    priorityLabel.textContent = "Priority: " + priority;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-task-button";

    listItem.appendChild(taskText);
    listItem.appendChild(priorityLabel);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    updateProgress();
    updateDashboardOverview();
}

if (addTaskButton) {
    addTaskButton.addEventListener("click", function () {
        const task = taskInput.value.trim();
        const priority = priorityInput ? priorityInput.value : "medium";

        if (task === "") {
            alert("Please enter a task.");
            return;
        }

        createTask(task, false, priority);
        saveTasks();

        taskInput.value = "";
    });
}

if (taskList) {
    taskList.addEventListener("click", function (event) {
        const listItem = event.target.closest("li");

        if (!listItem) {
            return;
        }

        if (event.target.classList.contains("delete-task-button")) {
            listItem.remove();
        } else {
            listItem.classList.toggle("completed");
        }

        saveTasks();
        updateProgress();
        updateDashboardOverview();
    });

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task.text, task.completed, task.priority || "medium");
    });
}


// WEEKLY TIMETABLE

const activityInput = document.querySelector("#activity-input");
const dayInput = document.querySelector("#day-input");
const timeInput = document.querySelector("#time-input");
const addActivityButton = document.querySelector("#add-activity-button");
const scheduleList = document.querySelector("#schedule-list");

function saveSchedule() {
    if (!scheduleList) {
        return;
    }

    localStorage.setItem("schedule", scheduleList.innerHTML);
}

function addScheduleActivity(day, time, activity) {
    if (!scheduleList) {
        return;
    }

    const listItem = document.createElement("li");
    const activityText = document.createElement("span");

    activityText.textContent = day + " - " + time + " - " + activity;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-activity-button";

    listItem.appendChild(activityText);
    listItem.appendChild(deleteButton);

    scheduleList.appendChild(listItem);

    saveSchedule();
    updateDashboardOverview();
}

if (scheduleList) {
    const savedSchedule = localStorage.getItem("schedule");

    if (savedSchedule) {
        scheduleList.innerHTML = savedSchedule;
    }
}

if (addActivityButton) {
    addActivityButton.addEventListener("click", function () {
        const activity = activityInput.value.trim();
        const day = dayInput.value;
        const time = timeInput.value;

        if (activity === "" || day === "" || time === "") {
            alert("Please complete all fields.");
            return;
        }

        addScheduleActivity(day, time, activity);

        activityInput.value = "";
        dayInput.value = "";
        timeInput.value = "";
    });
}

if (scheduleList) {
    scheduleList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-activity-button")) {
            event.target.closest("li").remove();

            saveSchedule();
            updateDashboardOverview();
        }
    });
}

const clearScheduleButton = document.querySelector("#clear-schedule-button");

if (clearScheduleButton) {
    clearScheduleButton.addEventListener("click", function () {
        const confirmClear = confirm(
            "Are you sure you want to clear all activities?"
        );

        if (confirmClear) {
            scheduleList.innerHTML = "";
            localStorage.removeItem("schedule");

            updateDashboardOverview();
        }
    });
}


// ACADEMIC PERFORMANCE

const subjectInput = document.querySelector("#subject-input");
const gradeInput = document.querySelector("#grade-input");
const thresholdInput = document.querySelector("#threshold-input");
const addGradeButton = document.querySelector("#add-grade-button");
const gradeList = document.querySelector("#grade-list");

function saveGrades() {
    if (!gradeList) {
        return;
    }

    const grades = [];

    gradeList.querySelectorAll("li").forEach(item => {
        const gradeText = item.querySelector(".grade-text");

        if (gradeText) {
            grades.push(gradeText.textContent);
        }
    });

    localStorage.setItem("grades", JSON.stringify(grades));
}

function createGradeItem(grade) {
    if (!gradeList) {
        return;
    }

    const listItem = document.createElement("li");

    const gradeText = document.createElement("span");
    gradeText.className = "grade-text";
    gradeText.textContent = grade;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-grade-button";

    listItem.appendChild(gradeText);
    listItem.appendChild(deleteButton);

    gradeList.appendChild(listItem);
}

if (addGradeButton) {
    addGradeButton.addEventListener("click", function () {
        const subject = subjectInput.value.trim();
        const grade = Number(gradeInput.value);
        const threshold = Number(thresholdInput.value);

        if (
            subject === "" ||
            gradeInput.value === "" ||
            thresholdInput.value === "" ||
            !Number.isFinite(grade) ||
            !Number.isFinite(threshold) ||
            grade < 0 ||
            grade > 100 ||
            threshold < 0 ||
            threshold > 100
        ) {
            alert("Please enter valid information. Grades must be between 0 and 100.");
            return;
        }

        let message;

        if (grade < threshold) {
            message = "Needs improvement";
        } else {
            message = "Good progress";
        }

        const gradeInformation =
            subject + ": " + grade + "/100 - " + message;

        createGradeItem(gradeInformation);
        saveGrades();

        subjectInput.value = "";
        gradeInput.value = "";
    });
}

if (gradeList) {
    const savedGrades = JSON.parse(localStorage.getItem("grades")) || [];

    savedGrades.forEach(grade => {
        const cleanGrade = grade.replace(/(Delete)+$/, "");
        createGradeItem(cleanGrade);
    });

    gradeList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-grade-button")) {
            event.target.closest("li").remove();
            saveGrades();
        }
    });
}


// SMART PLANNER

const generatePlanButton = document.querySelector("#generate-plan-button");
const planList = document.querySelector("#plan-list");

function generateStudyPlan() {
    if (!planList) {
        return;
    }

    planList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const pendingTasks = tasks.filter(task => !task.completed);

    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
    };

    pendingTasks.sort((a, b) => {
        return (
            (priorityOrder[a.priority] || 2) -
            (priorityOrder[b.priority] || 2)
        );
    });

    if (pendingTasks.length === 0) {
        planList.textContent = "No pending tasks. You are all caught up!";
        return;
    }

    pendingTasks.forEach(task => {
        const listItem = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const priorityLabel = document.createElement("small");
        priorityLabel.textContent = "Priority: " + task.priority;

        listItem.appendChild(taskText);
        listItem.appendChild(priorityLabel);

        planList.appendChild(listItem);
    });
}

if (generatePlanButton) {
    generatePlanButton.addEventListener("click", generateStudyPlan);
}



// ADAPTIVE RESCHEDULING

const missedActivityInput = document.querySelector("#missed-activity-input");
const newDayInput = document.querySelector("#new-day-input");
const newTimeInput = document.querySelector("#new-time-input");
const rescheduleButton = document.querySelector("#reschedule-button");

if (rescheduleButton) {
    rescheduleButton.addEventListener("click", function () {
        const activity = missedActivityInput.value.trim();
        const day = newDayInput.value;
        const time = newTimeInput.value;

        if (activity === "" || day === "" || time === "") {
            alert("Please complete all fields.");
            return;
        }

        addScheduleActivity(day, time, activity);

        missedActivityInput.value = "";
        newDayInput.value = "";
        newTimeInput.value = "";

        alert("The activity has been added to your new schedule!");
    });
}


// SMART MOTIVATION

const motivationMessage = document.querySelector("#motivation-message");
const inspireButton = document.querySelector("#inspire-button");

const motivationMessages = [
    "Small steps every day lead to big achievements.",
    "Stay focused. Your future is worth the effort.",
    "Progress is better than perfection.",
    "Your goals deserve your consistency.",
    "You do not have to be perfect. Just keep improving."
];

function showMotivation() {
    if (!motivationMessage) {
        return;
    }

    const randomIndex = Math.floor(
        Math.random() * motivationMessages.length
    );

    motivationMessage.textContent = motivationMessages[randomIndex];
}

if (inspireButton) {
    inspireButton.addEventListener("click", showMotivation);
}

showMotivation();


// FINAL DASHBOARD UPDATE

updateDashboardOverview();
updateProgress();
