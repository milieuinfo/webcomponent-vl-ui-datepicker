const VlSideSheet = require('../components/vl-side-sheet');
const { Page, Config } = require('vl-ui-core').Test;

class VlSideSheetPage extends Page {
    async _getSideSheet(selector) {
        return new VlSideSheet(this.driver, selector);
    }

    async open() {
        return (await this._getSideSheet('#open-button')).click();
    }

    async getSidesheetToggle() {
        return this._getSideSheet('#vl-side-sheet-1');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-side-sheet.html');
    }
}

module.exports = VlSideSheetPage;
