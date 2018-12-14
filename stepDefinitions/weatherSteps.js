const { defineSupportCode } = require('cucumber');
const weatherPage = require('../pages/weatherPage');

defineSupportCode(function ({ And, But, Given, Then, When, setDefaultTimeout }) {
    setDefaultTimeout(10 * 1000);
    Given('I am on Weather Checker App', function () {
        return weatherPage.loadWeatherPage()
        .then(() => {
            return assert.eventually.equal(weatherPage.isWeatherPageLoaded(), true, "Failed to load the weather page");
        });
    });
    Then('I should see the following elements', function (string) {

        const elementsOnPage = (string.split("\n"));
        return assert.eventually.equal(weatherPage.isElementDisplayed(elementsOnPage[0]) &&
            weatherPage.isElementDisplayed(elementsOnPage[1]) && weatherPage.isElementDisplayed(elementsOnPage[2]), true)
    });

    When('I search for {stringInDoubleQuotes}', function (invalidPostcode) {
        return assert.eventually.equal(weatherPage.enterPostCode(invalidPostcode), true, "Failed to enter postcode")
        .then(() => {
            weatherPage.submitForm();

        });
    });
    Then('I should see error message {stringInDoubleQuotes}', function (errorMessage) {
        return assert.eventually.equal(weatherPage.getInvalidErrorMessage(errorMessage), errorMessage, "Message does not match");
    });


    Then('I should see the table and the header', function () {
        return assert.eventually.equal(weatherPage.getTableHeaderText(), "Weather details", "Message does not match");

    });

    Then('I should see the table with the contents', function (string) {
        const resultTableContents = string.split("\n");
        return assert.eventually.deepEqual(weatherPage.getTableContents(), resultTableContents);
    });

    Then('time should be in  {stringInDoubleQuotes} format', function (stringInDoubleQuotes) {
        return assert.eventually.equal(weatherPage.validateTimeFormat(stringInDoubleQuotes), true, "Date format does not match");
    });

});
