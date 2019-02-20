/* Global Variables */
  var storageEl = document.querySelector('.storage');
  var saveBtnEl = document.querySelector('.save-btn');
  var cardBodyEl = document.querySelector('.body-input');
  var searchBtnEl = document.querySelector('.search-btn');
  var filterBtns = document.querySelector('.filter-btns');
  var cardTitleEl = document.querySelector('.title-input');
  var searchInput = document.querySelector('#search-input');
  // var characterCount = document.querySelector('.character-count');
  var ideas;
  var newIdea; 
  var targetIdea;
  var currentIdeaQuality;
  var qualityVal;

/* Event Listeners */
saveBtnEl.addEventListener('click', saveButton);
filterBtns.addEventListener('click', filterIdeas);
searchBtnEl.addEventListener('click', searchIdeas);
storageEl.addEventListener('click', buttonChecker);
searchInput.addEventListener('keyup', searchIdeas);
storageEl.addEventListener('keyup', submitCardChange);
window.addEventListener('load', loadCards(JSON.parse(localStorage.getItem('ideas'))) || []);

/* Functions */
function loadCards(loadArray) {
  console.log('test');
  storageEl.innerHTML = '';
  if (!loadArray) {
      return false;
    } else {
      for (var i = 0; i < loadArray.length; i++) {
      updateQualityLoad(loadArray[i].quality);
      generateCard(loadArray[i].title, loadArray[i].body, qualityVal, loadArray[i].id);
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
  var qualities = ['Swill', 'Plausible', 'Genius', 'Brilliant', 'Amazing'];
  qualityVal = qualities[target];
}


function generateCard(cardTitleVal, cardBodyVal, qualityVal, ideaID) { 
  var card = `<section class="card-section" data-id=${ideaID}>
        <article class="card-body">
          <h2 class="card-title">${cardTitleVal}</h2>
          <input class="creator-input title-input hidden" id="idea-input" type="text" name="title" value="${cardTitleVal}">
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

/* BUTTON FUNCTIONS */ 

function buttonChecker(e) {
  e.preventDefault();
  ideaTargeter(e);
  if (!targetIdea) {
    return false
  }
  var i = ideas.findIndex(i => i.id === targetIdea.id);
  var ideaToDelete = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].ideas);
  buttonCheckerJr(e, i, ideaToDelete);
}

function buttonCheckerJr(e, i, ideaToDelete) {
  if (e.target.id === 'delete-card') {
    ideaToDelete.deleteFromStorage(i, e);
  } else if (e.path[1].className === "card-body" && e.target.classList[0] !== 'creator-input') {
    editCard(e);
  } else if (e.target.id === 'up-vote') {
    ideaToDelete.upvote(i, e);
  } else if (e.target.id === 'down-vote') {
    ideaToDelete.downvote(i, e);
  } else {
    return false;
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
  var i = ideas.findIndex(i => i.id === targetIdea.id);
  var ideaToDelete = new Idea(ideas[i].id, ideas[i].title, ideas[i].body, ideas[i].ideas);
  if (e.code === "Enter") {
    ideaToDelete.updateContent(e);
    ideaToDelete.updateStorage(i);
  }
}

function ideaTargeter(e) {
  ideas = JSON.parse(localStorage.getItem('ideas'))
  targetIdea = ideas.filter(function(item) {
    return item.id === e.path[2].dataset.id;
  })[0]
}

function filterIdeas(e) {
  var ideas = localStorage.ideas || '[]';
  ideas = JSON.parse(ideas);
  var filteredQuality = e.target.id;
  console.log(filteredQuality);
  if (filteredQuality == 5) {
    console.log(ideas);
    loadCards(ideas);
  } else {
    var filteredResults = ideas.filter(function(item){
    return item.quality == filteredQuality;
    })
    loadCards(filteredResults);
  }
  
}


function searchIdeas() {
  var searchResults = [];
  var searchQuery = searchInput.value.toLowerCase();
  var ideas = localStorage.ideas || '[]';
  ideas = JSON.parse(ideas);
  ideas.forEach(idea => {
    if(idea.title.toLowerCase().includes(searchQuery) || idea.body.toLowerCase().includes(searchQuery)) {
      searchResults.push(idea);
    }
  });
  loadCards(searchResults);
}

setInterval(
  function characterCounter() {
    var message = document.getElementById('body-input');
    var text = message.value;
    document.getElementById('character-count').innerHTML = text.length;
    if(text.length > 120) {
      document.getElementById('character-count').style.color = '#FF0000';
    } else {
      document.getElementById('character-count').style.color = "#000";
    }
  }
  , 100
)











