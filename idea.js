class Idea {
  constructor(title, body, ideas) {
    this.title = title;
    this.body = body;
    ideas = JSON.parse(ideas);
    this.id = ideas.length + 1;
    this.quality = 'Swill';
    this.saveToStorage();
  }
  saveToStorage() {
    var stringyIdeas = JSON.stringify(ideas);
    localStorage.setItem('ideas', stringyIdeas);
  }
  deleteFromStorage() {
    localStorage.removeItem(stringyIdea);
  }
  upodateContent() {

  }
  updateQuality() {

  }
}