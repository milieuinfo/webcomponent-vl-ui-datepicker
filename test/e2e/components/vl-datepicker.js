const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');
const { VlSelect } = require('vl-ui-select').Test; // TODO introductie Select page object

class VlDatepicker extends VlElement {
    async _getMonthSelect() {
        const select = await this.shadowRoot.findElement(By.css('select.flatpickr-monthDropdown-months'));
        return new VlSelect(this.driver, select);
    }

    async _getToggleButton() {
        return this.shadowRoot.findElement(By.css('#button'));
    }

    async _getFlatpicker() {
        return this.shadowRoot.findElement(By.css('.flatpickr-calendar'));
    }

    async _getDayElements() {
        return this.shadowRoot.findElements(By.css('span.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)'));
    }

    async _getYearElement() {
        return this.shadowRoot.findElement(By.css('.cur-year'));
    }

    async isOpen() {
        try {
            const flatpickr = await this._getFlatpicker();
            return flatpickr.hasClass('open');
        } catch {
            return false;
        }
    }

    async open() {
        if (!(await this.isOpen())) {
            (await this._getToggleButton()).click();
        }
    }

    async close() {
        if (await this.isOpen()) {
            (await this._getToggleButton()).click();
        }
    }

    async _getDayElementByText(text) {
        const dayElements = await this._getDayElements();
        const dayMap = await Promise.all(dayElements.map(async (dayElement) => {
            return {
                text: await dayElement.getText(), 
                webElement: dayElement
            };
        }));
        const match = dayMap.find((dayElement) => {
            return dayElement.text == text;
        });
        if (match) {
            return match.webElement;
        } else {
            throw new Error('Dag niet gevonden!');
        }
    }

    async _getHours() {
        const input = await this._getHourInput();
        return input.getAttribute('value');
    }

    async _getHourInput() {
        return this.shadowRoot.findElement(By.css('input.flatpickr-hour'));
    }

    async _getMinutes() {
        const input = await this._getMinuteInput();
        return input.getAttribute('value');
    }

    async _getMinuteInput() {
        return this.shadowRoot.findElement(By.css('input.flatpickr-minute'));
    }

    async _increase(ticker) {
        const tickerWrapper = await ticker.findElement(By.xpath('..'));
        const arrowUp = await tickerWrapper.findElement(By.css('span.arrowUp'));
        await arrowUp.click();
    }

    async _increaseWith(ticker, times) {
        for (let index = 0; index < times; index++) {
            await this._increase(ticker);
            // await this.driver.sleep(300);
        }
    }

    async _decreaseWith(ticker, times) {
        for (let index = 0; index < times; index++) {
            await this._decrease(ticker);
            // await this.driver.sleep(300);
        }
    }

    async _decrease(ticker) {
        const tickerWrapper = await ticker.findElement(By.xpath('..'));
        const arrowDown = await tickerWrapper.findElement(By.css('span.arrowDown'));
        await arrowDown.click();
    }

    async _getSelectedYear() {
        const input = await this.shadowRoot.findElement(By.css('.numInput'));
        return input.getAttribute('value');
    }

    async _calculateDifference(value, originalValue) {
        const difference = Math.floor(value - originalValue);
        return Math.abs(difference);
    }

    async _setValueInTicker(ticker, value) {
        const originalValue = Number(await ticker.getAttribute('value'));
        const difference = await this._calculateDifference(value, originalValue);
        if (value > originalValue) {
            await this._increaseWith(ticker, difference);
        } else {
            await this._decreaseWith(ticker, difference);
        }
    }

    async _isAmPm() {
        const elements = await this.shadowRoot.findElements(By.css('.flatpickr-am-pm'));
        return elements.length > 0;
    }

    async _getMeridian() {
        const element = await this.shadowRoot.findElement(By.css('.flatpickr-am-pm'));
        const meridian = await element.getText();
        return meridian.toLowerCase();
    }

    async _toggleMeridian() {
        const element = await this.shadowRoot.findElement(By.css('.flatpickr-am-pm'));
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
        const input = await this.shadowRoot.findElement(By.css('#input'));
        return input.getAttribute('value');
    }

    async getSelectedMonth() {
        await this.open();
        const select = await this._getMonthSelect();
        return select.getSelectedValue();
    }

    async selectHour(hour) {
        await this.open();
        await this._selectTimeComponent(await this._getHourInput(), await this._isAmPm() && hour > 12 ? hour - 12 : hour);
    }

    async selectMinutes(minutes) {
        await this.open();
        await this._selectTimeComponent(await this._getMinuteInput(), minutes);
    }

    async _selectTimeComponent(input, value) {
        input = await new VlElement(this.driver, input);
        await input.hover();
        await input.click();
        await this.driver.sleep(300);
        await this.__sendKeysWithoutInteractabilityCheck(value);
        await this.close();
    }

    async selectDay(day) {
        await this.open();
        const dayElement = await this._getDayElementByText(day);
        await dayElement.click();
    }

    async selectRange(from, to) {
        await this.selectDay(from);
        await this.selectDay(to);
    }

    async selectMonth(month) {
        await this.open();
        const select = await this._getMonthSelect();
        await select.selectByText(month);
    }

    async selectYear(year) {
        await this.open();
        const ticker = await this._getYearElement();
        await this._setValueInTicker(ticker, year);
    }

    async getIcon() {
        return this.shadowRoot.findElement(By.css('#icon'));
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
