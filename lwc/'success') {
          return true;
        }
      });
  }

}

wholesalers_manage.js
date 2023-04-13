·       User should be able to access the sub functionalities like edit, view and download.       ·       User should be able to download the wholesalers list in .csv file format.       ·       User should be able to filter the data using the drop down menu.       ·       User should be able to add/edit the wholesaler by submitting the form.       ·       User should be redirected to login page if they don't have access.

import { LightningElement } from 'lwc';

export default class Wholesalers extends LightningElement {
  // Form variables
  name;
  number;
  type;
  contactName;
  emailAddress;
  active;
  dateCreated;
  lastModified;

  // Form submission
  handleSubmit() {
    // Validate the form fields
    if(this.validateForm()) {
      // Submit the form data
      this.submitFormData();
    }
  }

  // Form validation
  validateForm() {
    // Validate name
    if (!this.name) {
      alert('Name should not be empty');
      return false;
    } else if (this.uniqueName()) {
      alert('Name should be unique');
      return false;
    }
    
    // Validate number
    if (!this.number) {
      alert('Number should not be empty');
      return false;
    } else if (!/^\d+$/.test(this.number)) {
      alert('Number should be a valid number');
      return false;
    } else if (this.uniqueNumber()) {
      alert('Number should be unique');
      return false;
    }
    
    // Validate type
    if (!this.type) {
      alert('Type should be either I- Independent or M- Multiple');
      return false;
    }

    return true;
  }

  // Submit form data
  submitFormData() {
    // Submit form data
    fetch('http://localhost:8080/wholesaler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        number: this.number,
        type: this.type,
        contactName: this.contactName,
        emailAddress: this.emailAddress,
        active: this.active,
        dateCreated: this.dateCreated,
        lastModified: this.lastModified
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Successfully saved the wholesaler data');
        } else {
          alert('Failed to save the wholesaler data');
        }
      });
  }

  // Reset form
  handleReset() {
    // Reset form
    this.resetForm();
  }

  // Reset form
  resetForm() {
    this.name = '';
    this.number = '';
    this.type = '';
    this.contactName = '';
    this.emailAddress = '';
    this.active = '';
    this.dateCreated = '';
    this.lastModified = '';
  }

  // Check if name is unique
  uniqueName() {
    // Check if name is unique
    fetch('http://localhost:8080/wholesaler/uniqueName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          return true;
        }
      });
  }

  // Check if number is unique
  uniqueNumber() {
    // Check if number is unique
    fetch('http://localhost:8080/wholesaler/uniqueNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: this.number
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status ===