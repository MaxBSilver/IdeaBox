/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var qualityEl = document.querySelector('.quality');
  var ideas; 




/* Event Listeners */

  saveBtnEl.addEventListener('click', saveButton);




/* Functions */
function saveButton(event) {
  event.preventDefault();
  var cardTitleVal = cardTitleEl.value;
  var cardBodyVal = cardBodyEl.value;
  generateCard(cardBodyVal, cardTitleVal);
  createIdea(cardBodyVal, cardTitleVal);
  saveToStorage(ideas);
}

function createIdea(cardBodyVal, cardTitleVal) {
  ideas = localStorage.getItem('ideas') || '[]';
  var newIdea = new Idea(cardTitleVal, cardBodyVal);
  ideas = JSON.parse(ideas);
  ideas.push(newIdea);
  console.log(ideas);
}

function generateCard(cardBodyVal, cardTitleVal) { 
  var card = `<section class="card">
        <article class="card-body">
          <h2 class="card-title">${cardTitleVal}</h2>
          <p class="card-text">${cardBodyVal}</p>
        </article>
        <article class="card-bottom">
          <img class="card-btn" src="image-assets/upvote.svg">
          <img class="card-btn" src="image-assets/downvote.svg">
          <p class="card-bottom-text">Quality: <span class="quality">Swill</span></p>
          <img class="card-btn" src="image-assets/delete.svg">
        </article>
      </section>`
  storageEl.insertAdjacentHTML('afterbegin', card);
}

function saveToStorage(ideas) {
  console.log(ideas);
  var stringyIdeas = JSON.stringify(ideas);
  console.log(stringyIdeas);
  localStorage.setItem('ideas', stringyIdeas);
}






