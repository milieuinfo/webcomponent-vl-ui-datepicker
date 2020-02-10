
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
    const vlFormValidationPage = new VlFormValidationPage(driver);

    before((done) => {
        vlFormValidationPage.load().then(() => {
            done();
        });
    });

    after((done) => {
        if(driver) {
            done();
        }
    })
});
