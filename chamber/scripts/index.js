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

// async / await + fetch
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

function displayMembers(members) {
  members.slice(0, 3).forEach(member => {
    const card = document.createElement('section');

    const name = document.createElement('h2');
    name.textContent = member.name;

    const level = document.createElement('p');
    level.innerHTML = `<strong>Membership:</strong> ${getMembershipLabel(member.membershipLevel)}`;

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.loading = 'lazy';

    const email = document.createElement('p');
    email.innerHTML = `<strong>Email:</strong> ${member.email}`;

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${member.phoneNumber}`;

    const website = document.createElement('p');
    website.innerHTML = `<strong>Website:</strong> `;
    const link = document.createElement('a');
    link.href = member.website;
    link.textContent = member.website;
    link.target = '_blank';
    website.appendChild(link);

    card.append(img, name, level, email, phone, website);
    cards.appendChild(card);
  });
}

getMembers();


// ---------- SPOTLIGHT MEMBERS ----------
const spotlightsContainer = document.querySelector('#cards');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();

    // Gold (3) and Silver (2) members only
    const qualifiedMembers = data.members.filter(member =>
      member.membershipLevel === 3 || member.membershipLevel === 2
    );

    // Randomize order
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // Show 2 or 3 spotlights
    const count = Math.floor(Math.random() * 2) + 2;
    const selected = shuffled.slice(3, count);

    displaySpotlights(selected);
  } catch (error) {
    console.error('Error fetching spotlight data:', error);
  }
}

function displaySpotlights(members) {
  members.forEach(member => {
    const card = document.createElement('section');

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.loading = 'lazy';

    const name = document.createElement('h2');
    name.textContent = member.name;

    const level = document.createElement('p');
    level.innerHTML = `<strong>Membership:</strong> ${getMembershipLabel(member.membershipLevel)}`;

    const address = document.createElement('p');
    address.innerHTML = `<strong>Address:</strong> ${member.address}`;

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${member.phoneNumber}`;

    const website = document.createElement('p');
    website.innerHTML = `<strong>Website:</strong> `;
    const link = document.createElement('a');
    link.href = member.website;
    link.textContent = member.website;
    link.target = '_blank';
    website.appendChild(link);

    card.append(img, name, level, address, phone, website);
    spotlightsContainer.appendChild(card);
  });
}

getSpotlights();


// ---------- MEMBERSHIP LEVEL LABEL ----------
function getMembershipLabel(level) {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
}



//WEATHER

const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#graphic");

//Variables for the URL
const myKey = "dcd6ebe1c0c6f95ec6e25badcbaca74f"
const myLat = "25.544185315575902"
const myLong = "-103.39904869014748"
const units = "metric";

//FULL PATRH USING TEMPLATE LITERALS

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=${units}&appid=${myKey}`;
    const response = await fetch(url);
    const data = await response.json();

    displayCurrentWeather(data);
    displayForecast(data);

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeather();

//WEATHER DATA

function displayCurrentWeather(data) {
  const weather = data.list[0];

    const icon = weather.weather[0].icon;
    const img = document.querySelector("#graphic");
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    img.alt = weather.weather[0].description;


  document.querySelector("#temperature").textContent =
    `${weather.main.temp.toFixed(1)} °C`;

  document.querySelector("#high").textContent =
    `High: ${weather.main.temp_max.toFixed(1)} °C`;

  document.querySelector("#low").textContent =
    `Low: ${weather.main.temp_min.toFixed(1)} °C`;

  document.querySelector("#humidity").textContent =
    `Humidity: ${weather.main.humidity}%`;

  document.querySelector("#description").textContent =
    `${weather.weather[0].description}`;

  // Sunrise & Sunset (convert UNIX time)
  const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.city.sunset * 1000).toLocaleTimeString();

  document.querySelector("#sunrise").textContent =
    `Sunrise: ${sunriseTime}`;

  document.querySelector("#sunset").textContent =
    `Sunset: ${sunsetTime}`;
}


//3 DAY FORECAST

function displayForecast(data) {
  const forecastContainer = document.querySelector("#forecast");
  forecastContainer.innerHTML = "";

  const days = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];

    if (!days[date] && Object.keys(days).length < 3) {
      days[date] = item.main.temp;
    }
  });

  Object.entries(days).forEach(([date, temp]) => {
    const p = document.createElement("p");

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long"
    });

    p.textContent = `${formattedDate}: ${temp.toFixed(1)} °C`;
    forecastContainer.appendChild(p);
  });
}