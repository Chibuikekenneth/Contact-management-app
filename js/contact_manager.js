/**
 * Contact Manager Class
 */
function ContactManager() {
  this.list = [];

  this.valid = new Validation();
  this.render = new Render();
  this.handler = new Handler(this.list);
}

ContactManager.prototype = {
  // Add a contact
  addContact: function ContactManager_addContact(aName, aMail, aphoneNumber, aAddress) {
    var contact,
      render,
      handler,
      valid,
      aId,
      errors,
      aErrorMessage,
      editButton,
      deleteButton;

    valid = this.valid;
    render = this.render;
    handler = this.handler;
    errors = [];
    aErrorMessage = [];

    if (valid.checkAllData(errors, aName, aMail, aphoneNumber, aAddress)) {
      //XXX: using this hack to always get a unique id
      aId = (new Date()).getTime();
      contact = new Contact(aName, aMail, aphoneNumber, aAddress, aId);

      this.list.push(contact);

      render.renderContact(contact);
      handler.updateStorage();

      console.log("You just added --> " + JSON.stringify(contact));
    } else {
      for (var i = 0; i < errors.length; i++) {
        aErrorMessage[i] = "Error no." + (i+1) + ": " + errors[i] + "\n";
      }
      render.errorMessage(aErrorMessage);
    }
  },

  // Edit a contact from the list
  editContact: function ContactManager_editContact(aId, newName, newEmail, newphoneNumber, newAddress) {
    var list,
      handler,
      render,
      valid,
      errors,
      aErrorMessage;

    list = this.list;
    handler = this.handler;
    render = this.render;
    valid = this.valid;
    errors = [];
    aErrorMessage = [];

    if(valid.checkAllData(errors, newName, newEmail, newphoneNumber, newAddress)) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === aId) {
          list[i].name = newName;
          list[i].email = newEmail;
          list[i].phoneNumber = newphoneNumber;
          list[i].optionalAddress = newAddress;
          console.log("You just edited --> " + JSON.stringify(list[i]));
          render.updateUi(list[i].id, newName, newEmail, newphoneNumber, newAddress);       
        }
      }
      handler.updateStorage();
    } else {
      for (var i = 0; i < errors.length; i++) {
        aErrorMessage[i] = "Error no." + (i+1) + ": " + errors[i] + "\n";
      }
      render.errorMessage(aErrorMessage);
    }
  },

  // Delete a contact from the list
  deleteContact: function ContactManager_deleteContact(aId) {
    var list,
      handler,
      render;

    list = this.list;
    handler = this.handler;
    render = this.render;

    for (var i in list) {
      if(list[i].id === aId) {
        render.deleteContact(list[i]);
        console.log("You just deleted --> " + JSON.stringify(list[i]));
        list.splice(i,1);
        break;
      }
    }
    handler.updateStorage();
  }
}
