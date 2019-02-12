/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');
  var qualityEl = document.querySelector('.quality');



/* Event Listeners */

  saveBtnEl.addEventListener('click', generateCard);




/* Functions */
function createIdea() {
  var cardTitleVal = cardTitleEl.value;
  var cardBodyVal = cardBodyEl.value;
  var ideas = localStorage.getItem('ideas') || '[]';
  var newIdea = new Idea(cardTitleVal, cardBodyVal);
  ideas = JSON.parse(ideas);
  ideas.push(newIdea);
}

function generateCard(event) { 
  event.preventDefault;
  var cardTitleVal = cardTitleEl.value;
  var cardBodyVal = cardBodyEl.value;
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
  createIdea();
}






