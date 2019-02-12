class Idea {
  constructor(title, body, quality) {
    this.title = title;
    this.body = body;
    this.quality = quality;
  }
  saveToStorage() {
    var stringyIdea = JSON.strinify(this.Idea);
    localStorage.newItem(stringyIdea);
  }
  deleteFromStorage() {
    localStorage.removeItem(stringyIdea);
  }
  upodateContent() {

  }
  updateQuality() {

  }
}

module.exports = Idea;