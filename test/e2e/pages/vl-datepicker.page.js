const VlDatepicker = require('../components/vl-datepicker');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlDatepickerPage extends Page {
    async _getDatepicker(selector) {
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

    async load() {
        return super.load(Config.baseUrl + '/demo/vl-datepicker.html');
    }
}

module.exports = VlDatepickerPage;
