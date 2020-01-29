
const { assert, driver } = require('vl-ui-core').Test;
const { DateTime } = require('luxon');
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    const now = DateTime.local();
    const day = now.toFormat('d');
    const month = now.setLocale('nl').toFormat('LLLL');
    const year = now.toFormat('yyyy');

    before(() => {
        return vlDatepickerPage.load();
    });

    it('als ik enkel een dag selecteer, word automatisch de huidige maand en het huidige jaar gekozen', async () => {
        const tomorrow = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getInputValue(), tomorrow);
    });

    it('ik kan een maand selecteren', async () => {
        const nextMonth = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectMonth(month);
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getInputValue(), nextMonth);
    });

    it('ik kan een jaar selecteren', async () => {
        const nextYear = now.toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectYear(year);
        await datepicker.selectDay(day);
        await assert.eventually.isTrue(datepicker.getInputValue(), nextYear);
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
        const maxDateParsed = DateTime.fromFormat(maxDate, 'dd-LL-yyyy');

        if (maxDateParsed > now) {
            await datepicker.selectYear(maxDateParsed.year);
            await datepicker.selectMonth(maxDateParsed.month);
        }
        await datepicker.selectDay(day);

        await assert.eventually.isTrue(datepicker._isVisible());
        await assert.eventually.isEmpty(datepicker.getInputValue());
    });

    xit('ik kan een range selecteren', async () => {
        const datepicker = await vlDatepickerPage.getRangeDatepicker();
        //TODO
    });

    xit('ik kan een tijd selecteren', async () => {
        const datepicker = await vlDatepickerPage.getTimepicker();
        await datepicker.selectHour(20);
        await datepicker.selectMinutes(25);
        const time = await datepicker.getInputValue();
        assert.equal(time, '20:25');
    });

    xit('ik kan een max tijd instellen', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxTimepicker();
        await datepicker.selectHour(18);
        await datepicker.selectMinutes(20);
        const time = await datepicker.getInputValue();
        assert.equal(time, '17:00');
    });

    xit('ik kan voor AM of PM kiezen', async () => {
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

    //TODO: day, tomorrow en stuff gebruiken
    xit('ik kan een datum en tijd selecteren', async () => {
        const datepicker = await vlDatepickerPage.getDateTimepicker();
        await datepicker.selectDay(30);
        await datepicker.selectHour(11);
        await datepicker.selectMinutes(20);
        const dateTime = await datepicker.getInputValue();
        assert.equal(dateTime, '30-01-2020 11:20');
    });

    //TODO: dynamisch maken van datum
    xit('ik kan programmatorisch de datum met dotted format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getDotFormatDatepicker();
        await datepicker.selectDay(day);
        const date = await datepicker.getInputValue();
        const tomorrow = now.plus({ days: 1 }).toFormat('dd.LL.yyyy');
        assert.equal(date, tomorrow);
        await vlDatepickerPage.clickDotFormatButton();
        const changedDate = await datepicker.getInputValue();
        assert.equal(changedDate, '01.12.2019');
    });    
    
    xit('ik kan programmatorisch de datum met slash format wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getSlashFormatDatepicker();
        await datepicker.selectDay(day);
        const date = await datepicker.getInputValue();
        const tomorrow = now.plus({ days: 1 }).toFormat('dd/LL/yyyy');
        assert.equal(date, tomorrow);
        await vlDatepickerPage.clickSlashFormatButton();
        const changedDate = await datepicker.getInputValue();
        assert.equal(changedDate, '01/12/2019');
    });    
    
    xit('ik kan programmatorisch de tijd met range format wijzigen', async () => {

    });

    xit('ik kan programmatorisch de tijd veranderen', async () => {
        const datepicker = await vlDatepickerPage.getTimeFormatDatepicker();
        await datepicker.selectHour(9);
        await datepicker.selectMinutes(30);
        const time = await datepicker.getInputValue();
        assert.equal(time, '09:30');
        await vlDatepickerPage.clickTimeFormatButton();
        const timeAfterUpdate = await datepicker.getInputValue();
        assert.equal(timeAfterUpdate, '11:55');
    });

    xit('ik kan programmatorisch de datum en tijd wijzigen', async () => {
        const datepicker = await vlDatepickerPage.getDateTimeFormatDatepicker();
        const tomorrow = now.plus({ days: 1 }).toFormat('dd-LL-yyyy');
        await datepicker.selectDay(day);
        await datepicker.selectHour(8);
        await datepicker.selectMinutes(15);
        const dateTime = await datepicker.getInputValue();
        assert.equal(dateTime, tomorrow + ' 08:15');
        await vlDatepickerPage.clickDateTimeFormatButton();
        const dateTimeAfterUpdate = await datepicker.getInputValue();
        assert.equal(dateTimeAfterUpdate, '01-12-2019 11:55');

    })
});
