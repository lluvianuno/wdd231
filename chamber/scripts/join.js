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
      dialogText.innerHTML = "Ideal for small businesses looking to establish a presence in the community. Enjoy basic listing features and access to networking events.";
      dialogBox.showModal();
  });

  openButton2.addEventListener('click', () => {
      dialogText.innerHTML = "Perfect for growing businesses that want more visibility and advanced features. Includes premium listing options and priority support.";
      dialogBox.showModal();
  });

  openButton3.addEventListener('click', () => {
      dialogText.innerHTML = "Designed for established businesses seeking maximum exposure and exclusive benefits. Gain access to top-tier networking opportunities and advertising options.";
      dialogBox.showModal();
  });

  openButton4.addEventListener('click', () => {
      dialogText.innerHTML = "Our Corporate Membership is tailored for large enterprises aiming to make a significant impact in the community. Enjoy comprehensive benefits, including multiple listings, event sponsorships, and dedicated account management.";
      dialogBox.showModal();
  });

  closeButton.addEventListener('click', () => {
      dialogBox.close();
  });
}

// ---------- THANK YOU PAGE DATA ----------

//const getString = window.location.search;
//console.log(getString);

const myInfo = new URLSearchParams(window.location.search);
//console.log(myInfo);

const results = document.querySelector('#results');
if (results) {
  results.innerHTML = `
      <h2>Submitted Information:</h2>
      <p><strong>Name:</strong> ${myInfo.get('firstName')} ${myInfo.get('lastName')}</p>
      <p><strong>Organization Title:</strong> ${myInfo.get('organization-title')}</p>
      <p><strong>Email:</strong> ${myInfo.get('email')}</p>
      <p><strong>Telephone:</strong> ${myInfo.get('phone')}</p>
      <p><strong>Business Name:</strong> ${myInfo.get('organization-name')}</p>
      <p><strong>Membership Type:</strong> ${myInfo.get('product')}</p>
      <p><strong>Business Description:</strong> ${myInfo.get('description')}</p>
  `;
}

// ------------ TIMESTAMP FORMS ----------
document.addEventListener("DOMContentLoaded", () => {
  const timestampDisplay = document.querySelector('#timestampDisplay');

  if (timestampDisplay) {
    const now = new Date();
    timestampDisplay.textContent = `Form submitted on: ${now.toLocaleString()}`;
  }
});
