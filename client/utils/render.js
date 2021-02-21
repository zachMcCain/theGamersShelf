
const openShelf = function (e) {
  let shelf = document.getElementById('shelf');
  if (shelf.style.display === "none") {
    shelf.style.display = "block";
    let collection = document.getElementById('collection');
    collection.style.display = "none"
    let suggestions = document.getElementById('suggestions');
    suggestions.style.display = "none"
    let preferences = document.getElementById('preferences');
    preferences.style.display = "none"
  } else {
    shelf.style.display = "none";
  }
}

const renderCollection = function(e) {
  this.openShelf();
  let collection = document.getElementById('collection');
    collection.style.display = "block"
}

const renderSuggestions = function(e) {
  console.log('render suggestions ran')
  this.openShelf();
  let suggestions = document.getElementById('suggestions');
  suggestions.style.display = "block"
}

const renderPreferences = function(e) {
  console.log('render preferences ran')
  this.openShelf();
  let preferences = document.getElementById('preferences');
  preferences.style.display = "block"
}

export {openShelf, renderCollection, renderSuggestions, renderPreferences}