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
  generateCard(cardBodyVal, cardTitleVal, newIdea.id);
  newIdea.saveToStorage();
}

function generateCard(cardBodyVal, cardTitleVal, ideaID) { 
  var card = `<section class="card-section">
        <article class="card-body" data-id=${ideaID}>
          <h2 class="card-title">${cardTitleVal}</h2>
          <input class="creator-input title-input hidden" id="idea-input" type="text" name="title" placeholder="${cardTitleVal}">
          <p class="card-text">${cardBodyVal}</p>
          <textarea class="creator-input body-input hidden" id="body-input" type="text" name="body" style="resize:none">${cardBodyVal}</textarea>
        </article>
        <article class="card-bottom">
          <img class="card-btn" src="image-assets/upvote.svg">
          <img class="card-btn" src="image-assets/downvote.svg">
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
  if (e.path[1].className === "card-body" && e.target.classList[0] !== 'creator-input') {
    editCard(e);
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


