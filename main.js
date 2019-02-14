/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var ideas, newIdea; 
  var targetIdea;
  var currentIdeaQuality;




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
      generateCard(ideas[i].title, ideas[i].body, ideas[i].quality, ideas[i].id);
      updateQuality();
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
  generateCard(cardTitleVal, cardBodyVal, newIdea.quality, newIdea.id);
  console.log(newIdea.quality, 'idea-quality');
  console.log(newIdea.id);
  newIdea.saveToStorage();
}


function updateQuality(e) {
  // var currentQuality = currentIdeaQuality;
  // console.log(e, 'this should be e')
  // console.log(currentQuality, 'current quality')
  console.log(e);
  var qualities = ['Swill', 'Plausible', 'Genius'];
  if (currentIdeaQuality == 0) {
  e.target.nextElementSibling.nextElementSibling.firstElementChild.innerText = qualities[0];
  } 
  else if (currentIdeaQuality == 1){
  e.target.nextElementSibling.nextElementSibling.firstElementChild.innerText= qualities[1];
  }
  else if (currentIdeaQuality == 2) {
  e.target.nextElementSibling.nextElementSibling.firstElementChild.innerText= qualities[2];
  }
}


function generateCard(cardTitleVal, cardBodyVal, qualityVal, ideaID) { 
  var card = `<section class="card-section" data-id=${ideaID}>
        <article class="card-body">
          <h2 class="card-title">${cardTitleVal}</h2>
          <input class="creator-input title-input hidden" id="idea-input" type="text" name="title" placeholder="${cardTitleVal}">
          <p class="card-text">${cardBodyVal}</p>
          <textarea class="creator-input body-input hidden" id="body-input" type="text" name="body" style="resize:none">${cardBodyVal}</textarea>
        </article>
        <article class="card-bottom">
          <img class="card-btn" id="up-vote" src="image-assets/upvote.svg">
          <img class="card-btn" id="down-vote" src="image-assets/downvote.svg">
          <p class="card-bottom-text">Quality: <span class="quality">${qualityVal || 'Swill'}</span></p>
          <img class="card-btn" id="delete-card" src="image-assets/delete.svg">
        </article>
      </section>`
  storageEl.insertAdjacentHTML('afterbegin', card);
  clearInputs();
}
function upvote() {
     currentIdeaQuality = targetIdea.quality;
    currentIdeaQuality++;
    updateQuality(e);
}
function buttonChecker(e) {
  e.preventDefault();
  ideaTargeter(e);
  if (e.target.id === 'delete-card') {
    e.target.parentElement.parentElement.remove();
  } 
  if (e.path[1].className === "card-body" && e.target.classList[0] !== 'creator-input') {
    editCard(e);
  }

  if (e.target.id === 'up-vote') {
    upvote();

  }
  if (e.target.id === 'down-vote') {

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
    updateStorage(e);
  }
}

function ideaTargeter(e) {
  ideas = JSON.parse(localStorage.getItem('ideas'))
  targetIdea = ideas.filter(function(item) {
    return item.id === e.path[2].dataset.id;
  })[0]
}


