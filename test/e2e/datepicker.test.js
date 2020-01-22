
const { assert, driver } = require('vl-ui-core').Test;
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    before(() => {
        return vlDatepickerPage.load();
    });
});
