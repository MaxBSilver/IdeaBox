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
  deleteFromStorage(i) {
    var ideasString = localStorage.ideas || [];
    var ideas = JSON.parse(ideasString);
    ideas.splice(i, 1);
    localStorage.ideas = JSON.stringify(ideas);
  }
  updateContent() {
    
  }
  updateQuality() {

  }
}