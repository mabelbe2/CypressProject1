class SearchResult {
    resultHeaderLocator = "thead tr"
    firstSearchResultLocator = "tbody tr";
    firstRentButtonLocator = "tbody tr a";

    waitUntilLoaded() {
        cy.get(this.firstSearchResultLocator);
    }

    getFirstResultDetail() {
        // const resultTypes = cy.get(this.resultHeaderLocator).find("th");
        const resultTypes = ["company", "model", "license plate", "price", "price per day", "action"];
        const firstResultDetail = cy.get(this.firstSearchResultLocator).first().find("td");
        let columnLength;
        let detailsHash = {};
        firstResultDetail.each((element, index, list) => {
    
            detailsHash[resultTypes[index]] = element.text();
              cy.log(index, element.text().trim());
        })
        console.log(JSON.stringify(detailsHash));

        return detailsHash;
    }

    clickFirstSearchResult() {
        cy.get(this.firstRentButtonLocator).first().click();
    }

    assertNoSearchResult() {
        cy.get(this.firstSearchResultLocator).should("not.exist");
    }

}

module.exports = new SearchResult();