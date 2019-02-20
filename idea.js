class Idea {
  constructor(id,title, body, ideas) {
    this.title = title;
    this.body = body;
    this.id = id;
    this.quality = 0;
    this.saveToStorage();
  }
  saveToStorage() {
    var stringyIdeas = JSON.stringify(ideas);
    localStorage.setItem('ideas', stringyIdeas);
  }
  deleteFromStorage(i, e) {
    e.target.parentElement.parentElement.remove();
    var ideasString = localStorage.ideas || [];
    var ideas = JSON.parse(ideasString);
    ideas.splice(i, 1);
    localStorage.ideas = JSON.stringify(ideas);
  }
  
  updateQuality(e, target) {
    var qualities = ['Swill', 'Plausible', 'Genius', 'Brilliant', 'Amazing'];
    console.log(targetIdea.quality);
    target.innerText= qualities[targetIdea.quality];
  } 
  
  upvote(i, e) {
    targetIdea.quality+= 1;
    if (targetIdea.quality > 4) {
      targetIdea.quality = 4;
    }
    var targetSibling1 = e.target.nextElementSibling.nextElementSibling.firstElementChild
    this.updateQuality(e, targetSibling1);
    this.updateStorage(i);

  } 
  downvote(i, e) {
    targetIdea.quality-= 1;
    if (targetIdea.quality < 0) {
    targetIdea.quality = 0;
    }
    var targetSibling2 = e.target.nextElementSibling.firstElementChild
    this.updateQuality(e, targetSibling2);
    this.updateStorage(i);
}
   updateStorage(i) {
   ideas.splice(i, 1, targetIdea);
   localStorage.clear();
   localStorage.setItem('ideas', JSON.stringify(ideas));
 }

  updateContent(e) {
    e.target.previousElementSibling.innerText = e.srcElement.value;
    e.target.previousElementSibling.classList.remove('hidden');
    e.target.classList.add('hidden');
    if (e.target.classList[1] == 'title-input') {
      targetIdea.title = e.srcElement.value
    }
    if (e.target.classList[1] == 'body-input') {
      targetIdea.body = e.srcElement.value
    }
  }  
}


