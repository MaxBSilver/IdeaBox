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
  updateContent() {
    console.log('test')
    
  }
  updateQuality(e, target) {
    var qualities = ['Swill', 'Plausible', 'Genius'];
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
  upvote(e) {
    targetIdea.quality+= 1;
    currentIdeaQuality = targetIdea.quality;
    if (currentIdeaQuality > 2) {
      targetIdea.quality = 2;
    }
    var targetSibling1 = e.target.nextElementSibling.nextElementSibling.firstElementChild
    this.updateQuality(e, targetSibling1);
    this.updateStorage();

  } 
  downvote(e) {
    targetIdea.quality-= 1;
    currentIdeaQuality = targetIdea.quality;
    if (currentIdeaQuality < 0) {
    targetIdea.quality = 0;
    }
    var targetSibling2 = e.target.nextElementSibling.firstElementChild
    this.updateQuality(e, targetSibling2);
    this.updateStorage();
}
   updateStorage(i) {
   ideas.splice(i, 1, targetIdea);
   localStorage.clear();
   localStorage.setItem('ideas', JSON.stringify(ideas));
 }
}


