const { assert, driver } = require('vl-ui-core').Test.Setup;
const { DateTime } = require('luxon');
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    const now = DateTime.local();
    const tomorrow = now.plus({ day: 1 });

    before(async () => {
        return vlDatepickerPage.load();
    });

    it('als ik alleen een dag selecteer, word automatisch de huidige maand en het huidige jaar gekozen', async () => {
        const today = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectDay(now.day);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('als gebruiker kan ik de volgende of vorige maand selecteren', async () => {
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        const difference = now.month == 12 ? -1 : 1;
        const month = now.plus({ month: difference }).setLocale('nl').toFormat('LLLL');
        await datepicker.selectMonth(month);
        await datepicker.selectDay(now.day);
        await assert.eventually.equal(datepicker.getInputValue(), now.plus({ month: difference }).toFormat('dd.LL.yyyy'));
    });

    it('als gebruiker kan ik het volgende jaar selecteren', async () => {
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectYear(now.year + 1);
        await datepicker.selectDay(now.day);
        await assert.eventually.equal(datepicker.getInputValue(), now.plus({ year: 1 }).toFormat('dd.LL.yyyy'));
    });

    it('als gebruiker kan ik een een datum selecteren en het resultaat in een ander formaat zien', async () => {
        const today = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getCustomFormatDatepicker();
        await datepicker.selectDay(now.day);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('als gebruiker kan ik een op voorahnd ingevulde datum zien', async () => {
        const today = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDateDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('als gebruiker kan ik alleen een toegelaten datum kiezen, wanneer ik een foutieve datum kies blijft de datepicker open staan', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxDatepicker();
        await datepicker.selectDay(16);
        await assert.eventually.isTrue(datepicker.isOpen());
        await assert.eventually.isEmpty(datepicker.getInputValue());
        await datepicker.selectDay(15);
        await assert.eventually.isFalse(datepicker.isOpen());
        await assert.eventually.equal(datepicker.getInputValue(), '15.05.2019');
    });

    it('als gebruiker kan ik een datum range selecteren', async () => {
        const datepicker = await vlDatepickerPage.getRangeDatepicker();
        await datepicker.selectRange(now.day, tomorrow.day);
        const range = await datepicker.getInputValue();
        assert.equal(range, `${now.toFormat('dd.LL.yyyy')} tot ${tomorrow.toFormat('dd.LL.yyyy')}`);
    });

    // TODO test voor Date-rangepicker met niet-beschikbare datums?

    // TODO test voor Datepicker met alternatieve visualisatie?

    it('als gebruiker kan ik een tijd selecteren', async () => {
        const datepicker = await vlDatepickerPage.getTimepicker();
        await datepicker.selectHour('08');
        await datepicker.selectMinutes('25');
        await assert.eventually.equal(datepicker.getInputValue(), '08:25');
    });

    it('als gebruiker kan ik alleen een toegelaten tijd kiezen, wanneer ik een foutieve tijd kies zal de min of max toegelaten tijd gezet worden', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxTimepicker();
        await datepicker.selectHour('08');
        await assert.eventually.equal(datepicker.getInputValue(), '09:00');
        await datepicker.selectHour('18');
        await assert.eventually.equal(datepicker.getInputValue(), '17:00');
        await datepicker.selectHour('10');
        await assert.eventually.equal(datepicker.getInputValue(), '10:00');
    });

    it('als gebruiker kan ik AM of PM kiezen', async () => {
        const datepicker = await vlDatepickerPage.getMeridianTimepicker();
        await datepicker.selectHour('12');
        await datepicker.selectMinutes('45');
        await datepicker.setAm();
        await assert.eventually.equal(datepicker.getInputValue(), '00:45');
        await datepicker.setPm();
        await assert.eventually.equal(datepicker.getInputValue(), '12:45');
    });

    it('als gebruiker kan ik een datum en tijd selecteren', async () => {
        const today = now.toFormat('dd-LL-yyyy 16:45');
        const datepicker = await vlDatepickerPage.getDateTimepicker();
        await datepicker.selectDay(now.day);
        await datepicker.selectHour(16);
        await datepicker.selectMinutes(45);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('als gebruiker kan ik een datum kiezen door op een voorgedefinieerde knop te klikken', async () => {
        let datepicker = await vlDatepickerPage.getDotFormatDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), '');
        await vlDatepickerPage.clickDotFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01.12.2019');

        datepicker = await vlDatepickerPage.getSlashFormatDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), '');
        await vlDatepickerPage.clickSlashFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01/12/2019');

        datepicker = await vlDatepickerPage.getRangeFormatDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), '');
        await vlDatepickerPage.clickRangeFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01.12.2019 tot 10.12.2019');

        datepicker = await vlDatepickerPage.getTimeFormatDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), '');
        await vlDatepickerPage.clickTimeFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '11:55');

        datepicker = await vlDatepickerPage.getDateTimeFormatDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), '');
        await vlDatepickerPage.clickDateTimeFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01-12-2019 11:55');
    });

    // TODO test voor Datepicker error

    // TODO test voor Datepicker succes

    // TODO test voor Modal met datepicker tenzij gecovered in vl-ui-modal

    // TODO test voor Sidesheet met datepicker, vermoedelijk geïntroduceerd omdat er een bug was, onderzoeken of er nood is aan een e2e test om de bug te coveren

    afterEach(async () => {
        return driver.navigate().refresh();
    });

});
