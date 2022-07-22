class RentDetails{
    modelNameLocator = ".card-header";
    companyPhraseLocator = ".card-title";
    infoLocator = ".card-text";
    dateLocator = "h6";

    rentButtonLocator = ".btn";


    companyPrefix = "Company: ";
    pricePrefix = "Price per day: ";
    locationPrefix = "Location: ";
    licensePrefix = "License plate: ";
    pickupPrefix = "Pickup date: ";
    dropoffPrefix = "Dropoff date: ";
    
    confirmModel(rentDetailsObj) {
        if (rentDetailsObj["model"]) {
            cy.get(this.modelNameLocator).should("contain.text", rentDetailsObj["model"]);
        }
    }
    confirmDetail(rentDetailsObj, selectedDetailsObj) {
        cy.get(this.companyPhraseLocator).should("contain.text", this.companyPrefix + rentDetailsObj["company"]);
        cy.get(this.infoLocator).first().should("contain.text", this.pricePrefix + rentDetailsObj["price"]);
        cy.get(this.infoLocator).eq(1).should("contain.text", this.locationPrefix + selectedDetailsObj['country'] + ', ' + selectedDetailsObj['city']);
        cy.get(this.infoLocator).last().should("contain.text", this.licensePrefix + rentDetailsObj['license plate']);
        
        cy.get(this.dateLocator).first().should("contain.text", this.pickupPrefix + selectedDetailsObj["pickup"]);
        cy.get(this.dateLocator).last().should("contain.text", this.dropoffPrefix + selectedDetailsObj["dropoff"]);
    }

    waitForPageLoaded() {
        cy.get(this.rentButtonLocator).should("be.visible");
    }

    clickRentButton() {
        cy.get(this.rentButtonLocator).click();


    }

}

module.exports = new RentDetails();