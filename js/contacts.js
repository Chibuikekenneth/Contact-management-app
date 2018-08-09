/**
 * Contacts type
 * Contains the constructor of a Contact object
 */
function Contact(name, email, phoneNumber, optionalAddress,id) {
  this.name = name;
  this.email = email;
  this.phoneNumber = phoneNumber;
  this.optionalAddress = optionalAddress || "";
  this.id = id;
}

