const VlDatepicker = require('../components/vl-datepicker');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlDatepickerPage extends Page {
    async _getDatepicker(selector) {
        return new VlDatepicker(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-datepicker.html');
    }
}

module.exports = VlDatepickerPage;
