const { driver } = require('vl-ui-core').Test.Setup;
const VlInputFieldPage = require('./pages/vl-input-field.page');

describe('vl-input-field', async () => {
    const vlInputFieldPage = new VlInputFieldPage(driver);

    before(async () => {
        return vlInputFieldPage.load();
    });

    after(async () => {
        return driver.quit();
    });
});
