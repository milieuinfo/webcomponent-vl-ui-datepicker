const { VlElement } = require('vl-ui-core');
const { By } = require('selenium-webdriver');
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
        if((await this._isVisible())) {
            return Promise.resolve();
        }
        return (await this._getToggleButton()).click();
    }

    async _getDays() {
        return (await this._getWrapper()).findElements(By.css('span.flatpickr-day'));
    }

    async _increaseYear() {
        const arrowUp = await (await this._getWrapper()).findElement(By.css('span.arrowUp'));
        return arrowUp.click();
    }

    async _decreaseYear() {
        const arrowDown = await (await this._getWrapper()).findElement(By.css('span.arrowDown'))
        return arrowDown.click();
    }

    async _getSelectedYear() {
        const input = await (await this._getWrapper()).findElement(By.css('.numInput'));
        return input.getAttribute('value');
    }

    async getSelectedDate() {
        const input = await (await this._getWrapper()).findElement(By.css('#input'));
        return input.getAttribute('value');
    }

    async getSelectedMonth() {
        await this._openFlatpickr();
        const select = await this._getMonthSelect();
        return select.getSelectedValue();
    }

    async selectDay(day) {
        await this._openFlatpickr();
        const days = await this._getDays();
        const dayMap = await Promise.all(days.map(async (day) => {
            const text = await day.getText();
            return { text: text, webElement: day }
        }));
        const dayArray = dayMap.filter(w => w.text == day);
        if (dayArray.length == 0) {
            return Promise.reject('Dag niet gevonden!');
        }
        return dayArray[0].webElement.click();
    }

    async selectMonth(month) {
        await this._openFlatpickr();
        const select = await this._getMonthSelect();
        return select.selectByText(month);
    }

    async selectYear(year) {
        await this._openFlatpickr();
        const selectedYear = await this._getSelectedYear();
        let difference;
        if(year > selectedYear) {
            difference = year - selectedYear;
            for (let index = 0; index < difference; index++) {
                await this._increaseYear();
            }
        } else {
            difference = selectedYear - year;
            for (let index = 0; index < difference; index++) {
                await this._decreaseYear();
            }
        }
        return Promise.resolve();
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
