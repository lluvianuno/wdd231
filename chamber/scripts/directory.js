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


// ---------- MEMBERS DIRECTORY ----------
const cards = document.querySelector('#cards');

// async / await + fetch (REQUIRED)
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

getMembers();


// ---------- DISPLAY MEMBERS ----------
function displayMembers(members) {
  members.forEach(member => {
    const card = document.createElement('section');

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.loading = 'lazy';

    const name = document.createElement('h2');
    name.textContent = member.name;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = member.phoneNumber;

    const website = document.createElement('a');
    website.href = member.website;
    website.textContent = member.website;
    website.target = '_blank';

    card.append(img, name, address, phone, website);
    cards.appendChild(card);
  });
}


// ---------- GRID / LIST TOGGLE ----------
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

// Default view
cards.classList.add('grid');

gridButton.addEventListener('click', () => {
  cards.classList.add('grid');
  cards.classList.remove('list');
});

listButton.addEventListener('click', () => {
  cards.classList.add('list');
  cards.classList.remove('grid');
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