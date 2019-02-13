/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var qualityEl = document.querySelector('.quality');
  var ideas, newIdea; 




/* Event Listeners */

saveBtnEl.addEventListener('click', saveButton);
window.addEventListener('load', loadCards);
storageEl.addEventListener('click', buttonChecker);

/* Functions */
function loadCards() {
  ideas = JSON.parse(localStorage.getItem('ideas'));
  if (!ideas) {
      return false;
    } else {
      for (var i = 0; i < ideas.length; i++) {
      generateCard(ideas[i].title, ideas[i].body)
    }
  }
}

function saveButton(event) {
  event.preventDefault();
  var cardTitleVal = cardTitleEl.value;
  var cardBodyVal = cardBodyEl.value;

  if (!cardTitleVal || !cardBodyVal) {
    return;
  } else {
    createIdea(cardBodyVal, cardTitleVal);
  }
}

function createIdea(cardBodyVal, cardTitleVal) {
  ideas = localStorage.getItem('ideas') || '[]';
  newIdea = new Idea(cardTitleVal, cardBodyVal, ideas);
  ideas = JSON.parse(ideas);
  ideas.push(newIdea); 
  generateCard(cardBodyVal, cardTitleVal);
  newIdea.saveToStorage();
}

function generateCard(cardBodyVal, cardTitleVal) { 
  var card = `<section class="card-section">
        <article class="card-body">
          <h2 class="card-title">${cardTitleVal}</h2>
          <p class="card-text">${cardBodyVal}</p>
        </article>
        <article class="card-bottom">
          <img class="card-btn" id="up-vote" src="image-assets/upvote.svg">
          <img class="card-btn" id="down-vote" src="image-assets/downvote.svg">
          <p class="card-bottom-text">Quality: <span class="quality">Swill</span></p>
          <img class="card-btn" id="delete-card" src="image-assets/delete.svg">
        </article>
      </section>`
  storageEl.insertAdjacentHTML('afterbegin', card);
  clearInputs();
}

function buttonChecker(e) {
  e.preventDefault();
  if (e.target.id === 'delete-card') {
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.id === 'up-vote') {
    // Target Up Vote button
    console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
    // updateQuality();
  }
  if (e.target.id === 'down-vote') {
    // Target Down Vote button
    console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
    // updateQuality();
  }
}

function clearInputs() {
  cardTitleEl.value = '';
  cardBodyEl.value = '';
}







