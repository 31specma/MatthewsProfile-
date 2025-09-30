function searchCity() {
  const city = document.getElementById("cityInput").value.toLowerCase().trim();

  // try partial match
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
