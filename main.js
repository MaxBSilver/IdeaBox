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
  newIdea = new Idea(cardTitleVal, cardBodyVal, ideas);
  ideas = JSON.parse(ideas);
  ideas.push(newIdea); 
  generateCard(cardTitleVal, cardBodyVal, newIdea.quality, newIdea.id);
  console.log(newIdea.id);
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

function updateQuality(e) {
  var qualities = ['Swill', 'Plausible', 'Genius'];
  if (currentIdeaQuality == 0) {
  e.target.nextElementSibling.nextElementSibling.firstElementChild.innerText= qualities[0];
  } 
  else if (currentIdeaQuality == 1){
  e.target.nextElementSibling.nextElementSibling.firstElementChild.innerText= qualities[1];
  }
  else if (currentIdeaQuality == 2) {
  e.target.nextElementSibling.nextElementSibling.firstElementChild.innerText = qualities[2];
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
function upvote(e) {
    console.log(targetIdea);
    targetIdea.quality+= 1;
    currentIdeaQuality = targetIdea.quality;
    updateQuality(e);
    updateStorage();

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
    upvote(e);
  }
  if (e.target.id === 'down-vote') {
    targetIdea[0].quality--;
    updateQualityValue(e);
    console.log(targetIdea[0].quality);
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

