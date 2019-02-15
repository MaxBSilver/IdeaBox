/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var ideas, newIdea; 
  var targetIdea;
  var currentIdeaQuality;
  var qualityVal;

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
      updateQualityLoad(ideas[i].quality);
      generateCard(ideas[i].title, ideas[i].body, qualityVal, ideas[i].id);
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
  newIdea = new Idea(Math.random().toString(36).substr(2, 9), cardTitleVal, cardBodyVal, ideas);
  ideas = JSON.parse(ideas);
  ideas.push(newIdea); 
  generateCard(cardTitleVal, cardBodyVal, newIdea.quality, newIdea.id);
  newIdea.saveToStorage();
}

function updateQualityLoad(target) {
  var qualities = ['Swill', 'Plausible', 'Genius'];
  if (target == 0) {
  qualityVal = qualities[0];
  } 
  else if (target == 1){
  qualityVal = qualities[1];
  }
  else if (target == 2) {
  qualityVal = qualities[2];
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
/* QUALITY CHANGING FUNCTIONS */
function updateQuality(e, target) {
  var qualities = ['Swill', 'Plausible', 'Genius'];
  var targetSibling1 = e.target.nextElementSibling.nextElementSibling.firstElementChild
  if (currentIdeaQuality == 0) {
  target.innerText= qualities[0];
  } 
  else if (currentIdeaQuality == 1) {
  target.innerText= qualities[1];
  }
  else if (currentIdeaQuality == 2) {
  target.innerText= qualities[2];
  }
}
function upvote(e) {
    targetIdea.quality+= 1;
    currentIdeaQuality = targetIdea.quality;
    if (currentIdeaQuality > 2) {
      targetIdea.quality = 2;
    }
    console.log(currentIdeaQuality);
    var targetSibling1 = e.target.nextElementSibling.nextElementSibling.firstElementChild
    updateQuality(e, targetSibling1);
    updateStorage();

}

function downvote(e) {
    targetIdea.quality-= 1;
    currentIdeaQuality = targetIdea.quality;
    if (currentIdeaQuality < 0) {
    targetIdea.quality = 0;
    }
    var targetSibling2 = e.target.nextElementSibling.firstElementChild
    updateQuality(e, targetSibling2);
    updateStorage();
}


/* BUTTON FUNCTIONS */ 

function buttonChecker(e) {
  e.preventDefault();
  ideaTargeter(e);
  if (e.target.id === 'delete-card') {
    deleteCard(e);
  }
  if (e.path[1].className === "card-body" && e.target.classList[0] !== 'creator-input') {
    editCard(e);
  }
  if (e.target.id === 'up-vote') {
    upvote(e);
  }
  if (e.target.id === 'down-vote') {
    downvote(e);
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
    updateIdeaContent(e);
    updateStorage();
  }
}

function ideaTargeter(e) {
  ideas = JSON.parse(localStorage.getItem('ideas'))
  targetIdea = ideas.filter(function(item) {
    return item.id === e.path[2].dataset.id;
  })[0]
}

function updateStorage() {
  var indexOfIdea = ideas.findIndex(i => i.id === targetIdea.id);
  ideas.splice(indexOfIdea, 1, targetIdea);
  localStorage.clear();
  localStorage.setItem('ideas', JSON.stringify(ideas));
}

function updateIdeaContent(e) {
  if (e.target.classList[1] == 'title-input') {
    targetIdea.title = e.srcElement.value
  }
  if (e.target.classList[1] == 'body-input') {
    targetIdea.body = e.srcElement.value
  }
}

function deleteCard(e) {
  e.target.parentElement.parentElement.remove();
  ideas.forEach(function(newIdea) {
    var i = ideas.findIndex(i => i.id === targetIdea.id);
    var ideaToDelete = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].ideas);
    ideaToDelete.deleteFromStorage(i);
});
}





