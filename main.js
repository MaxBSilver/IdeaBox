/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var ideas, newIdea; 




/* Event Listeners */

saveBtnEl.addEventListener('click', saveButton);
window.addEventListener('load', loadCards);
storageEl.addEventListener('click', buttonChecker);
storageEl.addEventListener('keyup', submitCardChange)


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
  checkInputs();
}

function checkInputs() {
  var cardTitleVal = cardTitleEl.value;
  var cardBodyVal = cardBodyEl.value; 
  var qualityVal = 0;
  if (!cardTitleVal || !cardBodyVal) {
    return;
  } else {
    createIdea(cardBodyVal, cardTitleVal, qualityVal);
  }
}

function createIdea(cardBodyVal, cardTitleVal, qualityVal) {
  ideas = localStorage.getItem('ideas') || '[]';
  newIdea = new Idea(cardTitleVal, cardBodyVal, qualityVal, ideas);
  ideas = JSON.parse(ideas);
  ideas.push(newIdea); 
  generateCard(cardBodyVal, cardTitleVal, qualityVal, newIdea.id);
  updateQuality();
  newIdea.saveToStorage();
}

function updateQuality() {
  
  var currentQuality = document.querySelector('.quality').innerText;
  var qualities = ['Swill', 'Plausible', 'Genius']
  if (currentQuality == 0) {
    document.querySelector('.quality').innerText = qualities[0];
  } 
  else if (currentQuality == 1){
    document.querySelector('.quality').innerText = qualities[1];
  }
  else {
    document.querySelector('.quality').innerText = qualities[2];

  }

}

function generateCard(cardBodyVal, cardTitleVal, qualityVal, ideaID) { 
  var card = `<section class="card-section">
        <article class="card-body" data-id=${ideaID}>
          <h2 class="card-title">${cardTitleVal}</h2>
          <input class="creator-input title-input hidden" id="idea-input" type="text" name="title" placeholder="${cardTitleVal}">
          <p class="card-text">${cardBodyVal}</p>
          <textarea class="creator-input body-input hidden" id="body-input" type="text" name="body" style="resize:none">${cardBodyVal}</textarea>
        </article>
        <article class="card-bottom">
          <img class="card-btn" id="up-vote" src="image-assets/upvote.svg">
          <img class="card-btn" id="down-vote" src="image-assets/downvote.svg">
          <p class="card-bottom-text">Quality: <span class="quality">${qualityVal}</span></p>
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
  if (e.path[1].className === "card-body" && e.target.classList[0] !== 'creator-input') {
    editCard(e);
  }

  if (e.target.id === 'up-vote') {
    var qualityEl = document.getElementsByClassName('.quality');



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

function editCard(e) {
  e.target.nextElementSibling.classList.remove('hidden');
  e.target.classList.add('hidden');
}

function submitCardChange(e) {
  if (e.code === "Enter") {
    e.target.previousElementSibling.innerText = e.srcElement.value;
    e.target.previousElementSibling.classList.remove('hidden');
    e.target.classList.add('hidden');
  }
}


