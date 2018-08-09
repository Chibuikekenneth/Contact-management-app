/**
 * Validation Type
 */

const EMAIL_ERROR = "Please add a valid e-mail";
const FIELDS_ERROR = "Name, e-mail and Phone-Number fields must not be empty";
const STRING_LENGTH_ERROR = "Input too long!";

function Validation() {
}

Validation.prototype = {
  //Check E-mail
  checkMail: function Validation_checkMail(aValue) {
    var mailAddress = /\b[\w\.-]+@[\w\.-]+\.\w{2,3}\b/;

    if(!mailAddress.test(aValue)) {
     return false;
    }
    
    return true;
  },

  // Check length of input strings
  checkStrings: function Validation_checkStrings(aName, aOptionalAddress) {
    if ((aName.length > 40) || (aOptionalAddress.length > 40)) {
      return false;
    }

    return true;
  },

  // Check for empty fields
  checkFields: function Validation_checkFields(aName, aEmail, aphoneNumber) {
    if(aName === '' || aphoneNumber === '' || aEmail === '') {
      return false;
    }

    return true;
  },

  // Validate fields
  checkAllData: function Validation_checkAllData(errors, aName, aEmail, aphoneNumber, aAddress) {
    if (this.checkMail(aEmail) && this.checkStrings(aName, aAddress) && this.checkFields(aName, aEmail, aphoneNumber))
      return true;
    else {
      if (!this.checkMail(aEmail)) 
        errors.push(EMAIL_ERROR);
      if (!this.checkFields(aName, aEmail, aphoneNumber)) 
        errors.push(FIELDS_ERROR);
      if (!this.checkStrings(aName, aAddress))
        errors.push(STRING_LENGTH_ERROR);
    }

    return false;
  }
}
