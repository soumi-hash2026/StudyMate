# StudyMate – Student Life Planner

**Plan smarter, study better, live better.**

## About the Project

StudyMate is a student life planner designed to help students organize their academic responsibilities while maintaining a healthy balance between studying and personal activities.

Students often struggle to manage assignments, revision sessions, university classes, and personal commitments.

StudyMate provides a simple and practical solution by bringing these activities together in one website.

The main goal is to help students manage their time effectively, stay organized, and improve their academic performance.

## Main Features

### 1. Dashboard
- Displays the current date and a time-based greeting.
- Shows the total number of tasks.
- Displays the number of completed tasks.
- Shows the number of scheduled activities.
- Provides a quick overview of student activities.

### 2. Task Management
- Add academic and personal tasks.
- Set task priorities: High, Medium, or Low.
- Mark tasks as completed.
- Delete tasks when they are no longer needed.

### 3. Weekly Timetable
- Add activities to specific days and times.
- Organize academic and personal activities.
- Delete individual activities.
- Clear the entire timetable.

### 4. Adaptive Rescheduling
- Add missed or postponed activities to a new day and time.
- Adjust the schedule when plans change.
- Helps students reorganize their activities.

### 5. Academic Performance
- Record grades for different subjects.
- Set a personal grade target (default: 74%).
- Identify subjects that need improvement.
- Display a result based on the selected target:
  - Needs improvement
  - Good progress

### 6. Smart Planner
- Retrieves pending tasks.
- Sorts tasks according to priority: High, Medium, and Low.
- Helps students decide what to focus on first.

### 7. Smart Motivation
- Displays randomly selected motivational messages.
- Provides a button to display another message.
- Includes a daily challenge to encourage students to complete important tasks.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Creates the structure of the website |
| CSS3 | Handles the design and responsive layout |
| JavaScript | Adds functionality and interactivity |
| LocalStorage | Saves information in the browser |

## Project Structure

```text
StudyMate/
│
├── index.html
├── tasks.html
├── timetable.html
├── performance.html
├── planner.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── README.md
```

## How to Run the Project

1. Download or clone the repository.
2. Open the StudyMate folder in Visual Studio Code.
3. Open `index.html` in a web browser.
4. Navigate through the different pages.
5. Start organizing your academic and personal activities!

## Data Storage

StudyMate uses the browser's LocalStorage to save tasks, timetable activities, and academic grades.

This allows information to remain available when the user closes and reopens the website in the same browser and on the same device, as long as the browser data is not cleared.

Currently, information is stored locally and is not synchronized across different devices.

## Future Improvements

StudyMate can be developed further with:

- Automatic timetable generation based on student availability.
- More personalized planning suggestions.
- Advanced adaptive rescheduling.
- Multilingual support.
- AI-powered recommendations.
- Cloud storage and synchronization.

These improvements could make StudyMate more intelligent and personalized in the future.

## Project Status

**Status:** Functional Web Development project.

StudyMate is developed as part of the S4 Web Development project at DAUST using HTML, CSS, and JavaScript.

---

**StudyMate – Because academic success requires more than hard work. It requires smart planning.**