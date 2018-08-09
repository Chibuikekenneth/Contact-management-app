/**
 * UI
 */
function Render() {
}

Render.prototype = {
  // Render the layout of a contact on screen
  renderContact: function Render_renderContact(aContact) {
    var container,
      doc,
      list,
      name,
      email,
      phoneNumber,
      address,
      editButton,
      deleteButton,
      saveButton,
      buttonsDiv,
      that;

    container = document.getElementById("contacts-container");
    doc = container.ownerDocument;
    div = doc.createElement("DIV");
    div.setAttribute("id", "div" + aContact.id);
    div.setAttribute("class", "oneContact");  
    container.appendChild(div);

    list = doc.createElement("UL");
    list.setAttribute("id", "list" + aContact.id);
    list.setAttribute("class", "contactList");
    div.appendChild(list);

    name = doc.createElement("LI");
    name.setAttribute("id", "name-field" + aContact.id);
    name.textContent = "Name: " + aContact.name;
    list.appendChild(name);

    email = doc.createElement("LI");
    email.setAttribute("id", "mail-field" + aContact.id);
    email.textContent = "E-mail: " + aContact.email;
    list.appendChild(email);

    phoneNumber = doc.createElement("LI");
    phoneNumber.setAttribute("id", "phone-field" + aContact.id);
    phoneNumber.textContent = "Phone-Number: " + aContact.phoneNumber;
    list.appendChild(phoneNumber);

    address = doc.createElement("LI");
    address.setAttribute("id", "address-field" + aContact.id);
    address.textContent = "Address: " + aContact.optionalAddress;
    list.appendChild(address);

    buttonsDiv = doc.createElement("DIV");
    buttonsDiv.setAttribute("id", "buttons-div" + aContact.id);
    buttonsDiv.setAttribute("class", "ops-buttons");
    div.appendChild(buttonsDiv);
 
    editButton = doc.createElement("BUTTON");
    editButton.setAttribute("id", "edit-button" + aContact.id);
    editButton.setAttribute("class", "button");
    editButton.textContent = "Edit";
    buttonsDiv.appendChild(editButton);

    that = this;
    editButton.addEventListener("click", function () {
      var addButton,
      deleteButton;    

      that.saveButton(aContact);
      this.setAttribute("disabled", "true");
      that.sendToForm(aContact);

      addButton = document.getElementById("add-button");
      deleteButton = document.getElementById("delete-button" + aContact.id);

      addButton.setAttribute("disabled", "true");
      deleteButton.setAttribute("disabled", "true");
    }, false);

    deleteButton = doc.createElement("BUTTON");
    deleteButton.setAttribute("id", "delete-button" + aContact.id);
    deleteButton.setAttribute("class", "button");
    deleteButton.textContent = "Delete";
    buttonsDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      manager.deleteContact(aContact.id);
    }, false);
  },

  // Send to form
  sendToForm: function Render_sendToForm(aContact) {
    document.getElementById("name-field").value = aContact.name;
    document.getElementById("mail-field").value = aContact.email;
    document.getElementById("phone-field").value = aContact.birthday;
    document.getElementById("address-field").value = aContact.optionalAddress;
  },

  // Update the UI after editing a contact
  updateUi: function Render_updateUi(aId, aName, aMail, aphoneNumber, aAddress) {
    var name,
      email,
      phone,
      address;

    name = document.getElementById("name-field" + aId);
    email = document.getElementById("mail-field" + aId);
    phone = document.getElementById("phone-field" + aId);
    address = document.getElementById("address-field" + aId);

    name.textContent = "Name: " + aName;
    phone.textContent = "Phone-Number: " + aphoneNumber;
    email.textContent = "E-mail: " + aMail;
    address.textContent = "Address: " + aAddress;
  },

  // Render save button
  saveButton: function Render_saveButton(aContact) {
    var container,
      doc,
      buttonsDiv,
      that;

    that = this;

    container = document.getElementById("contacts-container");
    doc = container.ownerDocument;
    buttonsDiv = document.getElementById("buttons-div" + aContact.id);

    saveButton = doc.createElement("BUTTON");
    saveButton.setAttribute("id", "save-button" + aContact.id);
    saveButton.setAttribute("class", "button");
    saveButton.textContent = "Save";
    buttonsDiv.appendChild(saveButton);

    saveButton.addEventListener("click", function () {
      var newName,
        newEmail,
        newphoneNumber,
        newAddress,
        addButton,
        editButton,
        deleteButton;

      newName = document.getElementById("name-field").value;
      newEmail = document.getElementById("mail-field").value;
      newphoneNumber = document.getElementById("phone-field").value;
      newAddress = document.getElementById("address-field").value;

      // XXX: not done yet
      manager.editContact(aContact.id, newName, newEmail, newphoneNumber, newAddress);
      that.removeSaveButton(aContact);

      addButton = document.getElementById("add-button");
      editButton = document.getElementById("edit-button" + aContact.id);
      deleteButton = document.getElementById("delete-button" + aContact.id);
      
      addButton.removeAttribute("disabled");
      editButton.removeAttribute("disabled");
      deleteButton.removeAttribute("disabled");
    }, true);
  },

  // Remove the save button
  removeSaveButton: function Render_removeSaveButton(aContact) {
    var saveButton,
      buttonsDiv;
    
    buttonsDiv = document.getElementById("buttons-div" + aContact.id);
    saveButton = document.getElementById("save-button" + aContact.id);
 
    buttonsDiv.removeChild(saveButton);
  },

  // Delete contact elements from content area
  deleteContact: function Render_deleteContact(aContact) {
    var container,
      list,
      name,
      email,
      phoneNumber,
      address,
      editButton,
      deleteButton,
      div,
      buttonsDiv;

    container = document.getElementById("contacts-container");
    name = document.getElementById("name-field" + aContact.id);
    email = document.getElementById("mail-field" + aContact.id);
    phoneNumber = document.getElementById("phone-field" + aContact.id);
    address = document.getElementById("address-field" + aContact.id);
    editButton = document.getElementById("edit-button" + aContact.id);
    deleteButton = document.getElementById("delete-button" + aContact.id);
    div = document.getElementById("div" + aContact.id);
    buttonsDiv = document.getElementById("buttons-div" + aContact.id);
    list = document.getElementById("list" + aContact.id);

    buttonsDiv.removeChild(editButton);
    buttonsDiv.removeChild(deleteButton);

    div.removeChild(buttonsDiv);
  
    list.removeChild(name);
    list.removeChild(email);
    list.removeChild(phoneNumber);
    list.removeChild(address);

    div.removeChild(list);

    container.removeChild(div);
  },

  // Render error message
  errorMessage: function Render_errorMeesage(aMessage) {
    var container,
      doc,
      error,
      dismissButton,
      that;

    container = document.getElementById("contacts-container");
    doc = container.ownerDocument;

    error = doc.createElement("DIV");
    error.setAttribute("id", "error-window");
    error.setAttribute("class", "error");
    error.textContent = aMessage;

    container.appendChild(error);

    dismissButton = doc.createElement("BUTTON");
    dismissButton.setAttribute("id", "dismiss-button");
    dismissButton.setAttribute("class", "button");
    dismissButton.textContent = "Dismiss";

    error.appendChild(dismissButton);
    that = this;
    dismissButton.addEventListener("click", function () {
      that.removeErrorMessage();
    }, false);
  },

  // Removes error message
  removeErrorMessage: function Render_removeErrorMessage() {
    var container,
      error,
      dismissButton;

    container = document.getElementById("contacts-container");

    error = document.getElementById("error-window");
    dismissButton = document.getElementById("dismiss-button");
 
    error.removeChild(dismissButton);
    container.removeChild(error);
  }
};

