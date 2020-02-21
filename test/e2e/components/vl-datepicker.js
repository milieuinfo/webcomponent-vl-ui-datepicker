const {VlElement} = require('vl-ui-core').Test;
const {By} = require('selenium-webdriver');
const {VlSelect} = require('vl-ui-select').Test;

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
        const elementArray = await (await this._getWrapper()).findElements(By.css('.flatpickr-calendar'));
        if (elementArray.length == 0) {
            return false;
        }
        const flatpickr = await this._getFlatpicker();
        return flatpickr.hasClass('open');
    }

    async _openFlatpickr() {
        if (!(await this._isVisible())) {
            (await this._getToggleButton()).click();
        }
    }

    async _closeFlatpickr() {
        if (await this._isVisible()) {
            (await this._getToggleButton()).click()
        }
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
        const input = await this._getHourInput();
        return input.getAttribute('value');
    }

    async _getHourInput() {
        return (await this._getWrapper()).findElement(By.css('input.flatpickr-hour'));
    }

    async _getMinutes() {
        const input = await this._getMinuteInput();
        return input.getAttribute('value');
    }

    async _getMinuteInput() {
        return (await this._getWrapper()).findElement(By.css('input.flatpickr-minute'));
    }

    async _increase(ticker) {
        const tickerWrapper = await ticker.findElement(By.xpath('..'));
        const arrowUp = await tickerWrapper.findElement(By.css('span.arrowUp'));
        await arrowUp.click();
    }

    async _increaseWith(ticker, times) {
        for (let index = 0; index < times; index++) {
            await this._increase(ticker);
            await this.driver.sleep(300);
        }
    }

    async _decreaseWith(ticker, times) {
        for (let index = 0; index < times; index++) {
            await this._decrease(ticker);
            await this.driver.sleep(300);
        }
    }

    async _decrease(ticker) {
        const tickerWrapper = await ticker.findElement(By.xpath('..'));
        const arrowDown = await tickerWrapper.findElement(By.css('span.arrowDown'));
        await arrowDown.click();
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
        return Math.abs(difference);
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
    }

    async _isAmPm() {
        const elements = await (await this._getWrapper()).findElements(By.css('.flatpickr-am-pm'));
        return elements.length > 0;
    }

    async _getMeridian() {
        const element = await (await this._getWrapper()).findElement(By.css('.flatpickr-am-pm'));
        const meridian = await element.getText();
        return meridian.toLowerCase();
    }

    async _toggleMeridian() {
        const element = await (await this._getWrapper()).findElement(By.css('.flatpickr-am-pm'));
        await element.click();
    }

    async setAm() {
        const meridian = await this._getMeridian();
        if (meridian === 'pm') {
            await this._toggleMeridian();
        }
    }

    async setPm() {
        const meridian = await this._getMeridian();
        if (meridian === 'am') {
            await this._toggleMeridian();
        }
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
        await this._selectTimeComponent(this._getHourInput.bind(this), await this._isAmPm() && hour > 12 ? hour - 12 : hour);
    }

    async selectMinutes(minutes) {
        await this._selectTimeComponent(this._getMinuteInput.bind(this), minutes);
    }

    async _selectTimeComponent(inputGetter, value) {
        await this._openFlatpickr();
        const input = await inputGetter();
        await input.click();
        await this.driver.sleep(1000);
        await this.__sendKeysWithoutInteractabilityCheck(value);
        await this._closeFlatpickr();
    }

    async selectDay(day) {
        await this._openFlatpickr();
        const dayMap = await this._getDaysMap();
        const dayArray = dayMap.filter(w => w.text == day).filter(d => d.isPreviousMonth === false);
        if (dayArray.length === 0) {
            throw new Error('Dag niet gevonden!');
        }
        await dayArray[0].webElement.click();
        await this._closeFlatpickr();
    }

    async selectRange(from, to) {
        await this.selectDay(from);
        await this.selectDay(to);
    }

    async selectMonth(month) {
        await this._openFlatpickr();
        const select = await this._getMonthSelect();
        await select.selectByText(month);
    }

    async selectYear(year) {
        const ticker = (await this._getWrapper()).findElement(By.css('.cur-year'));
        await this._setValueInTicker(ticker, year);
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

    async __sendKeysWithoutInteractabilityCheck(value) {
        if (typeof value.toString === 'function') {
            value = value.toString();
        }
        await this.driver.actions().sendKeys(value).perform();
    }
}

module.exports = VlDatepicker;
