/* Global Variables */
  var saveBtnEl = document.querySelector('.save-btn');
  var cardTitleEl = document.querySelector('.title-input');
  var cardBodyEl = document.querySelector('.body-input');
  var storageEl = document.querySelector('.storage');



/* Event Listeners */

  saveBtnEl.addEventListener('click', generateCard);














/* Functions */

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
          <p class="card-bottom-text">Quality: Swill</p>
          <img class="card-btn" src="image-assets/delete.svg">
        </article>
      </section>`
  storageEl.insertAdjacentHTML('afterbegin', card);
}






