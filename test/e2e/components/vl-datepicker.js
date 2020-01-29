const { VlElement } = require('vl-ui-core');
const { By, until } = require('selenium-webdriver');
const { VlSelect } = require('vl-ui-select');

class VlDatepicker extends VlElement {
    async _getWrapper() {
        return this.shadowRoot;
    }

    async _getMonthSelect() {
        await this._openFlatpickr();
        const element = await (await this._getWrapper()).findElement(By.css('select.flatpickr-monthDropdown-months'));
        return new VlSelect(this.driver, element);
    }

    async _getToggleButton() {
        return (await this._getWrapper()).findElement(By.css('#button'));
    }

    async _getFlatpicker() {
        return (await this._getWrapper()).findElement(By.css('.flatpickr-calendar'));
    }

    async _isVisible() {
        const flatpickr = await this._getFlatpicker();
        return flatpickr.hasClass('open');
    }

    async _openFlatpickr() {
        if ((await this._isVisible())) {
            return Promise.resolve();
        }
        return (await this._getToggleButton()).click();
    }

    async _getDays() {
        return (await this._getWrapper()).findElements(By.css('span.flatpickr-day'));
    }

    async _getDaysMap() {
        const allDays = await this._getDays();
        return Promise.all(allDays.map(async (day) => {
            const text = await day.getText();
            const isPreviousMonth = (await day.getAttribute('class')).includes('prevMonthDay');
            return {text: text, webElement: day, isPreviousMonth: isPreviousMonth}
        }));
    }

    async _getHours() {
        const input = await (await this._getWrapper()).findElement(By.css('input.flatpickr-hour'));
        return input.getAttribute('value');
    }

    async _getMinutes() {
        const input = await (await this._getWrapper()).findElement(By.css('input.flatpickr-minute'));
        return input.getAttribute('value');
    }

    async _increase(ticker) {
        const tickerWrapper = await ticker.findElement(By.xpath('..'));
        const arrowUp = await tickerWrapper.findElement(By.css('span.arrowUp'));
        return arrowUp.click();
    }

    async _increaseWith(ticker, times) {
        for (let index = 0; index < times; index++) {
            await this._increase(ticker);
        }
        return Promise.resolve();
    }

    async _decreaseWith(ticker, times) {
        for (let index = 0; index < times; index++) {
            await this._decrease(ticker);
        }
        return Promise.resolve();
    }

    async _decrease(ticker) {
        const tickerWrapper = await ticker.findElement(By.xpath('..'));
        const arrowDown = await tickerWrapper.findElement(By.css('span.arrowDown'));
        return arrowDown.click();
    }

    async _getSelectedYear() {
        const input = await (await this._getWrapper()).findElement(By.css('.numInput'));
        return input.getAttribute('value');
    }

    async _calculateDifference(value, originalValue, minutes) {
        let difference = value - originalValue;
        if (minutes) {
            difference = Math.floor(difference / 5);
        }
        return difference;
    }

    async _setValueInTicker(ticker, minutes, value) {
        await this._openFlatpickr();
        const originalValue = await (await ticker).getAttribute('value');
        if (value > originalValue) {
            const difference = await this._calculateDifference(value, originalValue, minutes);
            await this._increaseWith(ticker, difference);
        } else {
            const difference = await this._calculateDifference(value, originalValue, minutes);
            await this._decreaseWith(ticker, difference);
        }
        return Promise.resolve();
    }

    async _getMeridian() {
        const element = await (await this._getWrapper()).findElement(By.css('.flatpickr-am-pm'));
        const meridian = await element.getText();
        return meridian.toLowerCase();
    }

    async _toggleMeridian() {
        const element = await (await this._getWrapper()).findElement(By.css('.flatpickr-am-pm'));
        return element.click();
    }

    async setAm() {
        const meridian = await this ._getMeridian();
        if(meridian === 'pm') {
            await this._toggleMeridian();
        }
        return Promise.resolve();
    }

    async setPm() {
        const meridian = await this._getMeridian();
        if(meridian === 'am') {
            await this._toggleMeridian();
        }
        return Promise.resolve();
    }

    async getInputValue() {
        const input = await (await this._getWrapper()).findElement(By.css('#input'));
        return input.getAttribute('value');
    }

    async getSelectedMonth() {
        await this._openFlatpickr();
        const select = await this._getMonthSelect();
        return select.getSelectedValue();
    }

    async selectHour(hour) {
        const ticker = await (await this._getWrapper()).findElement(By.css('.flatpickr-hour'));
        return this._setValueInTicker(ticker, false, hour);
    }

    async selectMinutes(minutes) {
        const ticker = await (await this._getWrapper()).findElement(By.css('.flatpickr-minute'));
        if (minutes % 5 == 0) {
            return this._setValueInTicker(ticker, true, minutes);
        } else {
            return ticker.sendKeys(minutes);
        }
    }

    async selectDay(day) {
        await this._openFlatpickr();
        const dayMap = await this._getDaysMap();
        const dayArray = dayMap.filter(w => w.text == day).filter(d => d.isPreviousMonth === false);
        if (dayArray.length === 0) {
            throw new Error('Dag niet gevonden!');
        }
        return dayArray[0].webElement.click();
    }

    async selectMonth(month) {
        await this._openFlatpickr();
        const select = await this._getMonthSelect();
        return select.selectByText(month);
    }

    async selectYear(year) {
        const ticker = (await this._getWrapper()).findElement(By.css('.cur-year'));
        return this._setValueInTicker(ticker, year);
    }

    async getIcon() {
        return (await this._getWrapper()).findElement(By.css('#icon'));
    }

    async getFormat() {
        return this.getAttribute('format');
    }

    async getMinDate() {
        return this.getAttribute('min-date');
    }

    async getMaxDate() {
        return this.getAttribute('max-date');
    }

    async getType() {
        return this.getAttribute('type');
    }

    async getDisabledDates() {
        return this.getAttribute('disabled-dates');
    }

    async getVisualisationFormat() {
        return this.getAttribute('visual-format');
    }

    async isAmPmDatepicker() {
        return this.hasAttribute('am-pm');
    }

    async isError() {
        return this.hasAttribute('error');
    }

    async isSuccess() {
        return this.hasAttribute('success');
    }

}

module.exports = VlDatepicker;
