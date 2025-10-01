// -----------------------------
// API-powered Sports Fan App
// -----------------------------
const API_KEY = "1"; // free demo key from TheSportsDB

// Teams grouped by city
const data = {
  "boston": ["Boston Celtics", "Boston Red Sox", "Boston Bruins", "New England Patriots"],
  "new york": ["New York Knicks", "Brooklyn Nets", "New York Yankees", "New York Mets", "New York Giants", "New York Jets", "New York Rangers", "New York Islanders"],
  "los angeles": ["Los Angeles Lakers", "Los Angeles Clippers", "Los Angeles Dodgers", "Los Angeles Rams", "Los Angeles Chargers", "Los Angeles Kings"],
  "chicago": ["Chicago Bulls", "Chicago Cubs", "Chicago White Sox", "Chicago Bears", "Chicago Blackhawks"]
};

/* ---------- DOM helpers ---------- */
const $ = id => document.getElementById(id);
const show = id => { $(id).style.display = 'block'; };
const hide = id => { $(id).style.display = 'none'; };

/* ---------- Search logic ---------- */
function searchCity() {
  const raw = $('cityInput').value.toLowerCase().trim();
  if (!raw) {
    alert('Please enter a city name (e.g. Boston)');
    return;
  }

  const foundKey = Object.keys(data).find(k => raw.includes(k));
  if (!foundKey) {
    alert('City not found in data!');
    return;
  }

  $('cityName').textContent = capitalize(foundKey);
  const list = $('sportsList');
  list.innerHTML = '';

  data[foundKey].forEach(teamName => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="cardTitle">${teamName}</div>
      <button>View Team</button>
    `;
    card.querySelector("button").onclick = () => showTeam(teamName);
    list.appendChild(card);
  });

  hide('searchPage');
  show('sportsPage');
}

/* ---------- Fetch roster ---------- */
async function fetchTeamPlayers(teamName) {
  try {
    const teamRes = await fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchteams.php?t=${encodeURIComponent(teamName)}`);
    const teamData = await teamRes.json();
    if (!teamData.teams) return [];

    const teamId = teamData.teams[0].idTeam;

    const playersRes = await fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookup_all_players.php?id=${teamId}`);
    const playersData = await playersRes.json();
    return playersData.player || [];
  } catch (err) {
    console.error("Error fetching players:", err);
    return [];
  }
}

/* ---------- Fetch player details ---------- */
async function fetchPlayerDetails(playerId) {
  try {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookupplayer.php?id=${playerId}`);
    const data = await res.json();
    return data.players ? data.players[0] : null;
  } catch (err) {
    console.error("Error fetching player:", err);
    return null;
  }
}

/* ---------- Team page ---------- */
async function showTeam(teamName) {
  $('teamName').textContent = teamName;
  $('playersList').innerHTML = "Loading...";

  const roster = await fetchTeamPlayers(teamName);
  $('playersList').innerHTML = "";

  if (roster.length === 0) {
    $('playersList').innerHTML = `<div class="empty">No players found.</div>`;
    return;
  }

  roster.forEach(p => {
    const card = document.createElement("div");
    card.className = "playerCard";
    card.innerHTML = `
      <h3>${p.strPlayer}</h3>
      <p>${p.strPosition || "N/A"}</p>
      <img src="${p.strCutout || p.strThumb || ""}" alt="${p.strPlayer}" style="max-height:100px;">
    `;
    card.onclick = () => showPlayerDetails(p.idPlayer);
    $('playersList').appendChild(card);
  });

  hide('sportsPage');
  show('teamPage');
}

/* ---------- Player detail page ---------- */
async function showPlayerDetails(playerId) {
  $('playerDetails').innerHTML = "Loading...";

  const player = await fetchPlayerDetails(playerId);
  if (!player) {
    $('playerDetails').innerHTML = "<p>No details available.</p>";
    return;
  }

  $('playerDetails').innerHTML = `
    <h2>${player.strPlayer}</h2>
    <img src="${player.strCutout || player.strThumb || ""}" alt="${player.strPlayer}" style="max-height:150px;">
    <p><strong>Team:</strong> ${player.strTeam || "N/A"}</p>
    <p><strong>Position:</strong> ${player.strPosition || "N/A"}</p>
    <p><strong>Height:</strong> ${player.strHeight || "N/A"}</p>
    <p><strong>Weight:</strong> ${player.strWeight || "N/A"}</p>
    <p><strong>Nationality:</strong> ${player.strNationality || "N/A"}</p>
    <h3>Reports</h3>
    <p>${player.strDescriptionEN ? player.strDescriptionEN.slice(0, 500) + "..." : "No recent reports available."}</p>
  `;

  hide('teamPage');
  show('playerPage');
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
function goBackToTeam() {
  hide('playerPage');
  show('teamPage');
}

/* ---------- Utils ---------- */
function capitalize(s) {
  return s.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

/* ---------- Wire buttons ---------- */
$('searchBtn').addEventListener('click', searchCity);
$('cityInput').addEventListener('keydown', e => { if (e.key === 'Enter') searchCity(); });
$('backToSearch').addEventListener('click', goBackToSearch);
$('backToSports').addEventListener('click', goBackToSports);
$('backToTeam').addEventListener('click', goBackToTeam);
