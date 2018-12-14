'use strict';

const BasePage = require('./base');

class WeatherPage extends BasePage {
    constructor() {
        super();
        this._searchButton = element(by.css('button[class="submit_3"]'));
        this._searchField = element(by.css('input[name="address"]'));
        this._errorMessage = element(by.css('div[id="root"] h1'));
        this._headerMessage = element(by.css('div[id="root"] h2'));
        this._resultTableHeader = element(by.css('caption[class="tableHeader"]'));
        this._formElement = element(by.css('form[id="searchLocation"]'));
        this._tableLeftProperties = element.all(by.css('tbody tr th'));
        this._tableRightValues = element.all(by.css('table tr td'));
    }

    /**
     *
     * @return promise.Promise<any>.
     */
    loadWeatherPage() {
        return this.loadUrl(browser.baseUrl)
    }

    /**
     *
     * @return Promise<boolean>.
     */
    isWeatherPageLoaded() {
        return this.isElementVisible(this._searchButton).then(() => {
            return this.isElementVisible(this._searchField).then(() => {
                return Promise.resolve(true);
            })
        })
    }

    /**
     * @param {string}  postCode.
     * @return Promise<boolean>.
     */

    enterPostCode(postCode) {
        return this.enterText(this._searchField, postCode).then(() => {
            return this.clickElement(this._searchButton).then(() => {
                return Promise.resolve(true);
            });
        });
    }

    /**
     *@param {string}  errorMessage.
     * @return wdpromise.Promise<string>.
     */

    getInvalidErrorMessage(errorMessage) {
        const EC = protractor.ExpectedConditions;
        return browser.wait(EC.textToBePresentInElement(this._errorMessage, errorMessage), browser.params.waits.ecWaitTime).then(() => {
            return this._errorMessage.getText();
        });

    }

    /**
     * @param {string}  ele.
     * @return WebdriverWebElement
     */
    getWeatherElements(ele) {
        switch (ele.toLowerCase()) {
        case 'header':
            return this._headerMessage;
        case 'search box':
            return this._searchField;
        case 'search button':
            return this._searchButton;
        default:
            break;
        }
    }

    /**
     * @param {string}  el.
     * @return promise.Promise<boolean>;
     */
    isElementDisplayed(el) {
        return this.getWeatherElements(el).isDisplayed();

    }

    /**
     *
     * @return promise.Promise<string>;
     */
    getTableHeaderText() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(this._resultTableHeader), browser.params.waits.ecWaitTime);
        return this._resultTableHeader.getText();
    }

    /**
     *
     * @return promise.Promise<void>;
     */
    submitForm() {
        return this._formElement.submit();
    }

    /**
     *
     * @return promise.Promise<Object>;
     */
    getTableContents() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(this._resultTableHeader), browser.params.waits.ecWaitTime);

        return this._tableLeftProperties.count()
        .then((cnt) => {
            const tableContents = [];
            for (let i = 0; i < cnt; i++) {
                this._tableLeftProperties.get(i).getText()
                .then((txt) => {
                    tableContents.push(txt.replace(":", ""));
                });
            }
            return tableContents;
        });
    }

    //Todo: Move this to a util class outside page object
    /**
     * @param {string} dateFormat.
     * @return <Object>;
     */
    dateFormatRegex(dateFormat) {
        switch (dateFormat) {
        case 'DD/MM/YYYY HH:mm:ss':
            return new RegExp('^([0-2]\\d|[3][0-1])\\/([0]\\d|[1][0-2])\\/([1-2]\\d{3})' +
                '(?:(?:\\s([0-1]\\d|[2][0-3])\\:([0-5]\\d)(?::([0-5]\\d))?)?)$');

        }
    }

    /**
     * @param {string}  dateFormat.
     * @return promise.Promise<boolean>;
     */
    validateTimeFormat(dateFormat) {
        // Time field is the first property in results table
        const timeField = this._tableRightValues.first();
        return timeField.getText().then(time => {
            const dateRegex = this.dateFormatRegex(dateFormat);
            return Promise.resolve(dateRegex.test(time));
        });
    }
}


module.exports = new WeatherPage();
