class SummaryPage {
    firstNameLocator = "#name"
    lastNameLocator = "#last_name";
    cardNumberLocator = "#card_number";
    emailLocator= "#email";
    rentButtonLocator = ".btn";
    errorLocator = ".alert";

    waitUntilLoaded() {
        cy.get(this.firstNameLocator);
    }

    fillOutForm({firstName, lastName, cardNumber, email}) {
        cy.get(this.firstNameLocator).type(firstName || "{backspace}");
        cy.get(this.lastNameLocator).type(lastName|| "{backspace}");
        cy.get(this.cardNumberLocator).type(cardNumber|| "{backspace}");
        cy.get(this.emailLocator).type(email|| "{backspace}");
    }

    clickRentButton() {
        cy.get(this.rentButtonLocator).click();
    }

    assertStillOnSummaryPage() {
        cy.get(this.rentButtonLocator).should("be.visible");
    }

    assertErrorText(expectedError) {
        cy.get(this.errorLocator).should("have.text", expectedError);
    }

}

module.exports = new SummaryPage();