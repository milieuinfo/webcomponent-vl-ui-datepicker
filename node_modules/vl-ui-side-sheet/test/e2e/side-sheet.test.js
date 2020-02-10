
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlSideSheetPage = require('./pages/vl-side-sheet.page');

describe('vl-side-sheet', async () => {
    const vlSideSheetPage = new VlSideSheetPage(driver);

    before(() => {
       return vlSideSheetPage.load();
    });

    it('ik kan de side-sheet openen en sluiten', async () => {
        const sheet = await vlSideSheetPage.getSidesheetToggle();
        await assert.eventually.isFalse(sheet.isOpen());
        await vlSideSheetPage.open();
        await assert.eventually.isTrue(sheet.isOpen());
        await sheet.close();
        await assert.eventually.isFalse(sheet.isOpen());
    });

    it('ik kan de content van een side-sheet opvragen', async () => {
        const sheet = await vlSideSheetPage.getSidesheetToggle();
        await assert.eventually.isFalse(sheet.isOpen());
        await vlSideSheetPage.open();
        await assert.eventually.isTrue(sheet.isOpen());
        await assert.eventually.include(sheet.getContent(), 'Hello world!');
    });

    after((done) => { 
        if (driver) {
            driver.quit();
        }
        done();
    });
});
