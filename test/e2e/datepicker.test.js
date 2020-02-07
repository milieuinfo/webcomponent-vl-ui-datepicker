
const { assert, driver } = require('vl-ui-core').Test;
const { DateTime } = require('luxon');
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    const now = DateTime.local();
    const day = now.toFormat('d');
    const month = now.setLocale('nl').toFormat('LLLL');
    const year = now.toFormat('yyyy');
    const hour = now.toFormat('H');
    const minutes = now.toFormat('m');
    const hourAMPM = now.toFormat('h');

    before(() => {
        return vlDatepickerPage.load();
    });

    it('als ik enkel een dag selecteer, word automatisch de huidige maand en het huidige jaar gekozen', async () => {
        const currentDay = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getInputValue(), currentDay);
    });

    it('ik kan een maand selecteren', async () => {
        const currentMonth = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectMonth(month);
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getInputValue(), currentMonth);
    });

    it('ik kan een jaar selecteren', async () => {
        const currentYear = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectYear(year);
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getInputValue(), currentYear);
    });

    it('ik kan een custom format definieren', async () => {
        const date = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getCustomFormatDatepicker();
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getInputValue(), date);
    });

    it('ik kan de datum van vandaag op voorhand invullen', async () => {
        const date = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDateDatepicker();
        await assert.eventually.equal(datepicker.getInputValue(), date);
    });

    it('ik kan een max datum definieren', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxDatepicker();
        const maxDate = await datepicker.getMaxDate();
        const maxDateParsed = DateTime.fromFormat(maxDate, 'dd-LL-yyyy', { locale: 'nl' });

        if (maxDateParsed > now) {
            await datepicker.selectYear(maxDateParsed.year);
            await datepicker.selectMonth(maxDateParsed.monthLong);
        }
        await datepicker.selectDay(day);

        await assert.eventually.isTrue(datepicker._isVisible());
        await assert.eventually.isEmpty(datepicker.getInputValue());
    });

    xit('ik kan een range selecteren', async () => {
        const datepicker = await vlDatepickerPage.getRangeDatepicker();
        //TODO
    });

    it('ik kan een tijd selecteren', async () => {
        const datepicker = await vlDatepickerPage.getTimepicker();
        await datepicker.selectHour(20);
        await datepicker.selectMinutes(25);
        const time = await datepicker.getInputValue();
        assert.equal(time, '20:25');
    });

    it('ik kan een max tijd instellen', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxTimepicker();
        await datepicker.selectHour(18);
        await datepicker.selectMinutes(20);
        const time = await datepicker.getInputValue();
        assert.equal(time, '17:00');
    });

    it('ik kan voor AM of PM kiezen', async () => {
        const datepicker = await vlDatepickerPage.getMeridianTimepicker();
        await datepicker.selectHour(12);
        await datepicker.selectMinutes(45);
        await datepicker.setAm();
        const amTime = await datepicker.getInputValue();
        assert.equal(amTime, '00:45');

        await datepicker.setPm();
        const pmTime = await datepicker.getInputValue();
        assert.equal(pmTime, '12:45');
    });

    it('ik kan een datum en tijd selecteren', async () => {
        const currentDay = now.toFormat('dd-LL-yyyy');
        const datepicker = await vlDatepickerPage.getDateTimepicker();
        await datepicker.selectDay(day);
        await datepicker.selectHour(hour);
        await datepicker.selectMinutes(minutes);
        const dateTime = await datepicker.getInputValue();
        assert.equal(dateTime, currentDay + ' ' + hour + ':' + minutes);
    });

    it('ik kan programmatorisch de datum met dotted format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getDotFormatDatepicker();
        await datepicker.selectDay(day);
        const date = await datepicker.getInputValue();
        const today = now.toFormat('dd.LL.yyyy');
        assert.equal(date, today);
        await vlDatepickerPage.clickDotFormatButton();
        const changedDate = await datepicker.getInputValue();
        assert.equal(changedDate, '01.12.2019');
    });    
    
    it('ik kan programmatorisch de datum met slash format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getSlashFormatDatepicker();
        await datepicker.selectDay(day);
        const date = await datepicker.getInputValue();
        const today = now.toFormat('dd/LL/yyyy');
        assert.equal(date, today);
        await vlDatepickerPage.clickSlashFormatButton();
        const changedDate = await datepicker.getInputValue();
        assert.equal(changedDate, '01/12/2019');
    });    
    
    it('ik kan programmatorisch de tijd met range format wijzigen', async () => {

    });

    it('ik kan programmatorisch de tijd veranderen', async () => {
        const datepicker = await vlDatepickerPage.getTimeFormatDatepicker();
        await datepicker.selectHour(9);
        await datepicker.selectMinutes(30);
        const time = await datepicker.getInputValue();
        assert.equal(time, '09:30');
        await vlDatepickerPage.clickTimeFormatButton();
        const timeAfterUpdate = await datepicker.getInputValue();
        assert.equal(timeAfterUpdate, '11:55');
    });

    it('ik kan programmatorisch de datum en tijd wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getDateTimeFormatDatepicker();
        const today = now.toFormat('dd-LL-yyyy');
        await datepicker.selectDay(day);
        await datepicker.selectHour(8);
        await datepicker.selectMinutes(15);
        const dateTime = await datepicker.getInputValue();
        assert.equal(dateTime, today + ' 08:15');
        await vlDatepickerPage.clickDateTimeFormatButton();
        const dateTimeAfterUpdate = await datepicker.getInputValue();
        assert.equal(dateTimeAfterUpdate, '01-12-2019 11:55');

    })
});
