var storageEl = document.querySelector('.storage');
var saveBtnEl = document.querySelector('.save-btn');
var cardBodyEl = document.querySelector('.body-input');
var searchBtnEl = document.querySelector('.search-btn');
var filterBtns = document.querySelector('.filter-btns');
var cardTitleEl = document.querySelector('.title-input');
var searchInput = document.querySelector('#search-input');
var showMoreBtn = document.querySelector('.show-more-btn');
var showLessBtn = document.querySelector('.show-less-btn');
var characterCount = document.querySelector('#character-count');
var ideas;

saveBtnEl.addEventListener('click', saveButton);
showMoreBtn.addEventListener('click', moreIdeas);
showLessBtn.addEventListener('click', lessIdeas);
filterBtns.addEventListener('click', filterIdeas);
searchBtnEl.addEventListener('click', searchIdeas);
storageEl.addEventListener('click', buttonChecker);
searchInput.addEventListener('keyup', searchIdeas);
storageEl.addEventListener('keyup', submitCardChange);
cardBodyEl.addEventListener('input', characterCounter);
window.addEventListener('load', loadCards(JSON.parse(localStorage.getItem('ideas'))) || []);

function loadCards(loadArray) {
  storageEl.innerHTML = '';
  if (!loadArray) {
      return;
    } else if (loadArray.length <= 10) {
      for (var i = 0; i < 10; i++) {
        loadCardsJr(loadArray, i);
      }
    } else {
      for (var i = loadArray.length - 10; i < loadArray.length; i++) {
        loadCardsJr(loadArray, i);
    }
  }
}

function loadCardsJr(loadArray, i) {
  updateQualityLoad(loadArray[i].quality);
  generateCard(loadArray[i].title, loadArray[i].body, qualityVal, loadArray[i].id);
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
  var newIdea = new Idea(Math.random().toString(36).substr(2, 9), cardTitleVal, cardBodyVal, ideas);
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
  characterCount.innerHTML = 0;
  saveBtnEl.disabled = true;
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
  return targetIdea;
}

function filterIdeas(e) {
  var ideas = localStorage.ideas || '[]';
  ideas = JSON.parse(ideas);
  var filteredQuality = e.target.id;
  if (filteredQuality == 'all') {
    loadCards(ideas);
  } else {
    var filteredResults = ideas.filter(function(item){
    return item.quality == filteredQuality; })
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

function characterCounter() {
  var message = cardBodyEl;
  var text = message.value;
  characterCount.innerHTML = text.length;
  if(text.length > 120) {
    saveBtnEl.disabled = true;
    characterCount.style.color = '#FF0000';
  } else {
    saveBtnEl.disabled = false;
    characterCount.style.color = "#000";
  }
}

function moreIdeas() {
  showMoreBtn.classList.add('hidden');
  showLessBtn.classList.remove('hidden');
  var ideas = localStorage.ideas || '[]';
  ideas = JSON.parse(ideas);
  if (!ideas) {
      return false;
    } else {
      storageEl.innerHTML = '';
      for (var i = 0; i < ideas.length; i++) {
        loadCardsJr(ideas, i);
    }
  }
}

function lessIdeas() {
  showMoreBtn.classList.remove('hidden');
  showLessBtn.classList.add('hidden');
  var ideas = localStorage.ideas || '[]';
  ideas = JSON.parse(ideas);
  loadCards(ideas);
}