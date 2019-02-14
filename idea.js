class Idea {
  constructor(title, body, ideas) {
    this.title = title;
    this.body = body;
    this.id =  Math.random().toString(36).substr(2, 9);
    this.quality = 0;
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
  updateContent() {

  }
  updateQuality() {

  }
}