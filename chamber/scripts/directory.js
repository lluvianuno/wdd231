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

const cards = document.querySelector('#cards');

async function getMemberData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
}

getMemberData();

const displayMembers = (members) => {
    members.forEach((member) => {

        const card = document.createElement('section');
        const name = document.createElement('h2');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const email = document.createElement('a');
        const website = document.createElement('a');
        const image = document.createElement('img');
        card.classList.add('member-card');
        
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phoneNumber;
        email.href = `mailto:${member.email}`;
        email.textContent = member.email;
        website.href = member.website;
        website.textContent = 'Visit Website';
        website.target = '_blank';
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = 'lazy';

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(document.createElement('br'));
        card.appendChild(website);

        cards.appendChild(card);
    });
};
