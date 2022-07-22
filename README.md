## Files

Video recorded saved in `cypress/video/`
report saved in `reports/cucumber-htmlreport.html/index.html`


## Plugin need to be installed on local machine

https://github.com/cucumber/json-formatter

## cypress related library used

-   [https://github.com/badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
-   [https://github.com/bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor)
-   [https://www.npmjs.com/package/multiple-cucumber-html-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter)

## Instruction to run with saved report and video
```
npm run cypress:execution
node cypress/cucumber-html-report.js
```

## Note
Test may failed at any time due to a random recurring 500 internal server error. May need to run a few times to be able to get perfect run.