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
    // Get Ideas
    // Parse Ideas
    // Use event trigger to remove specific idea from ideas
    // run saveStorage(); to save new verision of idea 
    localStorage.removeItem(stringyIdea);
  }
  upodateContent() {

  }
  updateQuality() {

  }
}