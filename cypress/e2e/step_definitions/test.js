import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { formatDate } from "../helpers/utils";
const searchForm = require("../pages/searchForm");
const searchResult = require("../pages/searchResult");
const rentDetails = require("../pages/rentDetails");
const summaryPage = require("../pages/summaryPage");
let selectedDetailsObj = {};
Given('search page is opened', () => {
    cy.visit("http://qalab.pl.tivixlabs.com/", {failOnStatusCode: false});
});

function selectDate(givenDate, dateType) {
    let formattedDate;
    const today = new Date();
    if (givenDate.includes("tomorrow")) {
        formattedDate = new Date(today);
        formattedDate.setDate(formattedDate.getDate() + (givenDate === "tomorrow" ? 1 : 2 ));
        formattedDate = formatDate(formattedDate);
    } else {
        formattedDate = givenDate;
    }
    if (dateType === "pickup") {
        searchForm.pickPickupDate(formattedDate);
    } else {
        searchForm.pickDropoffDate(formattedDate);
    }
    selectedDetailsObj[dateType] = formattedDate;
}

When('user enter search info', (table) => {
    const tableHash = table.rowsHash();
    searchForm.pickCountry(tableHash["country"]);
    searchForm.pickCity(tableHash["city"]);
    searchForm.enterModel(tableHash["model"]);
    selectDate(tableHash["pickup"], "pickup");
    selectDate(tableHash["dropoff"], "dropoff");

    selectedDetailsObj["country"] = tableHash["country"];
    selectedDetailsObj["city"] = tableHash["city"];

});

When('user enter invalid search info {string}, {string}, {string}, {string}, {string}', (country, city, model, pickup, dropoff) => {
    searchForm.pickCountry(country);
    searchForm.pickCity(city);
    searchForm.enterModel(model);
    selectDate(pickup, "pickup");
    selectDate(dropoff, "dropoff");
});

When ('user click on the search button', ()=> {
    searchForm.clickSearchButton();
});

Then('user should not be able to see any search result and see {string}', (expectedError) => {
    searchForm.assertErrorText(expectedError);
    searchResult.assertNoSearchResult();
})

When('user click on the rent button on one of search result', () => {
    carRentDetails = searchResult.getFirstResultDetail();
    searchResult.clickFirstSearchResult();
    cy.log(carRentDetails);
});

Then('rent detail page is loaded', () => {
    rentDetails.waitForPageLoaded();
});

Then('user can confirm details are correct on rent details', () => {
    rentDetails.confirmModel(carRentDetails);
    rentDetails.confirmDetail(carRentDetails, selectedDetailsObj);

});

Then('user can confirm details are correct on summary page', () => {
    rentDetails.confirmDetail(carRentDetails, selectedDetailsObj);
});

Then('user click rent button', () => {
    rentDetails.clickRentButton();
});

Then('user lands on summary page', () => {
    summaryPage.waitUntilLoaded();
});

Then('user enter personal detail', (table) => {
    summaryPage.fillOutForm(table.rowsHash());
});

Then('user enter invalid personal detail and error showed when submit', (table) => {
    const array = table.hashes();
    for (let i = 0; i < array.length; i++) {
        summaryPage.fillOutForm(array[i]);
        summaryPage.clickRentButton();
        summaryPage.assertStillOnSummaryPage();
        summaryPage.assertErrorText(array[i]["expectedError"]);
    }

});

Then('user confirm rent receipt', () => {
  // TODO: implement step
});
