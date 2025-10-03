// -----------------------------
// Hardcoded Sports Data
// -----------------------------
const TEAM_DATA = {
  "boston": {
    teams: [
      {
        name: "Boston Celtics",
        sport: "basketball",
        roster: [
          { name: "Jayson Tatum", position: "F", height: "6'8\"", weight: "210 lbs", fantasyPoints: 1900 },
          { name: "Jaylen Brown", position: "F", height: "6'6\"", weight: "223 lbs", fantasyPoints: 1600 }
        ]
      },
      {
        name: "Boston Red Sox",
        sport: "baseball",
        roster: [
          { name: "Rafael Devers", position: "3B", height: "6'0\"", weight: "240 lbs", fantasyPoints: 80 },
          { name: "Trevor Story", position: "SS", height: "6'2\"", weight: "213 lbs", fantasyPoints: 65 }
        ]
      }
    ]
  },
  "new york": {
    teams: [
      {
        name: "New York Knicks",
        sport: "basketball",
        roster: [
          { name: "Julius Randle", position: "F", height: "6'8\"", weight: "250 lbs", fantasyPoints: 1700 },
          { name: "RJ Barrett", position: "G/F", height: "6'6\"", weight: "214 lbs", fantasyPoints: 1400 }
        ]
      },
      {
        name: "New York Yankees",
        sport: "baseball",
        roster: [
          { name: "Aaron Judge", position: "OF", height: "6'7\"", weight: "282 lbs", fantasyPoints: 100 },
          { name: "Giancarlo Stanton", position: "OF", height: "6'6\"", weight: "245 lbs", fantasyPoints: 90 }
        ]
      }
    ]
  }
};

/* ---------- DOM helpers ---------- */
const $ = id => document.getElementById(id);
const show = id => { $(id).style.display = 'block'; };
const hide = id => { $(id).style.display = 'none'; };

/* ---------- Search logic ---------- */
function searchCity() {
  const raw = $('cityInput').value.toLowerCase().trim();
  const city = TEAM_DATA[raw];
  if (!city) {
    alert('City not found!');
    return;
  }

  $('cityName').textContent = raw.charAt(0).toUpperCase() + raw.slice(1);
  const list = $('sportsList');
  list.innerHTML = '';

  city.teams.forEach(team => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="cardTitle">${team.name}</div>
      <button>View Team</button>
    `;
    card.querySelector('button').onclick = () => showTeam(team);
    list.appendChild(card);
  });

  hide('searchPage');
  show('sportsPage');
}

/* ---------- Team page ---------- */
function showTeam(team) {
  $('teamName').textContent = team.name;
  const list = $('playersList');
  list.innerHTML = '';

  team.roster.forEach(player => {
    const card = document.createElement('div');
    card.className = 'playerCard';
    card.innerHTML = `
      <h3>${player.name}</h3>
      <p>Position: ${player.position}</p>
      <p>Height: ${player.height}</p>
      <p>Weight: ${player.weight}</p>
      <p>Fantasy Points: ${player.fantasyPoints}</p>
    `;
    list.appendChild(card);
  });

  hide('sportsPage');
  show('teamPage');
}

/* ---------- Navigation helpers ---------- */
function goBackToSearch() {
  hide('sportsPage');
  show('searchPage');
}
function goBackToSports() {
  hide('teamPage');
  show('sportsPage');
}

/* ---------- Wire buttons ---------- */
$('searchBtn').addEventListener('click', searchCity);
$('cityInput').addEventListener('keydown', e => { if (e.key === 'Enter') searchCity(); });
$('backToSearch').addEventListener('click', goBackToSearch);
$('backToSports').addEventListener('click', goBackToSports);
