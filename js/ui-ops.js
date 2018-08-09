/**
 * UI OPS
 */

// Needs to be global because contact manager keeps the list of contacts and Operations()
// is doing stuff with only one contact
var manager = new ContactManager();
var handler = new Handler(manager.contacts);

function Operations(aContact) {
  this.contact = aContact; 
  this.render = new Render();
};

// Prototype of ops
Operations.prototype = {
  // Get element from UI
  getElement: function Operations_getElement(aId) {
    return document.getElementById(aId);
  },

  // Adds a contact everywhere
  addContact: function Operations_addContact() {
    var contact,
      editButton,
      saveButton,
      deleteButton;

    contact = this.contact;
   
    // add the contact to the list via the manager
    manager.addContact(contact);
    console.log("in add");
    console.log(manager.contacts);

    // add the list in LocalStorage
    handler.updateStorage();

    // add contact attributes to the UI
    this.render.renderContact(contact);

    editButton = document.getElementById("edit-button" + contact.id);
    editButton.addEventListener("click", function () {
      var ops = new Operations(contact); console.log("in the add part");
      ops.sendToForm();
    }, false);

    saveButton = document.getElementById("save-button" + contact.id);
    saveButton.addEventListener("click", function () {
      var ops = new Operations(contact);
      ops.edit();
    }, false);

    deleteButton = document.getElementById("delete-button" + contact.id);
    deleteButton.addEventListener("click", function () {
      var ops = new Operations(contact);
      ops.delete();
    }, false);
  },

  // Send attributes of the contact to the form
  sendToForm: function Operations_sendToForm() {
    var contact = this.contact;

    this.getElement("name-field").value = contact.name;
    this.getElement("mail-field").value = contact.email;
    this.getElement("phone-field").value = contact.phoneNumber;
    this.getElement("address-field").value = contact.optionalAddress;
  },

  // Edits a contact
  edit: function Operations_edit() {
    var newName,
      newEmail,
      newphoneNumber,
      newAddress;

    newName = this.getElement("name-field").value;
    newEmail = this.getElement("mail-field").value;
    newphoneNumber = this.getElement("phone-field").value;
    newAddress = this.getElement("address-field").value;

    manager.editContact(this.contact, newName, newEmail, newphoneNumber, newAddress);
    console.log("in edit");
    console.log(manager.contacts);
    handler.updateStorage();
    this.updateUi(newName, newEmail, newphoneNumber, newAddress);
  },

  // Update the UI after editing a contact
  updateUi: function Operations_updateUi(aName, aMail, aphoneNumber, aAddress) {
    var name,
      email,
      phoneNumber,
      address;

    name = document.getElementById("name-field" + this.contact.id);
    email = document.getElementById("mail-field" + this.contact.id);
    phoneNumber = document.getElementById("phone-field" + this.contact.id);
    address = document.getElementById("address-field" + this.contact.id);

    name.textContent = "Name: " + aName;
    phoneNumber.textContent = "Phone-Number: " + aphoneNumber;
    email.textContent = "E-mail: " + aMail;
    address.textContent = "Address: " + aAddress;
  },
  
  // Delete contact permanently from everywhere
  delete: function Operations_delete() {
    var contact = this.contact;
    
    this.render.deleteContact(contact);
    manager.deleteContact(contact);
    handler.updateStorage();
  },

  displayAll: function Operations_displayAll() {
    var persistedContacts;
    
    persistedContacts = handler.getElements();
    console.log(persistedContacts);
    for (var i = 0; i < persistedContacts.length; i++) {
      this.addContact(persistedContacts[i]);
    }
  }
};
