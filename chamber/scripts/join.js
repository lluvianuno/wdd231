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
