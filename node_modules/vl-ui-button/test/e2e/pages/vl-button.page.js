const VlButton = require('../components/vl-button');
const { Page, Config } = require('vl-ui-core').Test;

class VlButtonPage extends Page {
    async _getButton(selector) {
        return new VlButton(this.driver, selector);
    }

    async getPrimaryButton() {
        return this._getButton('#button-primary');
    }

    async getDisabledButton() {
        return this._getButton('#button-disabled');
    }

    async getErrorButton() {
        return this._getButton('#button-error');
    }

    async getIconBeforeButton() {
        return this._getButton('#button-icon-before');
    }

    async getIconAfterButton() {
        return this._getButton('#button-icon-after');
    }

    async getIconAfterButton() {
        return this._getButton('#button-icon-after');
    }

    async getBlockButton() {
        return this._getButton('#button-block');
    }

    async getLargeButton() {
        return this._getButton('#button-large');
    }

    async getWideButton() {
        return this._getButton('#button-wide');
    }

    async getNarrowButton() {
        return this._getButton('#button-narrow');
    }

    async getLoadingButton() {
        return this._getButton('#button-loading');
    }

    async getSecondaryButton() {
        return this._getButton('#button-secondary');
    }

    async getTertiaryButton() {
        return this._getButton('#button-tertiary');
    }

    async getIconButton() {
        return this._getButton('#button-icon');
    }

    async getLinkButton() {
        return this._getButton('#button-a-link');
    }

    async getPillButton() {
        return this._getButton('#button-pill');
    }

    async getPillSuccessButton() {
        return this._getButton('#button-pill-success');
    }

    async getPillWarningButton() {
        return this._getButton('#button-pill-warning');
    }

    async getPillErrorButton() {
        return this._getButton('#button-pill-error');
    }

    async getInputAddonButton() {
        return this._getButton('#button-input-addon');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-button.html');
    }
}

module.exports = VlButtonPage;
