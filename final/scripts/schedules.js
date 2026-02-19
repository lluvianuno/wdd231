const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").textContent =
  "Last Modification: " + lastModified.toLocaleString();

//Hamb Button
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

const scheduleContainer = document.querySelector("#schedule-container");

async function getSchedule() {
    try {
        const response = await fetch("./data/schedule.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displaySchedule(data.schedule);

    } catch (error) {
        console.error("Error loading schedule:", error);
        if (scheduleContainer) {
            scheduleContainer.innerHTML = "<p>Unable to load schedule at this time.</p>";
        }
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

function visitMessage() {
    try {
        const visitMessage = document.querySelector('#visit-message');
        if (!visitMessage) return;

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
                visitMessage.style.transition = "opacity 0.5s ease";
                visitMessage.style.opacity = "0";
            }, 4000);
        }

        localStorage.setItem('lastVisit', currentVisit);

    } catch (error) {
        console.error("Error handling visit message:", error);
    }
}

visitMessage();
