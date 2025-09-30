// Sports teams data by city
const data = {
  "boston": {
    sports: [
      { name: "Basketball (Celtics)", teamId: "bos_celtics" },
      { name: "Baseball (Red Sox)", teamId: "bos_redsox" },
      { name: "Hockey (Bruins)", teamId: "bos_bruins" },
      { name: "Football (Patriots)", teamId: "ne_patriots" }
    ]
  },
  "new york": {
    sports: [
      { name: "Basketball (Knicks)", teamId: "nyk" },
      { name: "Basketball (Nets)", teamId: "bkn" },
      { name: "Baseball (Yankees)", teamId: "nyy" },
      { name: "Baseball (Mets)", teamId: "nym" },
      { name: "Football (Giants)", teamId: "nyg" },
      { name: "Football (Jets)", teamId: "nyj" },
      { name: "Hockey (Rangers)", teamId: "nyr" },
      { name: "Hockey (Islanders)", teamId: "nyi" }
    ]
  },
  "los angeles": {
    sports: [
      { name: "Basketball (Lakers)", teamId: "lal" },
      { name: "Basketball (Clippers)", teamId: "lac" },
      { name: "Baseball (Dodgers)", teamId: "lad" },
      { name: "Football (Rams)", teamId: "lar" },
      { name: "Football (Chargers)", teamId: "lac_football" },
      { name: "Hockey (Kings)", teamId: "lak" }
    ]
  },
  "chicago": {
    sports: [
      { name: "Basketball (Bulls)", teamId: "chi_bulls" },
      { name: "Baseball (Cubs)", teamId: "chi_cubs" },
      { name: "Baseball (White Sox)", teamId: "chi_whitesox" },
      { name: "Football (Bears)", teamId: "chi_bears" },
      { name: "Hockey (Blackhawks)", teamId: "chi_blackhawks" }
    ]
  }
};

// Example players per team
const players = {
  bos_celtics: [
    { name: "Jayson Tatum", height: "6'8", weight: "210 lbs", points: 1900 },
    { name: "Jaylen Brown", height: "6'6", weight: "223 lbs", points: 1600 }
  ],
  bos_redsox: [
    { name: "Rafael Devers", height: "6'0", weight: "240 lbs", points: 80 },
    { name: "Trevor Story", height: "6'2", weight: "213 lbs", points: 65 }
  ],
  ne_patriots: [
    { name: "Mac Jones", height: "6'3", weight: "214 lbs", points: 220 },
    { name: "Rhamondre Stevenson", height: "6'0", weight: "227 lbs", points: 180 }
  ],
  nyk: [
    { name: "Julius Randle", height: "6'8", weight: "250 lbs", points: 1700 },
    { name: "RJ Barrett", height: "6'6", weight: "214 lbs", points: 1400 }
  ],
  nyy: [
    { name: "Aaron Judge", height: "6'7", weight: "282 lbs", points: 100 },
    { name: "Giancarlo Stanton", height: "6'6", weight: "245 lbs", points: 90 }
  ],
  lal: [
    { name: "LeBron James", height: "6'9", weight: "250 lbs", points: 2100 },
    { name: "Anthony Davis", height: "6'10", weight: "253 lbs", points: 1800 }
  ],
  lad: [
    { name: "Mookie Betts", height: "5'9", weight: "180 lbs", points: 120 },
    { name: "Freddie Freeman", height: "6'5", weight: "220 lbs", points: 110 }
  ],
  chi_bulls: [
    { name: "Zach LaVine", height: "6'5", weight: "200 lbs", points: 1600 },
    { name: "DeMar DeRozan", height: "6'6", weight: "220 lbs", points: 1500 }
  ],
  chi_bears: [
    { name: "Justin Fields", height: "6'3", weight: "228 lbs", points: 280 },
    { name: "DJ Moore", height: "6'0", weight: "210 lbs", points: 240 }
  ]
};

// Search function with flexible matching
function searchCity() {
  const city = document.getElementById("cityInput").value.toLowerCase().trim();

  // Find closest city match
  const foundCity = Object.keys(data).find(c => city.includes(c));

  if (foundCity) {
    document.getElementById("searchPage").style.display = "none";
    document.getElementById("sportsPage").style.display = "block";
    document.getElementById("cityName").textContent = foundCity;

    const sportsList = document.getElementById("sportsList");
    sportsList.innerHTML = "";
    data[foundCity].sports.forEach(sport => {
      const btn = document.createElement("button");
      btn.textContent = sport.name;
      btn.onclick = () => showTeam(sport.teamId, sport.name);
      sportsList.appendChild(btn);
    });
  } else {
    alert("City not found in data!");
  }
}

function showTeam(teamId, sportName) {
  document.getElementById("sportsPage").style.display = "none";
  document.getElementById("teamPage").style.display = "block";
  document.getElementById("teamName").textContent = sportName;

  const playersList = document.getElementById("playersList");
  playersList.innerHTML = "";
  (players[teamId] || []).forEach(player => {
    const div = document.createElement("div");
    div.className = "playerCard";
    div.innerHTML = `
      <h3>${player.name}</h3>
      <p>Height: ${player.height}</p>
      <p>Weight: ${player.weight}</p>
      <p>Fantasy Points: ${player.points}</p>
    `;
    playersList.appendChild(div);
  });
}

// Navigation helpers
function goBack() {
  document.getElementById("sportsPage").style.display = "none";
  document.getElementById("searchPage").style.display = "block";
}

function goBackToSports() {
  document.getElementById("teamPage").style.display = "none";
  document.getElementById("sportsPage").style.display = "block";
}

