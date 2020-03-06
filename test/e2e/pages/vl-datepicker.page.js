const VlDatepicker = require('../components/vl-datepicker');
const { Page, Config } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const { VlButton } = require('vl-ui-button').Test;

class VlDatepickerPage extends Page {
    async _getDatepicker(selector) {
        await this.driver.wait(async () => {
            let el = await this.driver.findElement(By.css(selector));
            return el.isDisplayed();
        }, 3000);
        return new VlDatepicker(this.driver, selector);
    }

    async _getButton(selector) {
        return new VlButton(this.driver, selector);
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

    async getAlternatieveVisualisatieDatepicker() {
        return this._getDatepicker('#alternatieve-visualisatie-datepicker');
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
        const button = await this._getButton('#button-1');
        await button.click();
    }

    async getSlashFormatDatepicker() {
        return this._getDatepicker('#datepicker-2');
    }

    async clickSlashFormatButton() {
        const button = await this._getButton('#button-2');
        await button.click();
    }

    async getRangeFormatDatepicker() {
        return this._getDatepicker('#datepicker-3');
    }

    async clickRangeFormatButton() {
        const button = await this._getButton('#button-3');
        await button.click();
    }

    async getTimeFormatDatepicker() {
        return this._getDatepicker('#datepicker-4');
    }

    async clickTimeFormatButton() {
        const button = await this._getButton('#button-4');
        await button.click();
    }

    async getDateTimeFormatDatepicker() {
        return this._getDatepicker('#datepicker-5');
    }

    async clickDateTimeFormatButton() {
        const button = await this._getButton('#button-5');
        await button.click();
    }

    async getErrorDatepicker() {
        return this._getDatepicker('#error-datepicker');
    }

    async getSuccessDatepicker() {
        return this._getDatepicker('#success-datepicker');
    }

    async clickOpenSideSheetButton() {
        const button = await this._getButton('#sidesheet-open-button');
        await button.click();
    }

    async getSidesheetDatepicker() {
        return this._getDatepicker('#sidesheet-datepicker');
    }

    async load() {
        return super.load(Config.baseUrl + '/demo/vl-datepicker.html');
    }
}

module.exports = VlDatepickerPage;
