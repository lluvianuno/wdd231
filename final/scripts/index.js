import { offersArray } from '../data/cards.mjs';

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

//OFFERING CARDS DISPLAY, IMPORT AND FETCH
const cardsContainer = document.querySelector('#display-offerings');


function displayItems(offersArray) {
    if (!cardsContainer) return;

    offersArray.forEach(offer => {
        const card = document.createElement('section');
        card.className = "index-card";

        card.innerHTML = `
            <h4>${offer.name}</h4>
            <figure>
                <img src="images/${offer.image}" alt="${offer.name}" loading="lazy" width="190px" height="250">
            </figure>
            <p>${offer.phrase}</p>
            <p>${offer.description}</p>
        `;
        
        cardsContainer.appendChild(card);
    });
}

displayItems(offersArray.offer);

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


