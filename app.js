// -----------------------------
// Hardcoded Team Data (Option B)
// -----------------------------
const TEAM_DATA = {
  "boston": {
    teams: [
      // NBA
      {
        name: "Boston Celtics",
        sport: "basketball",
        roster: [
          { name: "Jayson Tatum", position: "F", height: "6'8\"", weight: "210 lbs", fantasyPoints: 1900 },
          { name: "Jaylen Brown", position: "F", height: "6'6\"", weight: "223 lbs", fantasyPoints: 1600 },
          { name: "Anfernee Simons", position: "G", height: "6'3\"", weight: "200 lbs", fantasyPoints: 1300 },
          { name: "Xavier Tillman", position: "C", height: "6'7\"", weight: "245 lbs", fantasyPoints: 1100 },
          { name: "Max Shulga", position: "G", height: "6'5\"", weight: "210 lbs", fantasyPoints: 1000 }
        ]
      },
      // MLB
      {
        name: "Boston Red Sox",
        sport: "baseball",
        roster: [
          { name: "Rafael Devers", position: "3B", height: "6'0\"", weight: "240 lbs", fantasyPoints: 80 },
          { name: "Trevor Story", position: "SS", height: "6'2\"", weight: "213 lbs", fantasyPoints: 65 },
          { name: "Brayan Bello", position: "P", height: "6'1\"", weight: "195 lbs", fantasyPoints: 90 },
          { name: "Aroldis Chapman", position: "P", height: "6'4\"", weight: "235 lbs", fantasyPoints: 85 },
          { name: "Garrett Crochet", position: "P", height: "6'6\"", weight: "245 lbs", fantasyPoints: 80 }
        ]
      },
      // NHL
      {
        name: "Boston Bruins",
        sport: "hockey",
        roster: [
          { name: "Brad Marchand", position: "LW", height: "5'9\"", weight: "181 lbs", fantasyPoints: 95 },
          { name: "Patrice Bergeron", position: "C", height: "6'1\"", weight: "195 lbs", fantasyPoints: 100 },
          { name: "David Pastrnak", position: "RW", height: "6'0\"", weight: "175 lbs", fantasyPoints: 110 },
          { name: "Charlie McAvoy", position: "D", height: "6'1\"", weight: "203 lbs", fantasyPoints: 85 },
          { name: "Jeremy Swayman", position: "G", height: "6'3\"", weight: "205 lbs", fantasyPoints: 80 }
        ]
      },
      // NFL
      {
        name: "New England Patriots",
        sport: "football",
        roster: [
          { name: "Drake Maye", position: "QB", height: "6'5\"", weight: "220 lbs", fantasyPoints: 250 },
          { name: "Rhamondre Stevenson", position: "RB", height: "6'0\"", weight: "227 lbs", fantasyPoints: 180 },
          { name: "Hunter Henry", position: "TE", height: "6'5\"", weight: "255 lbs", fantasyPoints: 140 },
          { name: "Robert Spillane", position: "LB", height: "6'1\"", weight: "229 lbs", fantasyPoints: 150 },
          { name: "Brenden Schooler", position: "S", height: "6'1\"", weight: "210 lbs", fantasyPoints: 130 }
        ]
      }
    ]
  }
};

// -----------------------------
// DOM helpers
// -----------------------------
const $ = id => document.getElementById(id);
const show = id => $(id).style.display = 'block';
const hide = id => $(id).style.display = 'none';

// -----------------------------
// Search City
// -----------------------------
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
      <div><strong>${team.name}</strong> (${team.sport})</div>
      <button>View Team</button>
    `;
    card.querySelector('button').onclick = () => showTeam(team);
    list.appendChild(card);
  });

  hide('searchPage');
  show('sportsPage');
}

// -----------------------------
// Show Team Players
// -----------------------------
function showTeam(team) {
  $('teamName').textContent = team.name;
  const list = $('playersList');
  list.innerHTML = '';

  if (!team.roster || team.roster.length === 0) {
    list.innerHTML = '<p>No players found for this team.</p>';
    return;
  }

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

// -----------------------------
// Navigation
// -----------------------------
function goBackToSearch() {
  hide('sportsPage');
  show('searchPage');
}
function goBackToSports() {
  hide('teamPage');
  show('sportsPage');
}

// -----------------------------
// Event Listeners
// -----------------------------
$('searchBtn').addEventListener('click', searchCity);
$('cityInput').addEventListener('keydown', e => { if (e.key === 'Enter') searchCity(); });
$('backToSearch').addEventListener('click', goBackToSearch);
$('backToSports').addEventListener('click', goBackToSports);
