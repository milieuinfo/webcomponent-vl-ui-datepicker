const VlIcon = require('../components/vl-icon');
const { Page, Config } = require('vl-ui-core').Test;

class VlIconPage extends Page {
    async _getIcon(selector) {
        return new VlIcon(this.driver, selector);
    }

    async getIcon() {
        return this._getIcon('#icon');
    }

    async getSmallIcon() {
        return this._getIcon('#icon-small');
    }

    async getLightIcon() {
        return this._getIcon('#icon-light');
    }

    async getLargeIcon() {
        return this._getIcon('#icon-large');
    }

    async getIcon90() {
        return this._getIcon('#icon-90');
    }

    async getIcon180() {
        return this._getIcon('#icon-180');
    }

    async getIconBefore() {
        return this._getIcon('#icon-before');
    }

    async getIconAfter() {
        return this._getIcon('#icon-after');
    }

    async getIconAfterFlex() {
        return this._getIcon('#icon-after-flex');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-icon.html');
    }
}

module.exports = VlIconPage;
