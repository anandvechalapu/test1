·       User should be able to find the sub functionalities when he clicks user’s functionality.       ·       User should be able to access the sub functionalities like edit, view and download.       ·       If user has access then user able to access this page.       ·       If user didn’t have access then redirect to login page.       ·       User name should not be empty; username should be unique.       ·       Number should not be empty and should be number "/^\d+$/" and should be unique.       ·       Clicking on Download Data will allow User to view the results in Excel format.       ·       User have the option of filtering the data using the drop down menuType - This drop down menu will allowing User to select the type User wish to add/edit.       ·       The Submit and Reset buttons are given on this screen.       ·       Once User have made User selections click on Submit it will add/edit the wholesaler, or click on Reset to reset the selections to the last search. 

/* Wholesalers Controller.js */ 
({
    doInit: function (component, event, helper) {
        helper.getWholesalers(component);
    },

    editWholesaler: function (component, event, helper) {
        var wholesalerName = event.getParam("wholesalerName");
        var wholesalerNumber = event.getParam("wholesalerNumber");
        var type = event.getParam("type");
        var contactName = event.getParam("contactName");
        var emailAddress = event.getParam("emailAddress");
        var active = event.getParam("active");
        var dateCreated = event.getParam("dateCreated");
        var lastModified = event.getParam("lastModified");
        helper.editWholesaler(component, wholesalerName, wholesalerNumber, type, contactName, emailAddress, active, dateCreated, lastModified);
    },

    viewWholesaler: function (component, event, helper) {
        var wholesalerName = event.getParam("wholesalerName");
        var wholesalerNumber = event.getParam("wholesalerNumber");
        var type = event.getParam("type");
        var contactName = event.getParam("contactName");
        var emailAddress = event.getParam("emailAddress");
        var active = event.getParam("active");
        var dateCreated = event.getParam("dateCreated");
        var lastModified = event.getParam("lastModified");
        helper.viewWholesaler(component, wholesalerName, wholesalerNumber, type, contactName, emailAddress, active, dateCreated, lastModified);
    },

    downloadWholesalers: function (component, event, helper) {
        helper.downloadWholesalers(component);
    },

    submitWholesaler: function (component, event, helper) {
        var wholesalerName = component.find("wholesalerName").get("v.value");
        var wholesalerNumber = component.find("wholesalerNumber").get("v.value");
        var type = component.find("type").get("v.value");
        var contactName = component.find("contactName").get("v.value");
        var emailAddress = component.find("emailAddress").get("v.value");

        if(wholesalerName == ''){
            component.set("v.errorMessage", "Wholesaler Name is Blank");
            return;
        }
        else if(helper.wholesalerNameExists(component, wholesalerName)){
            component.set("v.errorMessage", "Wholesaler Name already exists");
            return;
        }
        else if(wholesalerNumber == ''){
            component.set("v.errorMessage", "Wholesaler Invalid Number");
            return;
        }
        else if(!helper.isValidNumber(wholesalerNumber)){
            component.set("v.errorMessage", "Wholesaler Invalid Number");
            return;
        }
        else if(helper.wholesalerNumberExists(component, wholesalerNumber)){
            component.set("v.errorMessage", "Wholesaler Duplicate Number");
            return;
        }
        else if(type == ''){
            component.set("v.errorMessage", "Type is not selected");
            return;
       