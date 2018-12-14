'use strict';

/*
Base which has all the common methods that are used across pageObjects,
all pages shall extend this class
 */

const ec = protractor.ExpectedConditions;

class Base {
    /**
     * @param {string} url
     * @return promise.Promise<any>
     */
    loadUrl(url) {
        return browser.get(url, browser.params.waits.pageLoadTime)
    }

    /**
     * @param {ElementFinder} locator
     * @return wdpromise.Promise<any>
     */
    isElementVisible(locator, wait = browser.params.waits.ecWaitTime) {
        return browser.wait(ec.visibilityOf(locator), wait, `Failed to locate the element ${locator.getWebElement()}`);
    }

    /**
     * @param {ElementFinder} locator
     * @return promise.Promise<void>
     */

    enterText(locator, text) {
        return locator.sendKeys(text)
    }

    /**
     * @param {ElementFinder} locator
     * @return promise.Promise<void>
     */
    clickElement(locator) {
        return locator.click();
    }

}

module.exports = Base;
