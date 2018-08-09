/**
 * Worker with LocalStorage
 */
function Handler(aList) {
  this.list = aList;
};

Handler.prototype = {
  // Updates the local storage with the values from the contact list
  updateStorage: function Handler_addToStorage() {
    localStorage.clear();

    for (var i = 0; i < this.list.length; i++) {
      localStorage.setItem("contact" + i, JSON.stringify(this.list[i]));
    }
  },

  // Returns existent contacts in LocalStorage as a list of objects
  getElements: function Handler_getElements() {
    var key,
     contactItems = [];

    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      contactItems[i] = JSON.parse(localStorage.getItem(key));
    }
    return contactItems;
  },

  // List all elements from localStorage to console
  listItems: function Handler_listItems() {
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      console.log(localStorage.getItem(key));
    }
  }
};

