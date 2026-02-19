import { coachesArray } from '../data/cards.mjs';

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

const cardsContainer = document.querySelector('#coaches-display');

function displayItems(coachesArray) {
    try {
        if (!cardsContainer) return;

        coachesArray.forEach(coach => {
            const card = document.createElement('section');
            card.className = "coach-card";

            card.innerHTML = `
                <figure>
                    <img src="images/${coach.photo}" 
                         alt="${coach.coachName}" 
                         loading="lazy" 
                         width="190" 
                         height="250">
                </figure>
                <h4>${coach.coachName}</h4>
                <p>${coach.coachExp}</p>
                <p>${coach.aboutCoach}</p>
            `;

            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error displaying coaches:", error);
    }
}

displayItems(coachesArray.coach);

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
