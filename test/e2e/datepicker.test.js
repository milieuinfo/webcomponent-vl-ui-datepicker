const {assert, driver} = require('vl-ui-core').Test.Setup;
const {DateTime} = require('luxon');
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    const now = DateTime.local();
    const currentDay = now.toFormat('d');
    const nextDay = now.plus({day: 1}).toFormat('d');
    const currentMonth = now.setLocale('nl').toFormat('LLLL');
    const currentYear = now.toFormat('yyyy');
    const currentHour = now.toFormat('HH');
    const currentMinutes = now.toFormat('mm');

    before(async () => {
        return vlDatepickerPage.load();
    });

    it('als ik enkel een dag selecteer, word automatisch de huidige maand en het huidige jaar gekozen', async () => {
        const today = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectDay(currentDay);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('ik kan een maand selecteren', async () => {
        const today = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectMonth(currentMonth);
        await datepicker.selectDay(currentDay);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('ik kan een jaar selecteren', async () => {
        const today = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectYear(currentYear);
        await datepicker.selectDay(currentDay);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('ik kan een custom format definieren', async () => {
        const today = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getCustomFormatDatepicker();
        await datepicker.selectDay(currentDay);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('ik kan de datum van vandaag op voorhand invullen', async () => {
        const date = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDateDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), date);
    });

    it('ik kan een max datum definieren', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxDatepicker();
        await datepicker.selectMonth('mei');
        await datepicker.selectDay(16);

        await assert.eventually.isTrue(datepicker._isVisible());
        await assert.eventually.isEmpty(datepicker.getInputValue());
    });

    it('ik kan een range selecteren', async () => {
        const datepicker = await vlDatepickerPage.getRangeDatepicker();

        await datepicker.selectRange(currentDay, nextDay);

        const range = await datepicker.getInputValue();
        const today = now.toFormat('dd.LL.yyyy');
        const tomorrow = now.plus({day: 1}).toFormat('dd.LL.yyyy');

        assert.equal(range, today + ' tot ' + tomorrow);
    });

    it('ik kan een tijd selecteren', async () => {
        const datepicker = await vlDatepickerPage.getTimepicker();
        await datepicker.selectHour(8);
        await datepicker.selectMinutes(25);
        await assert.eventually.equal(datepicker.getInputValue(), '08:25');
    });

    it('ik kan een max tijd instellen', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxTimepicker();
        await datepicker.selectHour(18);
        await datepicker.selectMinutes(20);
        await assert.eventually.equal(datepicker.getInputValue(), '17:00');
    });

    it('ik kan voor AM of PM kiezen', async () => {
        const datepicker = await vlDatepickerPage.getMeridianTimepicker();
        await datepicker.selectHour(12);
        await datepicker.selectMinutes(45);
        await datepicker.setAm();
        await assert.eventually.equal(datepicker.getInputValue(), '00:45');

        await datepicker.setPm();
        await assert.eventually.equal(datepicker.getInputValue(), '12:45');
    });

    it('ik kan een datum en tijd selecteren', async () => {
        const today = now.toFormat('dd-LL-yyyy HH:mm');
        const datepicker = await vlDatepickerPage.getDateTimepicker();
        await datepicker.selectDay(currentDay);
        await datepicker.selectHour(currentHour);
        await datepicker.selectMinutes(currentMinutes);
        await assert.eventually.equal(datepicker.getInputValue(), today);
    });

    it('ik kan programmatorisch de datum met dotted format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getDotFormatDatepicker();
        await datepicker.selectDay(currentDay);
        await assert.eventually.equal(datepicker.getInputValue(), now.toFormat('dd.LL.yyyy'));
        await vlDatepickerPage.clickDotFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01.12.2019');
    });

    it('ik kan programmatorisch de datum met slash format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getSlashFormatDatepicker();
        await datepicker.selectDay(currentDay);
        await assert.eventually.equal(datepicker.getInputValue(), now.toFormat('dd/LL/yyyy'));
        await vlDatepickerPage.clickSlashFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01/12/2019');
    });

    it('ik kan programmatorisch de tijd met range format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getRangeFormatDatepicker();
        await datepicker.selectRange(currentDay, nextDay);

        const today = now.toFormat('dd.LL.yyyy');
        const tomorrow = now.plus({day: 1}).toFormat('dd.LL.yyyy');
        await assert.eventually.equal(datepicker.getInputValue(), today + ' tot ' + tomorrow);

        await vlDatepickerPage.clickRangeFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01.12.2019 tot 10.12.2019');
    });

    it('ik kan programmatorisch de tijd veranderen', async () => {
        const datepicker = await vlDatepickerPage.getTimeFormatDatepicker();
        await datepicker.selectHour(23);
        await datepicker.selectMinutes(30);
        await assert.eventually.equal(datepicker.getInputValue(), '23:30');
        await vlDatepickerPage.clickTimeFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '11:55');
    });

    it('ik kan programmatorisch de datum en tijd wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getDateTimeFormatDatepicker();
        const today = now.toFormat('dd-LL-yyyy');
        await datepicker.selectDay(currentDay);
        await datepicker.selectHour(12);
        await datepicker.selectMinutes(15);
        await assert.eventually.equal(datepicker.getInputValue(), today + ' 12:15');
        await vlDatepickerPage.clickDateTimeFormatButton();
        await assert.eventually.equal(datepicker.getInputValue(), '01-12-2019 11:55');
    });

    afterEach(async () => {
        return driver.navigate().refresh();
    });

    after(async () => {
        return driver.quit();
    });
});
