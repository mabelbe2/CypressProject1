class SearchForm{
    countryDropdownLocator = "#country";
    cityDropdownLocator = "#city";
    modelInputLocator = "#model";
    pickupDatePickerLocator = "#pickup";
    dropoffDatePickerLocator = "#dropoff";

    searchBtnLocator = ".btn";
    errorLocator = ".alert";
    pickCountry(countryName) {
        cy.get(this.countryDropdownLocator).select(countryName);

    }

    pickCity(cityName) {

        cy.get(this.cityDropdownLocator).select(cityName);

    }

    enterModel(modelName) {
        if (modelName) {
            cy.get(this.modelInputLocator).type(modelName);
        }

    }

    pickPickupDate(pickupDate) {
        if (pickupDate) {
            cy.get(this.pickupDatePickerLocator).invoke("attr", "value", pickupDate);
        }

    }

    pickDropoffDate(dropoffDate) {
        if (dropoffDate) {
            cy.get(this.dropoffDatePickerLocator).type(dropoffDate);
        }
    }

    clickSearchButton() {
        cy.get(this.searchBtnLocator).click();
    }

    assertErrorText(expectedError) {
        cy.get(this.errorLocator).should("have.text", expectedError);
    }

}

module.exports = new SearchForm();