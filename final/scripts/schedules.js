const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").textContent =
  "Last Modification: " + lastModified.toLocaleString();

//Store the selected elements we are going to use.
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

//Toggle the show class of and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

//SCHEDULES DISPLAY

const scheduleContainer = document.querySelector("#schedule-container");

async function getSchedule() {
    try {
        const response = await fetch("./data/schedule.json");
        const data = await response.json();
        displaySchedule(data.schedule);
    } catch (error) {
        console.error("Error loading schedule:", error);
    }
}

function displaySchedule(scheduleArray) {
    scheduleArray.forEach(session => {

        const card = document.createElement("div");
        card.classList.add("schedule-card");

        card.innerHTML = `
            <h4>${session.team}</h4>
            <p><strong>Day:</strong> ${session.day}</p>
            <p><strong>Time:</strong> ${session.time}</p>
            <p><strong>Duration:</strong> ${session.duration} minutes</p>
            <p><strong>Coach:</strong> ${session.coach}</p>
            <p><strong>Court:</strong> ${session.court}</p>
        `;

        scheduleContainer.appendChild(card);
    });
}

getSchedule();

// ---------- VISIT MESSAGE USING LOCALSTORAGE ----------

const visitMessage = document.querySelector('#visit-message');

const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Join us!";
    } else if (daysDifference === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
    setTimeout(() => {
    visitMessage.style.opacity = "0";
    visitMessage.style.transition = "opacity 0.5s ease";

    // Opcional: quitarlo completamente del DOM después del fade
    setTimeout(() => {
        visitMessage.style.display = "none";
    }, 500);

}, 4000);

}

localStorage.setItem('lastVisit', currentVisit);
