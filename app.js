const searchFiled = document.getElementById('search-field');

document.getElementById('button-addon2').addEventListener('click', function () {
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchFiled.value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data))
});
const displayPlayer = data => {
  const cardContainer = document.getElementById('card-container');
  if (searchFiled.value == '' || data.player == null) {
    document.getElementById('error').style.display = 'block';
  } else {
    document.getElementById('error').style.display = 'none';
    cardContainer.innerHTML = ``;
    document.getElementById('details-container').innerHTML = ``;
    searchFiled.value = '';
    for (const player of data.player) {
      const card = document.createElement('div');
      card.classList.add('col');
      card.innerHTML = `
          <div class="card h-100" onclick="fullDetailsApi(${player.idPlayer})">
            <img src="${player.strThumb}" class="card-img-top" alt="${player.strPlayer}'s photo is not available">
            <div class="card-body">
              <h5 class="card-title">${player.strPlayer}</h5>
              <p class="card-text">${(player.strDescriptionEN).slice(0, 100)}.... </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">${player.strSport} player of ${player.strNationality}</small>
            </div>
          </div>
  `;
      cardContainer.appendChild(card);
    }
  }
};
const fullDetailsApi = (id) => {
  const playerUrl = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
  fetch(playerUrl)
    .then(res => res.json())
    .then(data => detailsBox(data))
}

const detailsBox = data => {
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = ``;
  const detailsCard = document.createElement('div');
  detailsCard.classList.add('card');
  detailsCard.innerHTML = `
          <img src="${data.players[0].strCutout}" class="card-img-top" alt="photo can't loaded or unavailable">
          <div class="card-body">
            <h5 class="card-title">${data.players[0].strPlayer} (<small>${data.players[0].strPosition}</small>) </h5>
            <ul>
            <li><b>Nationality:</b> ${data.players[0].strNationality}</li>
            <li><b>Gender:</b> ${data.players[0].strGender}</li>
            <li><b>Height:</b> ${data.players[0].strHeight}</li>
            <li><b>Weight:</b> ${data.players[0].strWeight}</li>
            <li><b>Twitter Profile:</b> <a target="_blank" href=" https://${data.players[0].strTwitter}">go</a></li>
            <li><b>Instagram Profile:</b> <a target="_blank" href=" https://${data.players[0].strInstagram}">go</a></li>
          </ul>
            <p class="card-text">${data.players[0].strDescriptionEN}</p>
          </div>
`;
  detailsContainer.appendChild(detailsCard);

}

