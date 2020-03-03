const { assert, driver } = require('vl-ui-core').Test.Setup;
const { DateTime } = require('luxon');
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    const now = DateTime.local();
    const tomorrow = now.plus({ day: 1 });
    const currentHour = now.hour;
    const currentMinutes = now.minute;

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

    // it('ik kan een min tijd instellen', async () => {
    //     const datepicker = await vlDatepickerPage.getMinMaxTimepicker();
    //     await datepicker.selectHour('08');
    //     await assert.eventually.equal(datepicker.getInputValue(), '09:00');
    // });

    // it('ik kan een max tijd instellen', async () => {
    //     const datepicker = await vlDatepickerPage.getMinMaxTimepicker();
    //     await datepicker.selectHour('18');
    //     await assert.eventually.equal(datepicker.getInputValue(), '17:00');
    // });

    // it('ik kan voor AM of PM kiezen', async () => {
    //     const datepicker = await vlDatepickerPage.getMeridianTimepicker();
    //     await datepicker.selectHour('12');
    //     await datepicker.selectMinutes('45');
    //     await datepicker.setAm();
    //     await assert.eventually.equal(datepicker.getInputValue(), '00:45');

    //     await datepicker.setPm();
    //     await assert.eventually.equal(datepicker.getInputValue(), '12:45');
    // });

    // it('ik kan een datum en tijd selecteren', async () => {
    //     const today = now.toFormat('dd-LL-yyyy HH:mm');
    //     const datepicker = await vlDatepickerPage.getDateTimepicker();
    //     await datepicker.selectDay(currentDay);
    //     await datepicker.selectHour(currentHour);
    //     await datepicker.selectMinutes(currentMinutes);
    //     await assert.eventually.equal(datepicker.getInputValue(), today);
    // });

    // it('ik kan programmatorisch de datum met dotted format wijzigen', async () => {
    //     const datepicker = await vlDatepickerPage.getDotFormatDatepicker();
    //     await datepicker.selectDay(currentDay);
    //     await assert.eventually.equal(datepicker.getInputValue(), now.toFormat('dd.LL.yyyy'));
    //     await vlDatepickerPage.clickDotFormatButton();
    //     await assert.eventually.equal(datepicker.getInputValue(), '01.12.2019');
    // });

    // it('ik kan programmatorisch de datum met slash format wijzigen', async () => {
    //     const datepicker = await vlDatepickerPage.getSlashFormatDatepicker();
    //     await datepicker.selectDay(currentDay);
    //     await assert.eventually.equal(datepicker.getInputValue(), now.toFormat('dd/LL/yyyy'));
    //     await vlDatepickerPage.clickSlashFormatButton();
    //     await assert.eventually.equal(datepicker.getInputValue(), '01/12/2019');
    // });

    // it('ik kan programmatorisch de tijd met range format wijzigen', async () => {
    //     const datepicker = await vlDatepickerPage.getRangeFormatDatepicker();
    //     await datepicker.selectRange(currentDay, nextDay);

    //     const today = now.toFormat('dd.LL.yyyy');
    //     const tomorrow = now.plus({day: 1}).toFormat('dd.LL.yyyy');
    //     await assert.eventually.equal(datepicker.getInputValue(), today + ' tot ' + tomorrow);

    //     await vlDatepickerPage.clickRangeFormatButton();
    //     await assert.eventually.equal(datepicker.getInputValue(), '01.12.2019 tot 10.12.2019');
    // });

    // it('ik kan programmatorisch de tijd veranderen', async () => {
    //     const datepicker = await vlDatepickerPage.getTimeFormatDatepicker();
    //     await datepicker.selectHour('23');
    //     await datepicker.selectMinutes('30');
    //     await assert.eventually.equal(datepicker.getInputValue(), '23:30');
    //     await vlDatepickerPage.clickTimeFormatButton();
    //     await assert.eventually.equal(datepicker.getInputValue(), '11:55');
    // });

    // it('ik kan programmatorisch de datum en tijd wijzigen', async () => {
    //     const datepicker = await vlDatepickerPage.getDateTimeFormatDatepicker();
    //     const today = now.toFormat('dd-LL-yyyy');
    //     await datepicker.selectDay(currentDay);
    //     await datepicker.selectHour('12');
    //     await datepicker.selectMinutes('15');
    //     await assert.eventually.equal(datepicker.getInputValue(), today + ' 12:15');
    //     await vlDatepickerPage.clickDateTimeFormatButton();
    //     await assert.eventually.equal(datepicker.getInputValue(), '01-12-2019 11:55');
    // });

    afterEach(async () => {
        return driver.navigate().refresh();
    });

});
