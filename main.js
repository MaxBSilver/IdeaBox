/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var ideas, newIdea; 
  var targetIdea;




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
      generateCard(ideas[i].title, ideas[i].body, ideas[i].quality, ideas[i].id)
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
  generateCard(cardBodyVal, cardTitleVal, newIdea.quality, newIdea.id);
  console.log(newIdea.id);
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
  else if (currentQuality == 2) {
    document.querySelector('.quality').innerText = qualities[2];
  }

}
function updateQualityValue(e) {
  ideaTargeter(e);

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
          <p class="card-bottom-text">Quality: <span class="quality">${qualityVal}</span></p>
          <img class="card-btn" id="delete-card" src="image-assets/delete.svg">
        </article>
      </section>`
  storageEl.insertAdjacentHTML('afterbegin', card);
  updateQuality();
  clearInputs();
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
    var qualityEl = document.getElementsByClassName('.quality');

    // updateQuality();
  }
  if (e.target.id === 'down-vote') {
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
    updateStorage(e);
  }
}

function ideaTargeter(e) {
  ideas = JSON.parse(localStorage.getItem('ideas'))
  targetIdea = ideas.filter(function(item) {
    return item.id === e.path[2].dataset.id;
  })
}


