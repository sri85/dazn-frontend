'use strict';

const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ After}) {
    // Code to attach screenshot to the report on test failure
    After(function (scenario) {
        if (scenario.isFailed()) {
            let attach = this.attach;
            return browser.takeScreenshot().then(function (png) {
                let decodedBase64Image = new Buffer(png, "base64");
                attach(decodedBase64Image, "image/png");

            });
        }
    });
    After(function (scenario) {
        if (scenario.isFailed()) {
            console.error(`Test failed `);
            // Telling zalenium that a test has failed and please persist the video
            return browser.manage().addCookie({"name": "zaleniumTestPassed", "value": "false"}).then(()=>{
                console.log("Persisting failed videos");

            }).catch((err) =>{
                console.log(`Oops something went wrong while setting cookie`);

            });
        }
    });

});
