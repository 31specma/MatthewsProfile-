// Mock data
const data = {
  "new york": {
    sports: [
      { name: "Basketball", teamId: "nyk" },
      { name: "Baseball", teamId: "nyy" }
    ]
  },
  "los angeles": {
    sports: [
      { name: "Basketball", teamId: "lal" },
      { name: "Baseball", teamId: "lad" }
    ]
  }
};

const players = {
  nyk: [
    { name: "Player A", height: "6'6", weight: "210 lbs", points: 500 },
    { name: "Player B", height: "6'2", weight: "190 lbs", points: 300 }
  ],
  nyy: [
    { name: "Player C", height: "6'1", weight: "200 lbs", points: 250 },
    { name: "Player D", height: "6'0", weight: "180 lbs", points: 220 }
  ]
};

// Navigation
function searchCity() {
  const city = document.getElementById("cityInput").value.toLowerCase();
  if (data[city]) {
    document.getElementById("searchPage").style.display = "none";
    document.getElementById("sportsPage").style.display = "block";
    document.getElementById("cityName").textContent = city;

    const sportsList = document.getElementById("sportsList");
    sportsList.innerHTML = "";
    data[city].sports.forEach(sport => {
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

// Back navigation
function goBack() {
  document.getElementById("sportsPage").style.display = "none";
  document.getElementById("searchPage").style.display = "block";
}

function goBackToSports() {
  document.getElementById("teamPage").style.display = "none";
  document.getElementById("sportsPage").style.display = "block";
}
