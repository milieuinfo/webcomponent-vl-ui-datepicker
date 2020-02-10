
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlPillPage = require('./pages/vl-pill.page');

describe('vl-pill', async () => {
    const vlPillPage = new VlPillPage(driver);

    before(() => {
        return vlPillPage.load();
    });

    after((done) => { 
        if (driver) {
            driver.quit();
        }
        done();
    });
});
