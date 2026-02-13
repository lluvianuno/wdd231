// ---------- FOOTER DATES ----------
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").textContent =
  "Last Modification: " + lastModified.toLocaleString();


// ---------- HAMBURGER MENU ----------
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  navlinks.classList.toggle('show');
});

// ---------- IMPORT & DISPLAY ----------
import { interest } from '../data/interest.mjs';

const cardsContainer = document.querySelector('#display-cards');

function displayItems(items) {
    if (!cardsContainer) return;
    
    cardsContainer.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement('section');
        card.className = "discover-card";

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;
        
        cardsContainer.appendChild(card);
    });
}

displayItems(interest.itemOfInterest);

// ---------- DISCOVER PAGE FORM DIALOGUES ----------

const dialogBox = document.querySelector('#dialogBox');
const dialogText = document.querySelector('#dialogBox div');
const closeButton = document.querySelector('#closeButton');

cardsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('learn-more-btn')) {
      dialogText.innerHTML = "More information coming soon. Stay tuned for updates on this exciting addition to our Discover page!";
      dialogBox.showModal();
  }
});

closeButton.addEventListener('click', () => {
  dialogBox.close();
});

// ---------- VISIT MESSAGE USING LOCALSTORAGE ----------

const visitMessage = document.querySelector('#visit-message');

const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";} else {
    const timeDifference = currentVisit - Number(lastVisit);

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }

    closeButton.addEventListener('click', () => {
        dialogBox.close();
    });

}

// Store current visit time
localStorage.setItem('lastVisit', currentVisit);
