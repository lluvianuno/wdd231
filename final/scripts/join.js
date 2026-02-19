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

// ---------- JOIN PAGE FORM DIALOGUES ----------
const openButton1 = document.querySelector('#openButton1');
const openButton2 = document.querySelector('#openButton2');
const openButton3 = document.querySelector('#openButton3');
const openButton4 = document.querySelector('#openButton4');

const dialogBox = document.querySelector('#dialogBox');
const dialogText = document.querySelector('#dialogBox div');
const closeButton = document.querySelector('#closeButton');

if (openButton1 && openButton2 && openButton3 && openButton4 && dialogBox && dialogText && closeButton) {
  openButton1.addEventListener('click', () => {
      dialogText.innerHTML = "Ideal for begginers who are just starting in this sport. I you are over 12 you will join your corresponding age team when you play better!";
      dialogBox.showModal();
  });

  openButton2.addEventListener('click', () => {
      dialogText.innerHTML = "Ideal for intermediate level players who know some stuff. I you are over 14 you will join your corresponding age team when you play better!";
      dialogBox.showModal();
  });

  openButton3.addEventListener('click', () => {
      dialogText.innerHTML = "Ideal for advanced players who are already familiar with this sport. I you are over 16 you will join your corresponding age team when you play better!";
      dialogBox.showModal();
  });

  openButton4.addEventListener('click', () => {
      dialogText.innerHTML = "Ideal for advanmced players who know their way arount this sport. I you are over 19 it doesen't matter as long as you are okay with that!";
      dialogBox.showModal();
  });

  closeButton.addEventListener('click', () => {
      dialogBox.close();
  });
}

// ---------- THANK YOU PAGE DATA ----------

//const getString = window.location.search;
//console.log(getString);

function displayFormResults() {
    try {
        const myInfo = new URLSearchParams(window.location.search);
        const results = document.querySelector('#results');

        if (!results) return;

        results.innerHTML = `
            <h2>Submitted Information:</h2>
            <p><strong>Player's Name:</strong> ${myInfo.get('firstName')} ${myInfo.get('lastName')}</p>
            <p><strong>Organization Player's Age:</strong> ${myInfo.get('age')}</p>
            <p><strong>Parent's Name:</strong> ${myInfo.get('pFirstName')} ${myInfo.get('pLastName')}</p>
            <p><strong>Parent's Email:</strong> ${myInfo.get('email')}</p>
            <p><strong>Telephone:</strong> ${myInfo.get('phone')}</p>
            <p><strong>Business Chosen Team:</strong> ${myInfo.get('desiredTeam')}</p>
        `;

    } catch (error) {
        console.error("Error displaying form results:", error);
    }
}

displayFormResults();


// ------------ TIMESTAMP FORMS ----------
document.addEventListener("DOMContentLoaded", () => {
  const timestampDisplay = document.querySelector('#timestampDisplay');

  if (timestampDisplay) {
    const now = new Date();
    timestampDisplay.textContent = `Form submitted on: ${now.toLocaleString()}`;
  }
});

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