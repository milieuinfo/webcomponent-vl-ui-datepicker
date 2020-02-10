
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlActionGroupPage = require('./pages/vl-action-group.page');

describe('vl-action-group', async () => {
    const vlActionGroupPage = new VlActionGroupPage(driver);

    before(() => {
        return vlActionGroupPage.load();
    });

    after((done) => { 
        if (driver) {
            driver.quit();
        }
        done();
    });
});
