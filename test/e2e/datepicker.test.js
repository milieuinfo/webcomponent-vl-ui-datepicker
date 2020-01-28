
const { assert, driver } = require('vl-ui-core').Test;
const { DateTime } = require('luxon');
const VlDatepickerPage = require('./pages/vl-datepicker.page');

describe('vl-datepicker', async () => {
    const vlDatepickerPage = new VlDatepickerPage(driver);

    const now = DateTime.local();
    const day = now.plus({days: 1}).day;
    const month = now.plus({month: 1}).month;
    const year = now.plus({year: 1}).year;
    
    before(() => {
        return vlDatepickerPage.load();
    });
    
    xit('als ik enkel een dag selecteer, word automatisch de huidige maand en het huidige jaar gekozen', async () => {
        const tomorrow = now.plus({days: 1}).toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getSelectedDate(), tomorrow);
    });
    
    xit('ik kan een maand selecteren', async () => {
        const nextMonth = now.plus({month: 1}).toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectMonth(month);
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getSelectedDate(), nextMonth);
    });
    
    xit('ik kan een jaar selecteren', async () => {
        const nextYear = now.plus({year: 1}).toFormat('dd.LL.yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDatepicker();
        await datepicker.selectYear(year);
        await datepicker.selectDay(day);
        await assert.eventually.isTrue(datepicker.getSelectedDate(), nextYear);
    });
    
    xit('ik kan een custom format definieren', async () => {
        const date = now.plus({days: 1}).toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getCustomFormatDatepicker();
        await datepicker.selectDay(day);
        await assert.eventually.equal(datepicker.getSelectedDate(), date);
    });

    xit('ik kan de datum van vandaag op voorhand invullen', async () => {
        const date = now.toFormat('dd/LL/yyyy');
        const datepicker = await vlDatepickerPage.getDefaultDateDatepicker();
        await assert.eventually.equal(datepicker.getSelectedDate(), date);
    });

    xit('ik kan een max datum definieren', async () => {
        const datepicker = await vlDatepickerPage.getMinMaxDatepicker();
        const maxDate = await datepicker.getMaxDate();      
        const maxDateParsed = DateTime.fromFormat(maxDate, 'dd-LL-yyyy');
        
        if(maxDateParsed > now) {
            await datepicker.selectYear(maxDateParsed.year);
            await datepicker.selectMonth(maxDateParsed.month);
        }
        await datepicker.selectDay(day);
        
        await assert.eventually.isTrue(datepicker._isVisible());
        await assert.eventually.isEmpty(datepicker.getSelectedDate());
    });
});
