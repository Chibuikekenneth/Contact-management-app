/**
 * Global part
 */
var manager = new ContactManager();

// get the input from user and create the contact
function add() {
   var name,
      email,
      phoneNumber,
      address,
      id;

   name = document.getElementById("name-field").value;
   email = document.getElementById("mail-field").value;
   phoneNumber = document.getElementById("phone-field").value;
   address = document.getElementById("address-field").value;
   
   manager.addContact(name, email, phoneNumber, address);
}

// get data from storage and display all existent contacts
function displayAll() {
  var allContacts = [];

  allContacts = manager.handler.getElements();

  for (var i = 0; i < allContacts.length; i++) {
    manager.list[i] = allContacts[i];
    manager.render.renderContact(manager.list[i]);
  }
}

// on load, display all contacts
document.addEventListener("DOMContentLoaded", function () {
  displayAll();
  console.info("Please type 'manager.handler.listItems()'" + 
               "to view all contacts in the console");
}, false);

