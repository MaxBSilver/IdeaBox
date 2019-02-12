class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }
  saveToStorage() {
    var stringyIdea = JSON.stringify(this.Idea);
    localStorage.setItem('idea', stringyIdea);
  }
  deleteFromStorage() {
    localStorage.removeItem(stringyIdea);
  }
  upodateContent() {

  }
  updateQuality() {

  }
}