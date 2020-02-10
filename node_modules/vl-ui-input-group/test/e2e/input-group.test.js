const { driver } = require('vl-ui-core').Test.Setup;
const VlInputGroup = require('./pages/vl-input-group.page');

describe('vl-input-group', async () => {
    const vlInputGroup = new VlInputGroup(driver);

    before(async () => {
        return vlInputGroup.load();
    });

    after(async () => {
        return driver.quit();
    });
});
