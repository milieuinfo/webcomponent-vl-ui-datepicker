const VlDatepicker = require('../components/vl-datepicker');
const { Page, Config } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlDatepickerPage extends Page {
    async _getDatepicker(selector) {
        await this.driver.wait(async () => {
            let el = await this.driver.findElement(By.css(selector));
            return el.isDisplayed();
        }, 3000);
        return new VlDatepicker(this.driver, selector);
    }

    async getDefaultDatepicker() {
        return this._getDatepicker('#default-datepicker');
    }

    async getCustomFormatDatepicker() {
        return this._getDatepicker('#custom-format-datepicker');
    }

    async getDefaultDateDatepicker() {
        return this._getDatepicker('#prefilled-datepicker');
    }

    async getMinMaxDatepicker() {
        return this._getDatepicker('#min-max-datepicker');
    }

    async getRangeDatepicker() {
        return this._getDatepicker('#range-datepicker');
    }

    async getTimepicker() {
        return this._getDatepicker('#timepicker-datepicker');
    }

    async getMinMaxTimepicker() {
        return this._getDatepicker('#timepicker-min-max-datepicker');
    }

    async getMeridianTimepicker() {
        return this._getDatepicker('#timepicker-am-pm-datepicker');
    }

    async getDateTimepicker() {
        return this._getDatepicker('#date-time-datepicker');
    }

    async getDotFormatDatepicker() {
        return this._getDatepicker('#datepicker-1');
    }

    async clickDotFormatButton() {
        return (await this.driver.findElement(By.css('#button-1'))).click();
    }
    
    async getSlashFormatDatepicker() {
        return this._getDatepicker('#datepicker-2');
    }

    async clickSlashFormatButton() {
        return (await this.driver.findElement(By.css('#button-2'))).click();
    }

    async getRangeFormatDatepicker() {
        return this._getDatepicker('#datepicker-3');
    }

    async clickRangeFormatButton() {
        return (await this.driver.findElement(By.css('#button-3'))).click();
    }

    async getTimeFormatDatepicker() {
        return this._getDatepicker('#datepicker-4');
    }

    async clickTimeFormatButton() {
        return (await this.driver.findElement(By.css('#button-4'))).click();
    }

    async getDateTimeFormatDatepicker() {
        return this._getDatepicker('#datepicker-5');
    }

    async clickDateTimeFormatButton() {
        return (await this.driver.findElement(By.css('#button-5'))).click();
    }

    async load() {
        return super.load(Config.baseUrl + '/demo/vl-datepicker.html');
    }
}

module.exports = VlDatepickerPage;
